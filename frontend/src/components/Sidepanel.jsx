import React from "react";
import { NavLink } from "react-router-dom";

const linkClass =
  "block px-4 py-2 font-medium transition-colors";

const SidePanel = () => {
  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 bg-gray-900 text-gray-100 shadow-lg">
      <div className="pt-5 pb-5">
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-6">
          Navigation
        </h3>

        <ul className="space-y-2">
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `${linkClass} ${isActive? "bg-indigo-600 text-white"  : "hover:bg-gray-800"}`}>
              Explore
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${linkClass} ${ isActive? "bg-indigo-600 text-white": "hover:bg-gray-800"}`}>
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/post"
              className={({ isActive }) =>
                `${linkClass} ${ isActive? "bg-indigo-600 text-white": "hover:bg-gray-800"}`}>
              Post Items
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `${linkClass} ${isActive? "bg-indigo-600 text-white": "hover:bg-gray-800"}`}>
              Help & Report
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidePanel;
