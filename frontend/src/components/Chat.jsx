import React, { useState, useRef, useEffect } from "react";
import defaultUser from '../assets/default-avatar.jpg';
import api from "../apicentralize";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  // Helper to get the current conversation object for the header
  const activeConv = conversations.find(c => c.id === activeConversation);

  // 1. Fetch Conversations
  const fetchConvs = async () => {
    try {
      const res = await api.get("/api/conversations/");
      setConversations(res.data);
      
      // Auto-select logic (Runs only if no chat is currently active)
      if (!activeConversation) {
        if (location.state?.selectedId) {
          setActiveConversation(location.state.selectedId);
        } else if (res.data.length > 0) {
          setActiveConversation(res.data[0].id);
        }
      }
    } catch (err) {
      console.error("Error fetching conversations", err);
    }
  };

  useEffect(() => {
    fetchConvs();
  }, [location.state?.refresh]);

  // 2. THE FIX: Watch for changes to activeConversation
  // This runs automatically whenever you click a chat OR when the page loads a chat
  useEffect(() => {
    if (activeConversation) {
      const markAsRead = async () => {
        try {
            // Update Backend
            await api.post(`/api/conversations/${activeConversation}/read/`);
            
            // Update Frontend IMMEDIATELY (remove unread badge locally)
            setConversations(prevConvs => 
                prevConvs.map(c => 
                    c.id === activeConversation 
                    ? { ...c, unread_messages: 0 } 
                    : c
                )
            );
        } catch (err) {
            console.error("Error marking as read", err);
        }
      };
      markAsRead();
    }
  }, [activeConversation]); // <--- Dependency ensures this runs every time you switch chats

  // 3. Fetch Messages & Polling
  useEffect(() => {
    if (!activeConversation) return;
    
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/conversations/${activeConversation}/messages/`);
        setMessages(res.data);
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); 
    return () => clearInterval(interval);
  }, [activeConversation]);

  // 4. Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 5. Sending Messages
  const handleSendMessage = async () => {
    if (inputText.trim() === "" || !activeConversation) return;

    try {
      const res = await api.post(`/api/conversations/${activeConversation}/messages/`, {
        text: inputText,
        conversation: activeConversation
      });
      
      setMessages([...messages, res.data]);
      setInputText("");
      
      // Refresh sidebar to show the new "Last Message"
      fetchConvs(); 
    } catch (err) {
      alert("Message failed to send");
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100 p-4 gap-4">
      {/* Sidebar */}
      <div className="w-80 bg-white rounded-xl shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Messages</h2>
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversation(conv.id)} // Just set state, the useEffect handles the rest
              className={`p-4 border-b cursor-pointer transition hover:bg-gray-50 ${
                conv.id === activeConversation ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={conv.other_person.avatar || defaultUser}
                  alt={conv.other_person.name}
                  className="h-12 w-12 rounded-full border-2 border-indigo-600 flex-shrink-0 object-cover"
                  onError={(e) => { e.target.src = defaultUser;}}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {conv.other_person.name}
                    </h3>
                    {/* Unread Badge */}
                    {conv.unread_messages > 0 && (
                        <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {conv.unread_messages}
                        </span>
                    )}
                  </div>
                  <p className={`text-sm truncate ${conv.unread_messages > 0 ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                    {conv.last_message || "No messages yet"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white rounded-xl shadow-md flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={activeConv?.other_person?.avatar || defaultUser}
              alt={activeConv?.other_person?.name}
              className="h-10 w-10 rounded-full border-2 border-indigo-600 object-cover"
            />
            <h3 className="font-semibold text-gray-800">
              {activeConv?.other_person?.name || "Select a Chat"}
            </h3>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.is_me ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] flex flex-col ${message.is_me ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.is_me
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;