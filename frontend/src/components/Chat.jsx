import { MdChat, MdConstruction } from "react-icons/md";

const Chat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
        <MdChat className="text-4xl text-indigo-600" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Messages</h1>
      
      <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg mb-4">
        <MdConstruction />
        <span className="text-sm font-medium">Coming Soon</span>
      </div>
      
      <p className="text-gray-500 max-w-md">
        Real-time messaging feature is under development. Soon you'll be able to 
        chat with sellers and buyers directly on TradeLink.
      </p>
    </div>
  );
};

export default Chat;
