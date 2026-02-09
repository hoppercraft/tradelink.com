import { MdLogout } from "react-icons/md";
import { IoNotificationsSharp, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useDetail } from "../context-products/getDetail";
import { useState, useEffect } from "react";
import api from "../apicentralize";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { searchInput, setSearchInput, setActiveSearch } = useDetail();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/api/conversations/");
        const unreadOnly = res.data.filter(conv => conv.unread_messages > 0);
        setUnreadCount(unreadOnly.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, []);

  const handleSearch = () => {
    setActiveSearch(searchInput);
  };

  const Logout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-50">
      <h1
        className="text-2xl font-extrabold tracking-wide text-gray-900 cursor-pointer"
        onClick={() => navigate("/home/explore")}
      >
        TRADE<span className="text-indigo-600">LiNK</span>
      </h1>

      <div className="flex items-center flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 px-3 py-1.5 h-10 rounded-l-full border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-r-full transition h-10 cursor-pointer"
          onClick={handleSearch}
        >
          <IoSearch className="text-lg " />
        </button>
      </div>

      <div className="flex items-center gap-5 relative">
        <IoNotificationsSharp
          className={`text-2xl cursor-pointer transition ${
            unreadCount > 0
              ? "text-red-600 animate-pulse shadow-[0_0_8px_red]"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => navigate("/home/profile")}
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
        )}

        <MdLogout
          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
          onClick={Logout}
        />
      </div>
    </header>
  );
};

export default Header;
