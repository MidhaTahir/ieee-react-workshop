import { createContext, useContext } from "react";

const defaultState = {
  isAuth: false,
  user: null,
  setIsAuth: () => {},
  setUser: () => {},
  logout: () => {},
  login: () => {},
};

const AuthContext = createContext(defaultState);
export const useAuthContext = () => useContext(AuthContext); // the custom hook

export default AuthContext;
