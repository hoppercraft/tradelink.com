import { useState } from "react";
import { useAuth } from "../auth/useAuth.js";

const ProfileUpdate = ({ close }) => {
  const { user, updateUser, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      await updateUser({
        fullname: form.fullname,
        email: form.email,
        location: form.location,
      });
      setSuccess("Profile updated successfully!");
      setTimeout(() => close(), 1500);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    setError("");
    setSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await changePassword(passwordForm.oldPassword, passwordForm.newPassword);
      setSuccess("Password changed successfully!");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => close(), 1500);
    } catch (err) {
      setError(err.message || "Failed to change password");
    } finally {
      setLoading(false);
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

        {/* Tabs */}
        <div className="flex gap-4 border-b pb-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-2 px-2 font-medium transition ${
              activeTab === "profile"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`pb-2 px-2 font-medium transition ${
              activeTab === "password"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Change Password
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-xl text-sm">
            {success}
          </div>
        )}

        {activeTab === "profile" ? (
          <>
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Full Name</label>
              <input
                value={form.fullname}
                onChange={e => setForm({ ...form, fullname: e.target.value })}
                placeholder="Enter your full name"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Location</label>
              <input
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="Enter your location"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleProfileSubmit}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <>
            {/* Current Password */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={passwordForm.oldPassword}
                onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                placeholder="Enter current password"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="Enter new password"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handlePasswordSubmit}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </>
        )}

        <button
          onClick={close}
          className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
