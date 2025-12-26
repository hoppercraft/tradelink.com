import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigateto = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // HANDLE INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh
    setError("");
  

    // simple validation
    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      // CALL API
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid username or password");
        return;
      }

      // STORE TOKEN
      localStorage.setItem("token", data.token);

      // REDIRECT
      navigateto("/explore");
    } catch (err) {
      setError("Something went wrong",err);
    }

  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-stone-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Log-in</h2>

        {/* Error message */}
        {error && (
          <p className="mb-4 text-red-600 text-center font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="text-xl mb-1 block">E-mail : </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-xl mb-1 block">Password : </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter password"
            />
          </div>

          {/* Submit button */}
          <div className="mb-4">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-xl cursor-pointer"
              type="submit"
            >
               Login
            </button>
          </div>

          {/* Register link */}
          <div className="mb-4 text-center">
            <p className="text-stone-500">
              Don't have an account?
              <span
                onClick={() => navigateto("/register")}
                className="cursor-pointer text-blue-600 underline ml-1"
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
