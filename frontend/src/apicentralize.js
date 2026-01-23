// apicentralize.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookie-based auth
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If unauthorized, redirect to login
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      // Don't redirect if already on login/register page
      if (currentPath !== '/login' && currentPath !== '/register') {
        localStorage.removeItem("access");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
