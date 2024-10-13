import AuthContext from "../context/auth";
import useAuth from "../hooks/use-auth";

const AuthProvider = (props) => {
  const { authState, logout, setIsAuth, setUser, login } = useAuth();

  return (
    <AuthContext.Provider
      value={{ ...authState, logout, setIsAuth, setUser, login }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
