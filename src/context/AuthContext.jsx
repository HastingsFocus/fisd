
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  registerUser as registerRequest,
  loginUser as loginRequest,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore authenticated session.
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("fisdev_cms_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();

        setUser(response.user);
        localStorage.setItem(
          "fisdev_cms_user",
          JSON.stringify(response.user)
        );
      } catch (error) {
        localStorage.removeItem("fisdev_cms_token");
        localStorage.removeItem("fisdev_cms_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Register.
  const register = async (userData) => {
    return await registerRequest(userData);
  };

  // Login.
  const login = async (credentials) => {
    const response = await loginRequest(credentials);

    localStorage.setItem("fisdev_cms_token", response.token);
    localStorage.setItem(
      "fisdev_cms_user",
      JSON.stringify(response.user)
    );

    setUser(response.user);

    return response;
  };

  // Logout.
  const logout = () => {
    localStorage.removeItem("fisdev_cms_token");
    localStorage.removeItem("fisdev_cms_user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
