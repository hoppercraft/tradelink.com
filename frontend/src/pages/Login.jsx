import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!form.email || !form.password) {
      setLocalError("All fields must be filled");
      return;
    }

    try {
      await login(form);
      navigate("/explore");
    } catch {
      //
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-indigo-950 to-gray-950 relative overflow-hidden">
      
      {/* Soft background glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 bg-indigo-600 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-indigo-700 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/10 p-8 rounded-2xl shadow-2xl text-white">
        
        <h1 className="text-4xl font-extrabold text-center tracking-wide">
          TRADE<span className="text-indigo-600">LiNK</span>
        </h1>
        <p className="text-center text-gray-300 mt-1 mb-6">
          Sign in to your account
        </p>

        {localError && (
          <p className="mb-4 text-red-400 text-center font-semibold">
            {localError}
          </p>
        )}

        {error && (
          <p className="mb-4 text-red-400 text-center font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-lg shadow-lg cursor-pointer"
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-300">
            Don’t have an account?
            <span
              onClick={() => navigate("/register")}
              className="ml-1 text-indigo-400 hover:text-indigo-300 cursor-pointer underline"
            >
              Register
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
