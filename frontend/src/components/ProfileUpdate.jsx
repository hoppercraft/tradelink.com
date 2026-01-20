import { useRef, useState } from "react";
import { useAuth } from "../auth/useAuth.js";

const ProfileUpdate = ({ close }) => {
  const authContext = useAuth();
  const user = authContext?.user || null;
  const updateUser = authContext?.updateUser || null;
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    username: user?.username || "Guest User",
    information: user?.information || "No information yet",
    profilepic: null
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
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("information", form.information);

    if (form.profilepic) {
      formData.append("profilepic", form.profilepic);
    }

    // Call updateUser if available (when backend is ready)
    if (updateUser) {
      await updateUser(formData);
    } else {
      console.log("Profile update (UI only):", form);
    }
    close();
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

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            value={form.username}
            onChange={e =>
              setForm({ ...form, username: e.target.value })
            }
            className="border rounded-xl px-4 py-3"
          />
        </div>

        {/* Information */}
        <div className="flex flex-col gap-2">
          <label>Information</label>
          <input
            value={form.information}
            onChange={e =>
              setForm({ ...form, information: e.target.value })
            }
            className="border rounded-xl px-4 py-3"
          />
        </div>

        <button
          onClick={submit}
          className="w-full py-3 bg-amber-600 text-white rounded-xl font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
