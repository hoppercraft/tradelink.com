import React from "react";

const OwnerCard = ({ product, onRemove }) => {
  // Handle both backend and mock data formats
  const imageUrl = product?.photo?.[0] || product?.image || "https://via.placeholder.com/300";
  const title = product?.title || product?.item_name || "Untitled";
  const description = product?.content || product?.description || "";
  const location = Array.isArray(product?.locations) 
    ? product?.locations.join(", ") 
    : product?.locations || "";

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-lg">
      <div className="h-32 bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-3 space-y-1">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {title}
        </p>
        <p className="text-xs text-gray-600 line-clamp-2">
          {description}
        </p>
        {location && (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {location}
          </p>
        )}
        <div className="flex items-center justify-end pt-1">
          <button 
            onClick={() => onRemove?.(product)}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerCard;
