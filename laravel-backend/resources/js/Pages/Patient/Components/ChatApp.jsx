import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { formatDistance } from "date-fns";
import ImageModal from "@/Components/ImageModal.jsx";

const ChatApp = ({ messageHistory }) => {
    const { auth } = usePage().props;

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };

    // Initialize messages
    const initialMessages = messageHistory.map((message) => ({
        id: message.id,
        senderId: message.sender_id,
        receiverId: message.receiver_id,
        sender: message.sender_name,
        role: message.senderRole,
        senderPic: message.sender_photo,
        receiverPic: message.receiver_photo,
        timestamp: message.timestamp,
        time: formatDistance(
            new Date(message.timestamp),
            new Date(),
            { addSuffix: true }
        ),
        content: message.content,
        filePath: message.filePath,
        isMine: message.sender_id === auth.user.id,
    }));

    const [messages, setMessages] = useState(initialMessages);
    const [currentMessage, setCurrentMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [chatList, setChatList] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentRecieverPic, setCurrentRecieverPic] = useState("");

    // Update chat list
    useEffect(() => {
        const conversationMap = new Map();

        messages.forEach((msg) => {
            let partnerId, partnerInfo;

            if (msg.senderId === auth.user.id) {
                partnerId = msg.receiverId;
                partnerInfo = {
                    name: msg.receiver,
                    profilePic: msg.receiverPic,
                    role: "Receiver",
                };
            } else {
                partnerId = msg.senderId;
                partnerInfo = {
                    name: msg.sender,
                    profilePic: msg.senderPic,
                    role: msg.role,
                };
            }

            const existing = conversationMap.get(partnerId);
            if (!existing || new Date(msg.timestamp) > new Date(existing.timestamp)) {
                conversationMap.set(partnerId, {
                    userId: partnerId,
                    name: partnerInfo.name,
                    profilePic: partnerInfo.profilePic,
                    role: partnerInfo.role,
                    lastMessage: msg.content,
                    timestamp: msg.timestamp,
                    time: msg.time,
                });
            }
        });

        const uniqueChats = Array.from(conversationMap.values())
            .filter(chat => chat.userId !== auth.user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setChatList(uniqueChats);

        if (selectedChatId === null && uniqueChats.length > 0) {
            setSelectedChatId(uniqueChats[0].userId);
            setCurrentRecieverPic(uniqueChats[0].profilePic);
        }
    }, [messages, auth.user.id]);

    const filteredMessages = messages.filter((message) =>
        (message.senderId === selectedChatId && message.receiverId === auth.user.id) ||
        (message.senderId === auth.user.id && message.receiverId === selectedChatId)
    );

    // Handle real-time messages
    useEffect(() => {
        Echo.private(`messaging.${auth.user.id}`)
            .listen(".MessageReceiveEvent", (e) => {
                const newMessage = {
                    id: e.messageData.id,
                    senderId: e.messageData.sender_id,
                    receiverId: e.messageData.receiver_id,
                    sender: e.messageData.sender_name,
                    role: e.messageData.senderRole,
                    senderPic: e.messageData.sender_photo,
                    receiverPic: e.messageData.receiver_photo,
                    timestamp: e.messageData.timestamp,
                    time: formatDistance(
                        new Date(e.messageData.timestamp),
                        new Date(),
                        { addSuffix: true }
                    ),
                    content: e.messageData.content,
                    filePath: e.messageData.filePath,
                    isMine: false,
                };

                setMessages(prev => [...prev, newMessage]);
            })
            .error((error) => console.error("Channel subscription error:", error));
    }, [auth.user.id]);

    const handleSendMessage = () => {
        if (currentMessage.trim() && selectedChatId) {
            const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const newMessage = {
                id: `temp-${Date.now()}`,
                senderId: auth.user.id,
                receiverId: selectedChatId,
                sender: auth.user.name,
                role: "User",
                senderPic: auth.user.photo,
                receiverPic: chatList.find(chat => chat.userId === selectedChatId)?.profilePic,
                timestamp: timestamp,
                time: formatDistance(new Date(timestamp), new Date(), { addSuffix: true }),
                content: currentMessage,
                filePath: "",
                isMine: true,
            };

            setMessages(prev => [...prev, newMessage]);
            setCurrentMessage("");
            setCurrentRecieverPic(chatList.find(chat => chat.userId === selectedChatId).profilePic);

            router.post(
                "/send-message",
                {
                    content: currentMessage,
                    filePath: "",
                    timestamp,
                    receiver_id: selectedChatId,
                },
                { preserveScroll: true }
            );
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim()) {
           const result = await  axios.get(`/search-users?q=${query}`)

            console.log(result)

            setSearchResults(result.data.users);
        } else {
            setSearchResults([]);
        }
    };

    const startConversation = (userId) => {
        setSelectedChatId(userId);
        setCurrentRecieverPic(searchResults.find(user => user.id === userId).profile_photo_path);
        setSearchQuery("");
        setSearchResults([]);
    };

    return (
        <div className="flex h-[80vh] bg-beige-100 font-sans">
            {/* Chat List Sidebar */}
            <div className="w-1/3 bg-white shadow-md rounded-l-xl flex flex-col">
                <div className="flex items-center space-x-3 p-4 border-b">
                    <input
                        type="text"
                        placeholder="Search Messages or Users"
                        className="w-full p-2 text-sm bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div className="overflow-y-auto flex-grow">
                    {searchQuery ? (
                        searchResults.map((user) => (
                            <div
                                key={user.id}
                                className="p-4 flex items-center hover:bg-orange-100 transition cursor-pointer border-b"
                                onClick={() => startConversation(user.id)}
                            >
                                <img
                                    alt="profile"
                                    src={user.profile_photo_path}
                                    className="w-10 h-10 bg-gray-300 rounded-full mr-1"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800 mr-2">
                                        {user.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 truncate">
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        chatList.map((chat) => (
                            <div
                                key={chat.userId}
                                className={`p-4 flex items-center hover:bg-orange-100 transition cursor-pointer border-b ${
                                    chat.userId === selectedChatId ? "bg-orange-200" : ""
                                }`}
                                onClick={() => setSelectedChatId(chat.userId)}
                            >
                                <img
                                    alt="profile"
                                    src={chat.profilePic}
                                    className="w-10 h-10 bg-gray-300 rounded-full mr-1"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800 mr-2">
                                        {chat.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 truncate">
                                        {chat.lastMessage}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {chat.time}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-beige-50 rounded-xl">
                {selectedChatId ? (
                    <>
                        <div className="p-4 flex items-center bg-white border-b rounded-tr-xl">
                            <img
                                src={chatList.find(chat => chat.userId === selectedChatId)?.profilePic}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mr-1"
                            />
                            <div className="ml-3">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {chatList.find(chat => chat.userId === selectedChatId)?.name}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {chatList.find(chat => chat.userId === selectedChatId)?.role}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto mt-2">
                            {filteredMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.isMine ? "justify-end" : "justify-start"
                                    } space-x-3 mb-4`}
                                >
                                    {!message.isMine && (
                                        <img
                                            src={message.senderPic}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    )}
                                    <div>
                                        {message.filePath && (
                                            <img
                                                alt="Message attachment"
                                                className="w-[30%] rounded-xl p-2 cursor-pointer hover:opacity-90 transition"
                                                src={message.filePath}
                                                onClick={() => handleImageClick(message.filePath)}
                                            />
                                        )}
                                        <p
                                            className={`p-3 rounded-xl text-sm ${
                                                message.isMine
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-gray-300 text-gray-800"
                                            }`}
                                        >
                                            {message.content}
                                        </p>
                                        <span
                                            className={`text-xs text-gray-400 block ${
                                                message.isMine ? "text-right" : ""
                                            }`}
                                        >
                                            {message.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-white border-t flex items-center space-x-3">
                            <input
                                type="text"
                                placeholder="Type Your Message"
                                className="flex-1 p-3 text-sm bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            />
                            <button
                                className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>

            <ImageModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                imageUrl={selectedImage}
            />
        </div>
    );
};

export default ChatApp;
