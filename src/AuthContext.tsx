// authContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import { useLocation } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const token = localStorage.getItem("access_token");

  const tokenVerify = async () => {
    if (!token) {
      logout();
      localStorage.removeItem("access_token");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API}auth/verifyToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })  // token must be a string
      });

      const res = await response.json();
      // console.log("tokenVerify =>", res?.data?.tokenVerify);

      if (res?.data?.tokenVerify === true) {
        login();
      } else {
        logout();
        localStorage.removeItem("access_token");
      }
    } catch (error) {
      console.error("Token verification error:", error);
      logout();
      localStorage.removeItem("access_token");
    }
  };

  useEffect(() => {
    tokenVerify();
  }, [location.pathname, token]);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
