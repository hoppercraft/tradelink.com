import React, { useState } from "react";
import ProductPopup from "./ProductPopup";

const Card = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="w-72 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-44 bg-gray-100 relative group">
        <img
          src={product.photo?.[0] || "https://via.placeholder.com/300"}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        {/* Hover Overlay with Description */}
        
      </div>

      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-600">
          <strong>{product.title}</strong>
        </p>

        <p className="text-lg font-semibold text-gray-900">
          Rs. {product.price || "N/A"}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full overflow-hidden border bg-indigo-100 flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-600">
                {typeof product.author === 'string' ? product.author.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {product.locations?.[0] || "Location"}
            </span>
          </div>

          <button 
            className="px-4 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>

      <ProductPopup 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Card;