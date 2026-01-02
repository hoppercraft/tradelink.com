import React from "react";

const Card = ({ product }) => {
  return (
    <div className="w-72 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition">
      <div className="h-44 bg-gray-100 relative group">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        {/* Hover Overlay with Description */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <p className="text-white text-sm text-center leading-relaxed">
            This is a detailed description that appears when you hover over the product image.
          </p>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-600">
          {product.description}
        </p>

        <p className="text-lg font-semibold text-gray-900">
          Rs. {product.price}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full overflow-hidden border">
              <img
                src={product.seller.avatar}
                alt={product.seller.username}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              @{product.seller.username}
            </span>
          </div>

          <button className="px-4 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
