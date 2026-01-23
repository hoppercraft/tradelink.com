import { useState } from "react";
import { useAuth } from "../auth/useAuth.js";

const ProfileUpdate = ({ close }) => {
  const authContext = useAuth();
  const user = authContext?.user || null;
  const updateUser = authContext?.updateUser || null;

  const [form, setForm] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    location: user?.location || ""
  });

  const chooseImage = () => fileInputRef.current.click();

  const changeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, profilepic: file });
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    try {
      if (updateUser) {
        await updateUser({
          fullname: form.fullname,
          email: form.email,
          location: form.location
        });
        alert("Profile updated successfully!");
      }
      close();
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Edit Profile
        </h2>

        {/* Image upload */}
        <div className="flex items-center gap-6">
          <button
            onClick={chooseImage}
            className="px-6 py-3 bg-gray-800 text-white rounded-xl"
          >
            Choose Image
          </button>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={changeImage}
          />
        </div>

        {/* Username - Read Only */}
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            value={user?.username || ""}
            disabled
            className="border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500">Username cannot be changed</p>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label>Full Name</label>
          <input
            value={form.fullname}
            onChange={e =>
              setForm({ ...form, fullname: e.target.value })
            }
            placeholder="Enter your full name"
            className="border rounded-xl px-4 py-3"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="Enter your email"
            className="border rounded-xl px-4 py-3"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label>Location</label>
          <input
            value={form.location}
            onChange={e =>
              setForm({ ...form, location: e.target.value })
            }
            placeholder="Enter your location"
            className="border rounded-xl px-4 py-3"
          />
        </div>

        <button
          onClick={submit}
          className="w-full py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
