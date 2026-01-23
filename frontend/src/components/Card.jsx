import React, { useState } from "react";
import ProductPopup from "./ProductPopup";

const Card = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle both backend data and mock data formats
  const imageUrl = product.photo?.[0] || product.image || "https://via.placeholder.com/300";
  const title = product.title || product.item_name || "Untitled";
  const description = product.content || product.description || "";
  const author = product.author || "Unknown";
  const location = Array.isArray(product.locations) 
    ? product.locations.join(", ") 
    : product.locations || "";

  return (
    <>
      <div 
        className="w-72 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-44 bg-gray-100 relative group">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          {/* Hover Overlay with Description */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <p className="text-white text-sm text-center line-clamp-4">{description}</p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <p className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </p>

          {location && (
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden border bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-semibold text-sm">
                  {author.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                @{author}
              </span>
            </div>

            <button 
              className="px-4 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>

      <ProductPopup 
        product={{
          ...product,
          title,
          content: description,
          photo: [imageUrl],
          author,
          locations: location
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Card;