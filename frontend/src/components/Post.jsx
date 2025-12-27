import React from "react";

const Post = () => {
  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Create Post
        </h2>

        {/* Image upload */}
        <div className="flex items-center gap-6">
          <div className="h-32 w-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
            <img src="" alt="photo" srcset="" />
          </div>
          <button className="px-6 py-3 text-base bg-gray-800 text-white rounded-xl hover:bg-gray-700">
            Choose Image
          </button>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800">
            Product Description
          </label>
          <input
            type="text"
            placeholder="Enter description"
            className="border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800">Price</label>
          <input
            type="text"
            placeholder="e.g. 1200"
            className="border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* Post button */}
        <button className="w-full py-3 text-lg bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-500 cursor-pointer">
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
