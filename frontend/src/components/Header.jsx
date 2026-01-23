import { useNavigate, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import api from "../api";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await api.post("/api/v1/tradelink/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm flex items-center justify-between px-6 z-50">
      {/* Logo */}
      <h1
        className="text-2xl font-extrabold tracking-wide text-gray-900 cursor-pointer"
        onClick={() => navigate("/home/explore")}
      >
        TRADE<span className="text-indigo-600">LiNK</span>
      </h1>

      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-lg mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2.5 pl-11 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
          <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/home/profile")}
          className={`p-2 rounded-lg transition cursor-pointer ${
            location.pathname === "/home/profile"
              ? "bg-indigo-100 text-indigo-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <FiUser className="text-xl" />
        </button>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-500 transition cursor-pointer"
          title="Logout"
        >
          <MdLogout className="text-xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;
