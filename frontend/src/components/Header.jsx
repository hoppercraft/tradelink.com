import { MdLogout } from "react-icons/md";
import { IoNotificationsSharp,IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-wide text-gray-900">
        TRADE<span className="text-indigo-600">LiNK</span>
      </h1>

      {/* Search Bar */}
     <div className="flex items-center flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 px-3 py-1.5 h-10 rounded-l-full border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-r-full transition h-10">
          <IoSearch className="text-lg " />
        </button>
      </div>

      
      <div className="flex items-center gap-5">
        <IoNotificationsSharp
          className="text-2xl text-gray-600 hover:text-indigo-600 cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <MdLogout
          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
          onClick={Logout}
        />
      </div>
    </header>
  );
};

export default Header;
