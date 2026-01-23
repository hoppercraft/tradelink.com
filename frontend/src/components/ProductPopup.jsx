import React, { useState } from "react";

const ProductPopup = ({ product, isOpen, onClose }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!isOpen) return null;

  // Handle both backend and mock data formats
  const imageUrl = product.photo?.[0] || product.image || "";
  const title = product.title || product.item_name || "Untitled";
  const description = product.content || product.description || "";
  const author = product.author || "Unknown";
  const location = Array.isArray(product.locations) 
    ? product.locations.join(", ") 
    : product.locations || "";
  const createdAt = product.createdAt 
    ? new Date(product.createdAt).toLocaleDateString() 
    : "";

  const handleContact = () => {
    alert(`Contact seller @${author} about "${title}"`);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center pl-[90px] z-50 p-4"
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
            {!imageError && imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
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
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

            {/* Location */}
            {location && (
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{location}</span>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-800">Description</label>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {description}
                </p>
              </div>
            )}

            {/* Seller Information */}
            <div className="flex flex-col gap-2 border-t pt-4">
              <label className="text-base font-medium text-gray-800">Posted by</label>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-bold text-lg">
                    {author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    @{author}
                  </p>
                  {createdAt && (
                    <p className="text-xs text-gray-600">
                      Posted on {createdAt}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleContact}
                className="flex-1 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition cursor-pointer"
              >
                Contact Seller
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
