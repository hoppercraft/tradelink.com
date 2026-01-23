import { useEffect, useState } from "react";
import api from "../apicentralize";
import { AuthContext } from "./useAuth";

export const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/v1/tradelink/profile");
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (input) => {
    setError(null);
    try {
      const res = await api.post("/api/v1/tradelink/login", input);
      
      if (!res.data.sucess) {
        throw new Error(res.data.message || "Login failed");
      }

      // Fetch user profile after successful login
      const userRes = await api.get("/api/v1/tradelink/profile");
      setUser(userRes.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      setUser(null);
      setIsAuthenticated(false);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/v1/tradelink/logout");
    } catch {
      // Ignore logout errors
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = async (payload) => {
    try {
      await api.put("/api/v1/tradelink/update-profile", payload, {
        headers: { "Content-Type": "application/json" },
      });
      // Refresh user data
      const userRes = await api.get("/api/v1/tradelink/profile");
      setUser(userRes.data.user);
    } catch (err) {
      console.error("Profile update error:", err);
      throw err;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const res = await api.post("/api/v1/tradelink/change-password", {
        oldPassword,
        newPassword
      });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Password change failed");
    }
  };

  const deleteAccount = async (password) => {
    try {
      await api.delete("/api/v1/tradelink/delete-user", {
        data: { password }
      });
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      throw new Error(err.response?.data?.message || "Account deletion failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isAuthenticated, 
        loading, 
        error, 
        login, 
        logout, 
        updateUser,
        changePassword,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
