import React, { useState } from 'react';

const ChatApp = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Dr. Ashuk Singh', role: 'Doctor', time: '9:30 AM', content: 'Please Send Me Your Medical Reports', isMine: false },
        { id: 2, sender: 'Me', time: '9:32 AM', content: "Sure, I'll send it right away!", isMine: true },
    ]);

    const [currentMessage, setCurrentMessage] = useState('');

    const handleSendMessage = () => {
        if (currentMessage.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: prevMessages.length + 1, sender: 'Me', time: 'Now', content: currentMessage, isMine: true },
            ]);
            setCurrentMessage('');
        }
    };

    return (
        <div className="flex h-full bg-beige-100 font-sans">
            {/* Sidebar */}
            <div className="w-1/3 bg-white shadow-md rounded-l-xl flex flex-col">
                {/* Search Bar */}
                <div className="flex items-center space-x-3 p-4 border-b">
                    <i className="fi fi-br-search text-lg"></i>
                    <input
                        type="text"
                        placeholder="Search Messages"
                        className="w-full p-2 text-sm bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                {/* Message List */}
                <div className="overflow-y-auto flex-grow">
                    {/* Individual Message */}
                    <div className="p-4 flex items-center justify-between hover:bg-orange-100 transition cursor-pointer border-b">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-1"></div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mr-2">Dr. Ashuk Singh</h4>
                            <p className="text-sm text-gray-500 truncate">Please Send Me Your Medical...</p>
                        </div>
                        <span className="text-xs text-gray-400">9:30 AM</span>
                    </div>
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-beige-50 rounded-xl">
                {/* Chat Header */}
                <div className="p-4 flex items-center bg-white border-b rounded-tr-xl">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-1"></div>
                    <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-800">Dr. Ashuk Singh</h3>
                        <span className="text-sm text-gray-500">Doctor</span>
                    </div>
                </div>

                {/* Messages Section */}
                <div className="flex-1 p-4 overflow-y-auto mt-2">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex items-${message.isMine ? 'end justify-end' : 'start'} space-x-3 mb-4`}
                        >
                            {!message.isMine && <div className="w-10 h-10 bg-gray-300 rounded-full"></div>}
                            <div>
                                <p
                                    className={`p-3 rounded-xl text-sm ${
                                        message.isMine ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-800'
                                    }`}
                                >
                                    {message.content}
                                </p>
                                <span
                                    className={`text-xs text-gray-400 block ${
                                        message.isMine ? 'text-right' : ''
                                    }`}
                                >
                  {message.time}
                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Input Section */}
                <div className="p-4 bg-white border-t flex items-center space-x-3 rounded-br-xl">
                    <input
                        type="text"
                        placeholder="Type Your Message"
                        className="flex-1 p-3 text-sm bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button
                        className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition flex items-center justify-center"
                        onClick={handleSendMessage}
                    >
                        <i className="bx bxs-paper-plane text-md"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
