import  { useState } from "react";
import ProductPopup from "./ProductPopup";
import defaultUser from '../assets/default-avatar.jpg';
import { useNavigate } from "react-router-dom";
import api from "../apicentralize";
import { useAuth } from "../auth/useAuth";

const Card = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleBuyClick = async (e) => {
    e.stopPropagation();

    console.log("Buyer:", "ME");
    console.log("Product owner:", product.owner.id);

    try {
      const res = await api.post("/api/conversations/start/", {
        owner_id: product.owner.id
      });

      navigate("/home/chat", {
        state: { selectedId: res.data.conversation_id }
      });
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.error || "Server error");
    }
  };

  
  return (
    <>
      <div 
        className="w-72 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-44 bg-gray-100 relative group">
        <img
          src={product.image}
          alt={product.item_name}
          className="h-full w-full object-cover"
        />
        {/* Hover Overlay with Description */}
        
      </div>

      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-600">
          <strong>{product.item_name}</strong>
        </p>

        <p className="text-lg font-semibold text-gray-900">
          Rs. {product.price}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {product.owner && (
              <>
                <div className="h-10 w-10 rounded-full overflow-hidden border">
                  <img
                    src={product.owner.avatar || defaultUser}
                    alt={product.owner.username}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  @{product.owner.username}
                </span>
              </>
            )}
          </div>
          {product.owner.id !== user.id ?( 
          <button 
            className="px-4 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
           onClick={handleBuyClick}
          >
            Buy
          </button>):(<span className="text-xs text-gray-400">Your product</span>)}
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