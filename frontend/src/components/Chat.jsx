import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
  //placeholder data need to come from backend api
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Jagga Daku",
      initials: "JD",
      lastMessage: "Aali Vau ghatauna milxa?",
      time: "2m ago",
      messages: [
        { id: 1, text: "Hello bro tapai le tyo book aile ni bechiraho", sender: "other", time: "10:30 AM" },
        { id: 2, text: "Awh bro", sender: "user", time: "10:31 AM" },
        { id: 3, text: "Aali Vau ghatauna milxa??", sender: "other", time: "10:32 AM" },
        { id: 4, text: "Suna Bro 750 vanda ghatdaina", sender: "user", time: "10:33 AM" },
      ]
    },
    {
      id: 2,
      name: "Sharukh Khan",
      initials: "SK",
      lastMessage: "Laptop sanga charger ni painxa?",
      time: "1h ago",
      messages: [
        { id: 1, text: "Laptop sanga charger ni painxa?", sender: "other", time: "9:15 AM" },
        { id: 2, text: "Awh sir charger ni painxa", sender: "user", time: "9:20 AM" },
      ]
    },
  ]);

  const [activeConversation, setActiveConversation] = useState(1);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const activeConv = conversations.find(c => c.id === activeConversation);
  const messages = activeConv?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update the messages in the active conversation
    setConversations(conversations.map(conv => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: inputText,
          time: "Just now"
        };
      }
      return conv;
    }));

    setInputText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100 p-4 gap-4">
      {/* Left Sidebar - Conversations List */}
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
              onClick={() => setActiveConversation(conv.id)}
              className={`p-4 border-b cursor-pointer transition hover:bg-gray-50 ${
                conv.id === activeConversation ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <img 
                  src="https://via.placeholder.com/48" 
                  alt={conv.name}
                  className="h-12 w-12 rounded-full border-2 border-indigo-600 flex-shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{conv.name}</h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Active Chat */}
      <div className="flex-1 bg-white rounded-xl shadow-md flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://via.placeholder.com/40" 
              alt={activeConv?.name}
              className="h-10 w-10 rounded-full border-2 border-indigo-600 object-cover"
            />
            <h3 className="font-semibold text-gray-800">{activeConv?.name}</h3>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.sender === "user" ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === "user"
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
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
