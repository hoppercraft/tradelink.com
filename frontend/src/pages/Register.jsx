import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

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

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      navigate("/login");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-indigo-950 to-gray-950 relative overflow-hidden">
      
      {/* Soft indigo background glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 bg-indigo-600 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-indigo-700 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/10 p-8 rounded-2xl shadow-2xl text-white">
        
        <h1 className="text-4xl font-extrabold text-center tracking-wide">
          TRADE<span className="text-indigo-400">LiNK</span>
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
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-lg shadow-lg"
          >
            Register
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
