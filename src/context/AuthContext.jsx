import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const defaultAuthContext = {
  id: 0,
  name: "",
  user: "",
  password: "",
  role: "",
  avatar: "",
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext debe ser utilizado dentro de un proveedor de AuthContext"
    );
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState(defaultAuthContext);

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
      {children}
    </AuthContext.Provider>
  );
};
