import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);
const backend = import.meta.env.VITE_PUBLIC_API;
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    console.log();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_API}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem("authToken");
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
