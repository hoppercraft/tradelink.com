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
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-950 to-gray-950 relative overflow-hidden">
      
      {/* Animated wave backgrounds */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute" style={{width: '150%', height: '150%', left: '-25%', bottom: '-50%'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#1e1b4b', stopOpacity: 0.7}} />
              <stop offset="100%" style={{stopColor: '#312e81', stopOpacity: 0.5}} />
            </linearGradient>
          </defs>
          <path 
            fill="url(#wave1)" 
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            style={{
              animation: 'wave1 15s ease-in-out infinite',
              transform: 'translateY(0)'
            }}
          />
        </svg>
        
        <svg className="absolute" style={{width: '150%', height: '150%', left: '-25%', bottom: '-50%'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#1e3a8a', stopOpacity: 0.6}} />
              <stop offset="100%" style={{stopColor: '#1e40af', stopOpacity: 0.4}} />
            </linearGradient>
          </defs>
          <path 
            fill="url(#wave2)" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            style={{
              animation: 'wave2 20s ease-in-out infinite',
              transform: 'translateY(0)'
            }}
          />
        </svg>
        
        <svg className="absolute" style={{width: '150%', height: '150%', left: '-25%', bottom: '-50%'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#312e81', stopOpacity: 0.5}} />
              <stop offset="100%" style={{stopColor: '#3730a3', stopOpacity: 0.3}} />
            </linearGradient>
          </defs>
          <path 
            fill="url(#wave3)" 
            d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,149.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            style={{
              animation: 'wave3 25s ease-in-out infinite',
              transform: 'translateY(0)'
            }}
          />
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes wave1 {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-50px) translateY(-20px); }
          50% { transform: translateX(-100px) translateY(0); }
          75% { transform: translateX(-50px) translateY(20px); }
        }
        
        @keyframes wave2 {
          0%, 100% { transform: translateX(0) translateY(0); }
          33% { transform: translateX(80px) translateY(30px); }
          66% { transform: translateX(40px) translateY(-15px); }
        }
        
        @keyframes wave3 {
          0%, 100% { transform: translateX(0) translateY(0); }
          40% { transform: translateX(-70px) translateY(25px); }
          80% { transform: translateX(-35px) translateY(-30px); }
        }
      `}</style>

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