// Profile.jsx
import { useState, useEffect } from 'react';
import OwnerCard from './OwnerCard';
import NotificationCard from './NotificationCard';
import { useAuth } from '../auth/useAuth';
import { useDetail } from '../context-products/getDetail';
import ProfileUpdate from './ProfileUpdate';
import ProductUpdate from './ProductUpdate';
import DeleteConfirmation from './DeleteConfirmation';
import defaultUser from '../assets/default-avatar.jpg';
import api from '../apicentralize';

const Profile = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const { myProducts, fetchMyProducts, deleteProduct } = useDetail();

  const [open, setOpen] = useState(false);
  const [productEditOpen, setProductEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sanitize = (val) => {
    if (!val || val === "null" || val === null) return "";
    return val;
  };
  useEffect(() => {
    if (user) {
      fetchMyProducts();
      fetchNotifications();
    }
  }, [user]);
  const fetchNotifications = async () => {
    try {
        const res = await api.get("/api/conversations/");
        // Only show conversations that actually have UNREAD messages
        const unreadOnly = res.data.filter(conv => conv.unread_messages > 0);
        setNotifications(unreadOnly);
    } catch (err) {
        console.error(err);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductEditOpen(true);
  };

  const handleRemoveProduct = (product) => {
    setSelectedProduct(product);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      setSelectedProduct(null);
      setDeleteConfirmOpen(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-5">
      {/* Profile Info */}
      <div className='flex flex-row items-center justify-center '>
        <div className="flex flex-col items-center mt-2 px-4">
          <img
            src={user?.avatar || defaultUser}
            alt="profile"
            className="rounded-full border-4 border-white h-36 w-36 object-cover shadow-lg mt-3"
          />
          <p className="mt-3 text-4xl font-bold text-gray-900">
            {user?.username || "Guest"}
          </p>
          <p className="text-lg text-gray-600 mt-1">
            Email:{user?.email || "N.A."}
          </p>
          <p className="text-lg text-gray-600 mt-1">
            Phone no:{sanitize(user?.phone || "N.A.")}
          </p>
        </div>

        <button
          className="mt-4 md:mt-10 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Change Profile
        </button>
      </div>

      {/* Modals */}
      {open && <ProfileUpdate close={() => setOpen(false)} />}
      {productEditOpen && (
        <ProductUpdate 
          close={() => setProductEditOpen(false)} 
          product={selectedProduct}
        />
      )}
      {deleteConfirmOpen && (
        <DeleteConfirmation
          close={() => setDeleteConfirmOpen(false)}
          onConfirm={confirmDelete}
          productName={selectedProduct?.item_name}
        />
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 px-4 mt-8">
        {/* Notifications */}
        <div className="md:col-span-2 space-y-3 bg-white p-4 rounded-lg shadow-md h-fit">
          <p className="text-xl font-semibold text-gray-800 mb-2">Recent Chats</p>
          <div className="space-y-2">
            {notifications.length > 0 ? (
              notifications.map(conv => (
                <NotificationCard key={conv.id} conversation={conv} />
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No recent messages.</p>
            )}
          </div>
        </div>

        {/* My Shop */}
        <div className="md:col-span-4 space-y-3 bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800 mb-2">My Shop</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProducts.length === 0 ? (
              <p className="text-gray-500 col-span-full">
                You have no products yet.
              </p>
            ) : (
              myProducts.map((product) => (
                <OwnerCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onRemove={handleRemoveProduct}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
