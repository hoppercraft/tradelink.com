import React from "react";

const OwnerCard = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-lg">
      <div className="h-32 bg-gray-100">
        <img
          src="https://via.placeholder.com/300"
          alt="product"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-3 space-y-1">
        <p className="text-xs text-gray-600 line-clamp-2">
          Short product description goes here
        </p>
        <p className="text-sm font-semibold text-gray-900">Rs. 1,200</p>
        <div className="flex items-center justify-between pt-1">
          <button className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer">
            Edit
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerCard;
