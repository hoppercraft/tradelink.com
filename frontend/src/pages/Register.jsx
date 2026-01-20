import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apicentralize";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/user/register/", {
        username: form.name,
        password: form.password,
        email: form.email,
        first_name: form.name,
      });

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      const backendError =
        err.response?.data?.username?.[0] ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.detail ||
        "Registration failed";
      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-950 to-gray-950 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/10 p-8 rounded-2xl shadow-2xl text-white">
        <h1 className="text-4xl font-extrabold text-center tracking-wide">
          TRADE<span className="text-indigo-600">LiNK</span>
        </h1>
        <p className="text-center text-gray-300 mt-1 mb-6">
          Create your account
        </p>

        {error && (
          <p className="mb-4 text-red-400 text-center font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-lg shadow-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="ml-1 text-indigo-400 hover:text-indigo-300 cursor-pointer underline"
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
