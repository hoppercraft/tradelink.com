import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import { api } from "../apicentralize";
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
        const data = await api("/me"); // GET current user
        setUser(data);
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
      const loginData = await api("/login", {
        method: "POST",
        body: JSON.stringify(input),
      });

      if (!loginData.token) {
        setError("Invalid credentials");
        setUser(null);
        setIsAuthenticated(false);
        throw new Error("Invalid credentials");
      }

      localStorage.setItem(ACCESS_TOKEN, loginData.token);

      const userData = await api("/me");
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message || "Login failed");
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
  const res = await fetch("/api/profile", {
    method: "PUT",
    credentials: "include",
    body: payload  
  });

  if (!res.ok) return;
  const updatedUser = await res.json();
  setUser(updatedUser);
};

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, error, login, logout,updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
