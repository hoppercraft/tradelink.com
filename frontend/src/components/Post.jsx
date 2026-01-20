import React, { useState, useRef } from "react";
import api from "../apicentralize";
import { useAuth } from "../auth/useAuth";

const Post = () => {
  const { isAuthenticated, loading } = useAuth();

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const [item_name, setItemName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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

    if (!isAuthenticated) {
      alert("You must be logged in to post an item.");
      return;
    }

    if (!item_name || !price || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const form_data = new FormData();
    form_data.append("item_name", item_name);
    form_data.append("image", image);
    form_data.append("price", price);
    form_data.append("description", description);

    try {
      setSubmitting(true);

      const res = await api.post("/items/", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201 || res.status === 200) {
        alert("Item posted successfully!");
        setItemName("");
        setImage(null);
        setDescription("");
        setPrice("");
        setPreview(null);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(
        err.response?.data?.detail ||
          "Failed to upload item. Are you logged in?"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Checking authentication…</div>;
  }

  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Create Post</h2>

        {/* Image upload */}
        <div className="flex items-center gap-6">
          <div className="h-34 w-34 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm overflow-hidden">
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>
          <button
            type="button"
            className="px-6 py-3 text-base bg-gray-800 text-white rounded-xl hover:bg-gray-700"
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

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800">Item Name</label>
          <input
            type="text"
            placeholder="Item Name"
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800">
            Product Description
          </label>
          <textarea
            ref={textareaRef}
            rows={2}
            onChange={(e) => {
              setDescription(e.target.value);
              autoResize();
            }}
            placeholder="Enter description"
            value={description}
            className="border border-gray-300 resize-none rounded-xl px-4 py-3 overflow-hidden text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-base text-gray-800">Price</label>
          <input
            type="text"
            placeholder="e.g. 1200"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Post button */}
        <button
          onClick={submit}
          disabled={submitting}
          className="w-full py-3 text-lg bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 disabled:opacity-50"
        >
          {submitting ? "Posting…" : "Post"}
        </button>
      </div>
    </div>
  );
};

export default Post;
