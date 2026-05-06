import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { setAuthToken } from "../services/api";
import React from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  token: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface DecodedToken {
  role: string;
}

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
  setAuthToken(token);

  const decoded =
    jwtDecode<DecodedToken>(token);

  setUser({
    token,
    role: decoded.role,
  });
}
  }, []);

  const login = (token: string) => {
  localStorage.setItem("token", token);

  setAuthToken(token);

  const decoded =
    jwtDecode<DecodedToken>(token);

  setUser({
    token,
    role: decoded.role,
  });
};

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);