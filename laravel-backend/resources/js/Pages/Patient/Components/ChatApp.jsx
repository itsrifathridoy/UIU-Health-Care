import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { formatDistance, subDays } from "date-fns";
import ImageModal from "@/Components/ImageModal.jsx";

const ChatApp = ({ messageHistory }) => {
    const { auth } = usePage().props;

    // Initialize messages with proper mapping
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

    // Update chat list with proper conversation grouping
    useEffect(() => {
        // Create a map to store the latest message for each conversation
        const conversationMap = new Map();

        // Process all messages to find unique conversations
        messages.forEach((msg) => {
            let conversationPartnerId;
            let conversationPartnerInfo;

            if (msg.senderId === auth.user.id) {
                // If current user is sender, use receiver as conversation partner
                conversationPartnerId = msg.receiverId;
                conversationPartnerInfo = {
                    name: messages.find(m => m.senderId === msg.receiverId)?.sender,
                    profilePic: msg.receiverPic,
                    role: messages.find(m => m.senderId === msg.receiverId)?.role
                };
            } else {
                // If current user is receiver, use sender as conversation partner
                conversationPartnerId = msg.senderId;
                conversationPartnerInfo = {
                    name: msg.sender,
                    profilePic: msg.senderPic,
                    role: msg.role
                };
            }

            // Skip if conversation partner info is incomplete
            if (!conversationPartnerId || !conversationPartnerInfo.name) return;

            // Check if this is a more recent message for this conversation
            const existingConversation = conversationMap.get(conversationPartnerId);
            if (!existingConversation || new Date(msg.timestamp) > new Date(existingConversation.timestamp)) {
                conversationMap.set(conversationPartnerId, {
                    userId: conversationPartnerId,
                    name: conversationPartnerInfo.name,
                    profilePic: conversationPartnerInfo.profilePic,
                    role: conversationPartnerInfo.role,
                    lastMessage: msg.content,
                    timestamp: msg.timestamp,
                    time: msg.time
                });
            }
        });

        // Convert map to array and sort by timestamp
        const uniqueChats = Array.from(conversationMap.values())
            .filter(chat => chat.userId !== auth.user.id) // Exclude current user's own messages
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setChatList(uniqueChats);

        // Set initial selected chat if none is selected
        if (selectedChatId === null && uniqueChats.length > 0) {
            setSelectedChatId(uniqueChats[0].userId);
        }
    }, [messages, auth.user.id]);

    // Filter messages for the selected chat
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

                setMessages(prevMessages => [...prevMessages, newMessage]);
            })
            .error((error) => {
                console.error("Channel subscription error:", error);
            });
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

            setMessages(prevMessages => [...prevMessages, newMessage]);
            setCurrentMessage("");

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

    return (
        <div className="flex h-[80vh] bg-beige-100 font-sans">
            {/* Chat List Sidebar */}
            <div className="w-1/3 bg-white shadow-md rounded-l-xl flex flex-col">
                <div className="flex items-center space-x-3 p-4 border-b">
                    <input
                        type="text"
                        placeholder="Search Messages"
                        className="w-full p-2 text-sm bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div className="overflow-y-auto flex-grow">
                    {chatList.map((chat) => (
                        <div
                            key={chat.userId}
                            className={`p-4 flex items-center justify-evenly hover:bg-orange-100 transition cursor-pointer border-b ${
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
                    ))}
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
