import { useState } from "react";

// import axios from "axios";

// import { ENDPOINTS } from "../constants/endpoints";


function useAuth() {
  // Attempt to retrieve user data from localStorage
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [authState, setAuthState] = useState({
    isAuth: Boolean(storedUser), // Check if user data is in localStorage
    user: initialUser,
  });

  const setIsAuth = (isAuth) => {
    setAuthState((old) => ({ ...old, isAuth }));
    if (!isAuth) {
      // Remove user data from localStorage if logging out
      localStorage.removeItem("user");
    }
  };

  const setUser = (user) => {
    setAuthState((old) => ({ ...old, user }));
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = async () => {
    setAuthState({ isAuth: false, user: null });
    localStorage.clear();
  };

  const login = (user) => {
    if (user) {
      setAuthState({ isAuth: true, user });
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return { authState, setIsAuth, setUser, logout, login };
}

export default useAuth;
