import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete, MdLocationOn, MdEmail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import api from "../api";
import ProfileUpdate from "./ProfileUpdate";
import DeleteConfirmation from "./DeleteConfirmation";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch profile
      const profileRes = await api.get("/api/v1/tradelink/profile");
      setUser(profileRes.data.user);

      // Fetch all posts and filter user's posts
      const postsRes = await api.get("/api/v1/tradelink/post");
      if (postsRes.data.success) {
        // Filter posts by current user's username
        const myPosts = postsRes.data.data.filter(
          (post) => post.author === profileRes.data.user?.username ||
                    post.author === profileRes.data.user?._id
        );
        setUserPosts(myPosts);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!selectedPost) return;

    try {
      await api.delete(`/api/v1/tradelink/post/${selectedPost._id}`);
      setUserPosts(userPosts.filter((p) => p._id !== selectedPost._id));
      setShowDeleteConfirm(false);
      setSelectedPost(null);
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  const handleProfileUpdate = () => {
    setShowEditProfile(false);
    fetchData(); // Refresh profile data
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <FiUser className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.fullname || user?.username || "User"}
              </h1>
              <p className="text-gray-500">@{user?.username}</p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                {user?.email && (
                  <div className="flex items-center gap-1">
                    <MdEmail className="text-indigo-500" />
                    <span>{user.email}</span>
                  </div>
                )}
                {user?.location && (
                  <div className="flex items-center gap-1">
                    <MdLocationOn className="text-indigo-500" />
                    <span>{user.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowEditProfile(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center gap-2 cursor-pointer"
          >
            <MdEdit />
            Edit Profile
          </button>
        </div>
      </div>

      {/* User's Posts */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          My Posts ({userPosts.length})
        </h2>

        {userPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-gray-500">You haven't posted anything yet</p>
            <button
              onClick={() => navigate("/home/post")}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPosts.map((post) => (
              <div
                key={post._id}
                className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={post.photo?.[0] || "https://via.placeholder.com/200"}
                  alt={post.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {post.content}
                  </p>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        setShowDeleteConfirm(true);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <ProfileUpdate
          user={user}
          onClose={() => setShowEditProfile(false)}
          onUpdate={handleProfileUpdate}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmation
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
          onConfirm={handleDeletePost}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
};

export default Profile;
