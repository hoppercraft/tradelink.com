import { NavLink } from "react-router-dom";
import { MdExplore, MdAddBox, MdHelp, MdChat, MdPerson } from "react-icons/md";

const navItems = [
  { path: "/home/explore", icon: MdExplore, label: "Explore" },
  { path: "/home/post", icon: MdAddBox, label: "Post Item" },
  { path: "/home/chat", icon: MdChat, label: "Messages" },
  { path: "/home/profile", icon: MdPerson, label: "Profile" },
  { path: "/home/help", icon: MdHelp, label: "Help" },
];

const Sidepanel = () => {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
          <h4 className="font-semibold mb-1">TradeLink Pro</h4>
          <p className="text-xs text-indigo-100">
            Your marketplace for trading items
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidepanel;
