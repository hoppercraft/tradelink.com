import { IoClose, IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const ProductPopup = ({ product, onClose }) => {
  const imageUrl =
    product.photo && product.photo.length > 0
      ? product.photo[0]
      : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition cursor-pointer"
          >
            <IoClose className="text-xl text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>

          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <IoLocationSharp className="text-indigo-500" />
            <span>{product.locations || "Location not specified"}</span>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.content || "No description provided."}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Posted on{" "}
              {new Date(product.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition cursor-pointer">
              Contact Seller
            </button>
            <button className="p-3 border border-gray-200 hover:bg-gray-50 rounded-xl transition cursor-pointer">
              <MdEmail className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
