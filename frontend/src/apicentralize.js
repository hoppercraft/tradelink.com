// apicentralize.js
import axios from "axios";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "", // or your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach token before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 + refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // FIX: Check if the error is a 401 AND it's NOT the login request
    const isLoginRequest = originalRequest.url.includes("/api/token/");

    if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest) {
      originalRequest._retry = true;

      try {
        // Use 'api' or 'axios'? 
        // Note: Using 'axios' (the library) here is safer to avoid infinite loops
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/token/refresh/`, 
          { refresh: localStorage.getItem(REFRESH_TOKEN) }, // You need to send the token!
          { withCredentials: true }
        );

        const newAccess = refreshRes.data.access;
        localStorage.setItem(ACCESS_TOKEN, newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login"; 
        return Promise.reject(refreshError);
      }
    }

    // If it WAS a login request (isLoginRequest === true), 
    // it will skip the logic above and come straight here.
    return Promise.reject(error);
  }
);

export default api;
