import { adminUser, commonUser } from "./mocks/users";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Lobby from "./pages/Lobby";
import { notification } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "./utils/constants";
import ObraSocial from "./pages/ObraSocial";
import Reports from "./pages/Reports";
import Members from "./pages/Members";
import Areas from "./pages/Areas";
import Employees from "./pages/Employees";
import Sindicatos from "./pages/Sindicatos";

// const PrivateRoute = ({ children, ...rest }) => (
//   <Route
//     {...rest}
//     render={() => (getUserRole() ? children : <Navigate to="/" replace />)}
//   />
// );

const PrivateRoute = ({ children }) => {
  if (getUserRole()) {
    return children;
  }

  return <Navigate to="/" />;
};

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleLogin = () => {
    if (user === adminUser.user && password === adminUser.password) {
      localStorage.setItem("user", JSON.stringify(adminUser));
      setIsAuth(true);
      notification.success({
        message: "Bienvenido",
        description: "Has iniciado sesión como administrador",
      });
      navigate("/lobby");
    } else if (user === commonUser.user && password === commonUser.password) {
      localStorage.setItem("user", JSON.stringify(commonUser));
      setIsAuth(true);
      notification.success({
        message: "Bienvenido",
        description: "Has iniciado sesión como usuario",
      });
      navigate("/lobby");
    } else {
      localStorage.removeItem("user");
      setIsAuth(false);
      notification.error({
        message: "Error",
        description: "Usuario o contraseña incorrectos",
      });
    }
  };

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Login
            user={user}
            setUser={setUser}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        }
      />
      <Route
        path={"/lobby"}
        element={
          <PrivateRoute>
            <Lobby />
          </PrivateRoute>
        }
      />
      <Route
        path={"/members"}
        element={
          <PrivateRoute>
            <Members />
          </PrivateRoute>
        }
      />
      <Route
        path={"/areas"}
        element={
          <PrivateRoute>
            <Areas />
          </PrivateRoute>
        }
      />
      <Route
        path={"/employees"}
        element={
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        }
      />
      <Route
        path={"/obra-social"}
        element={
          <PrivateRoute>
            <ObraSocial />
          </PrivateRoute>
        }
      />
      <Route
        path={"/reports"}
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path={"/sindicatos"}
        element={
          <PrivateRoute>
            <Sindicatos />
          </PrivateRoute>
        }
      />
      <Route
        path={"/*"}
        element={
          <PrivateRoute>
            <Lobby />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
