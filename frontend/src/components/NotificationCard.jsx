import React from 'react'

const NotificationCard = ({ message = "No new notifications" }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 flex items-center gap-2 text-sm text-gray-800 hover:bg-indigo-50 transition">
      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
      <p>{message}</p>
    </div>
  )
}

export default NotificationCard
