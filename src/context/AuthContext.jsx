/**
 * context/AuthContext.jsx
 *
 * Authentication context for managing user authentication state.
 * Provides isAuthenticated and user data to the application.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);

  /* Check for persisted auth state on mount */
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // TODO: Validate token with API
      setIsAuthenticated(true);
      setUser({ id: "user-123", name: "Mohamed G." });
    }
  }, []);

  /* Handle login */
  const login = useCallback(async (credentials) => {
    try {
      // TODO: Implement API call
      setIsAuthenticated(true);
      setUser({ id: "user-123", name: "Mohamed G." });
      localStorage.setItem("authToken", "dummy-token");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }, []);

  /* Handle logout */
  const logout = useCallback(async () => {
    try {
      // TODO: Implement API call
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("authToken");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }, []);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
