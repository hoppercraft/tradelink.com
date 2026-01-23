import { useEffect, useState } from "react";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";
import api from "../apicentralize";
import { AuthContext } from "./useAuth";

export const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check existing session
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/v1/tradelink/profile");
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem(ACCESS_TOKEN);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    init();
    }, []);

    const login = async (input) => {
    setError(null);
    try {
      const res = await api.post("/api/v1/tradelink/login", input);
      const loginData = res.data;

      if (!loginData.sucess) {
        throw new Error("Invalid credentials");
      }

      // Tokens are set in cookies by backend, but store a flag
      localStorage.setItem(ACCESS_TOKEN, "logged_in");
      
      // Get user profile
      const userRes = await api.get("/api/v1/tradelink/profile");
      setUser(userRes.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  };
  const logout = async () => {
    try {
      await api.post("/api/v1/tradelink/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem(ACCESS_TOKEN);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (payload) => {
    try {
      const res = await api.put("/api/v1/tradelink/update-profile", payload);
      if (res.data.message) {
        // Fetch updated profile
        const userRes = await api.get("/api/v1/tradelink/profile");
        setUser(userRes.data.user);
      }
    } catch (err) {
      console.error("Update profile error:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, error, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
