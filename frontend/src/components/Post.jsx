import React, { useState, useRef } from "react";
import api from "../apicentralize";
import { useAuth } from "../auth/useAuth";

const Post = () => {
  const { isAuthenticated, loading, user } = useAuth();

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [locations, setLocations] = useState("");
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const autoResize = () => {
    const size = textareaRef.current;
    size.style.height = "auto";
    size.style.height = size.scrollHeight + "px";
  };

  const chooseImage = () => {
    fileInputRef.current.click();
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isAuthenticated) {
      setError("You must be logged in to post an item.");
      return;
    }

    if (!title || !content || !image || !locations) {
      setError("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", user?.username || "");
    formData.append("locations", locations);
    formData.append("photo", image);

    try {
      setSubmitting(true);

      const res = await api.post("/api/v1/tradelink/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setSuccess("Item posted successfully!");
        setTitle("");
        setImage(null);
        setContent("");
        setLocations("");
        setPreview(null);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to upload item. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[88vh] flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Create Post</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl">
            {success}
          </div>
        )}

        {/* Image upload */}
        <div className="flex items-center gap-6">
          <div className="h-34 w-34 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-center p-2">No image</span>
            )}
          </div>
          <button
            type="button"
            className="px-6 py-3 text-base bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
            onClick={chooseImage}
          >
            Choose Image
          </button>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={changeImage}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800 font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter item title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Content/Description */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800 font-medium">
            Description
          </label>
          <textarea
            ref={textareaRef}
            rows={3}
            onChange={(e) => {
              setContent(e.target.value);
              autoResize();
            }}
            placeholder="Describe your item..."
            value={content}
            className="border border-gray-300 resize-none rounded-xl px-4 py-3 overflow-hidden text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800 font-medium">Location</label>
          <input
            type="text"
            placeholder="e.g. Kathmandu, Nepal"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Post button */}
        <button
          onClick={submit}
          disabled={submitting}
          className="w-full py-3 text-lg bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {submitting ? "Posting..." : "Post Item"}
        </button>
      </div>
    </div>
  );
};

export default Post;
