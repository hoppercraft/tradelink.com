import { IoLocationSharp } from "react-icons/io5";

const Card = ({ product, onClick }) => {
  const imageUrl =
    product.photo && product.photo.length > 0
      ? product.photo[0]
      : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg truncate">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.content}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <IoLocationSharp className="text-indigo-500" />
            <span className="truncate max-w-[100px]">
              {product.locations || "Unknown"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
