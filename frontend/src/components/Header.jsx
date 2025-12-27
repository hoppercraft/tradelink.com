import { MdLogout } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-50">
      <h1 className="text-2xl font-extrabold tracking-wide text-gray-900">
        TRADE<span className="text-indigo-600">LiNK</span>
      </h1>

      <div className="flex items-center gap-5">
        <IoNotificationsSharp className="text-2xl text-gray-600 hover:text-indigo-600 cursor-pointer" />
        <MdLogout
          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
          onClick={Logout}
        />
      </div>
    </header>
  );
};

export default Header;
