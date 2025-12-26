import React from "react";
import { NavLink } from "react-router-dom";

const SidePanel = () => {
  return (
    <div className="absolute top-16 left-0 bottom-0 w-64 bg-gray-400 p-4">
      <h3 className="text-lg font-semibold mb-4">Side Panel</h3>
      <ul>
        <li className="mb-2">
          <NavLink to="/explore">Explore</NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/post">Post Items</NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/help">Help & Report</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
