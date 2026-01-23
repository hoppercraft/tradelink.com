import React, { useState, useRef } from 'react'
import OwnerCard from './OwnerCard'
import NotificationCard from './NotificationCard'
import { useAuth } from '../auth/useAuth'
import ProfileUpdate from './ProfileUpdate'
import DeleteConfirmation from './DeleteConfirmation'
import { useDetail } from '../context-products/getDetail'

const Profile = () => {
  const { user, logout, updateProfilePhoto } = useAuth();
  const { products, deleteProduct, loading } = useDetail();
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Filter products by current user
  const myProducts = products.filter(p => p.author === user?.username);

  const handleRemoveProduct = (product) => {
    setSelectedProduct(product);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct._id);
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("Failed to delete product");
      }
    }
    setSelectedProduct(null);
    setDeleteConfirmOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoUploading(true);
    try {
      await updateProfilePhoto(file);
    } catch (err) {
      alert(err.message || "Failed to upload photo");
    } finally {
      setPhotoUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-5">
      {/* Profile Info */}
      <div className='flex flex-row items-center justify-center gap-6 flex-wrap'>
        <div className="flex flex-col items-center mt-2 px-4">
          {/* Profile Photo - Clickable */}
          <div 
            className="relative rounded-full border-4 border-indigo-200 h-36 w-36 flex items-center justify-center bg-indigo-100 shadow-lg mt-3 cursor-pointer group overflow-hidden"
            onClick={handlePhotoClick}
          >
            {user?.photo ? (
              <img 
                src={user.photo} 
                alt="Profile" 
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <span className="text-5xl font-bold text-indigo-600">
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </span>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
              <span className="text-white text-sm font-medium">
                {photoUploading ? "Uploading..." : "Change Photo"}
              </span>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          
          {/* User Info */}
          <p className="mt-3 text-4xl font-bold text-gray-900">{user?.username || "Guest"}</p>
          {user?.fullname && (
            <p className="text-xl text-gray-700 mt-1">{user.fullname}</p>
          )}
          <p className="text-lg text-gray-500 mt-1">{user?.email || "No email"}</p>
          {user?.location && (
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {user.location}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <button 
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer" 
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </button>
          <button 
            className="px-8 py-3 bg-red-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {open && <ProfileUpdate close={() => setOpen(false)} />}
      {deleteConfirmOpen && (
        <DeleteConfirmation
          close={() => {
            setDeleteConfirmOpen(false);
            setSelectedProduct(null);
          }}
          onConfirm={confirmDelete}
          productName={selectedProduct?.title}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 px-4 mt-8">
        {/* Notifications */}
        <div className="md:col-span-2 space-y-3 bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800 mb-2">Notifications</p>
          <div className="space-y-2">
            <NotificationCard message="Welcome to TradeLink!" />
            <NotificationCard message="Your profile is ready" />
          </div>
        </div>

        {/* My Posts */}
        <div className="md:col-span-4 space-y-3 bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800 mb-2">My Posts ({myProducts.length})</p>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : myProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>You haven't posted anything yet.</p>
              <a href="/home/post" className="text-indigo-600 hover:underline mt-2 inline-block">
                Create your first post
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myProducts.map((product) => (
                <OwnerCard 
                  key={product._id}
                  product={product}
                  onRemove={handleRemoveProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
