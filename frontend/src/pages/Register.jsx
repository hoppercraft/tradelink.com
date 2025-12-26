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
 

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    // Simple validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Registration successful redirect to login
      navigate("/login");
    } catch (err) {
      setError("Something went wrong",err);
    }

  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-stone-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {/* Error message */}
        {error && (
          <p className="mb-4 text-red-600 text-center font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="text-xl mb-1 block">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-xl mb-1 block">E-mail:</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-xl mb-1 block">Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit button */}
          <div className="mb-4">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-xl cursor-pointer"
              type="submit"
             
            >
              Register
            </button>
          </div>

          {/* Login link */}
          <div className="mb-4 text-center">
            <p className="text-stone-500">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer text-blue-600 underline"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
