import React from "react";

const Card = () => {
  return (
    <div className="w-72 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition">
      {/* Product Image */}
      <div className="h-44 bg-gray-100">
        <img
          src="https://via.placeholder.com/300"
          alt="product"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-600">
          Short product description goes here
        </p>

        <p className="text-lg font-semibold text-gray-900">
          Rs. 1,200
        </p>

        <div className="flex items-center justify-between pt-2">
          {/* Seller */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full overflow-hidden border">
              <img
                src="https://via.placeholder.com/40"
                alt="seller"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              @sellername
            </span>
          </div>

          <button className="px-4 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
