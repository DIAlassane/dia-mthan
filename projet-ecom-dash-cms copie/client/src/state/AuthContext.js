import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AuthContext = createContext;

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [authUser, setAuthUser] = useState(JSON.parse(user || null));

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
