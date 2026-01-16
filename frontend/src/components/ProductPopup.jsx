import React, { useState } from "react";

const ProductPopup = ({ product, isOpen, onClose }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!isOpen) return null;

  const handleBuy = () => {
    // Implementing buy functionality
    alert(`Purchasing ${product.item_name} for Rs. ${product.price}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-start pl-[180px] z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-5xl w-full shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Left Side - Product Image */}
          <div className="w-full md:w-[45%] h-96 md:h-auto bg-gray-200 overflow-hidden flex items-center justify-center">
            {!imageError && product.image ? (
              <img
                src={product.image}
                alt={product.item_name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center text-gray-400">
                <p className="text-lg">No image available</p>
              </div>
            )}
          </div>

          {/* Right Side - Product Details */}
          <div className="w-full md:w-[55%] p-8 space-y-4">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800">{product.item_name}</h2>

            {/* Price */}
            <div>
              <span className="text-3xl font-semibold text-indigo-600">
                Rs. {product.price}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="flex flex-col gap-2">
                <label className="text-base text-gray-800">Description</label>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>
            )}

            {/* Seller Information */}
            {product.owner && (
              <div className="flex flex-col gap-2 border-t pt-4">
                <label className="text-base text-gray-800">Seller Information</label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      src={product.owner.avatar || "https://via.placeholder.com/64"}
                      alt={product.owner.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      @{product.owner.username}
                    </p>
                    <p className="text-xs text-gray-600">
                      {product.owner.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleBuy}
                className="flex-1 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition cursor-pointer"
              >
                Buy Now
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
