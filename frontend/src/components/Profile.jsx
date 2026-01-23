import React, { useState, useEffect } from 'react'
import OwnerCard from './OwnerCard'
import NotificationCard from './NotificationCard'
import { useAuth } from '../auth/useAuth'
import ProfileUpdate from './ProfileUpdate'
import ProductUpdate from './ProductUpdate'
import DeleteConfirmation from './DeleteConfirmation'
import api from '../apicentralize'

const Profile = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [productEditOpen, setProductEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  // Fetch user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?._id) return;
      
      try {
        const res = await api.get('/api/v1/tradelink/post');
        if (res.data.success && res.data.data) {
          // Filter posts by the current user
          const myPosts = res.data.data.filter(post => post.author === user._id);
          setUserPosts(myPosts);
        }
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductEditOpen(true);
  };

  const handleRemoveProduct = (product) => {
    setSelectedProduct(product);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/v1/tradelink/post/${selectedProduct._id}`);
      // Remove the deleted post from state
      setUserPosts(userPosts.filter(post => post._id !== selectedProduct._id));
      setDeleteConfirmOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-5">
      {/* Profile Info */}
      <div className='flex flex-row items-center justify-center '>
        <div className="flex flex-col items-center mt-2 px-4">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="rounded-full border-4 border-white h-36 w-36 object-cover shadow-lg mt-3"
          />
          <p className="mt-3 text-4xl font-bold text-gray-900">{user?.username || "Username"}</p>
          <p className="text-lg text-gray-600 mt-1">{user?.email || "Email not set"}</p>
          {user?.location && <p className="text-sm text-gray-500">{user.location}</p>}
        </div>
        <button className="mt-4 md:mt-10 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => { setOpen(true) }}>
          Change Profile
        </button>
      </div>

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
          productName={selectedProduct?.title}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 px-4 mt-8">
        {/* Notifications */}
        <div className="md:col-span-2 space-y-3 bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800 mb-2">Notifications</p>
          <div className="space-y-2">
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </div>
        </div>

        {/* Shop */}
        <div className="md:col-span-4 space-y-3 bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800 mb-2">My Shop</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPosts.length > 0 ? (
              userPosts.map((product) => (
                <OwnerCard 
                  key={product._id}
                  product={product}
                  onEdit={handleEditProduct}
                  onRemove={handleRemoveProduct}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center py-8">No products posted yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
