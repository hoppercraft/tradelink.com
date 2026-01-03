import React, { useState } from 'react'
import OwnerCard from './OwnerCard'
import NotificationCard from './NotificationCard'
import { useAuth } from '../auth/useAuth'
import ProfileUpdate from './ProfileUpdate'

const Profile = () => {
  const { user } = useAuth
  const [open, setOpen] = useState(false);
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
          <p className="mt-3 text-4xl font-bold text-gray-900">Username</p>
          <p className="text-lg text-gray-600 mt-1">Information</p>
        </div>
        <button className="mt-4 md:mt-10 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => { setOpen(true) }}>
          Change Profile
        </button>
      </div>

      {open && user && <ProfileUpdate close={() => setOpen(false)} />}

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
            <OwnerCard />
            <OwnerCard />
            <OwnerCard />
            <OwnerCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
