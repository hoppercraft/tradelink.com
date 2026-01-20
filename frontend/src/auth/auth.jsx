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
        const res = await api.get("/me");
        setUser(res.data);
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
      const res = await api.post("/token/", input); // Ensure the trailing slash is there
      const loginData = res.data;

      // CHANGE THIS: Look for .access, not .token
      if (!loginData.access) {
        throw new Error("Invalid credentials");
      }

      // CHANGE THIS: Store the access string
      localStorage.setItem(ACCESS_TOKEN, loginData.access);
      localStorage.setItem(REFRESH_TOKEN, loginData.refresh);
      const userRes = await api.get("/me");
      setUser(userRes.data);
      setIsAuthenticated(true);
    } catch (err) {
      // This catches both the 401 from the server AND your manual "Invalid credentials" error
      setError(err.response?.data?.detail || err.message || "Login failed");
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  };
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (payload) => {
    try {
      const res = await api.put("/api/profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data);
    } catch {
      return;
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
