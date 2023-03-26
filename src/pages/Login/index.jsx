import styled from "styled-components";
import LoginForm from "./LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ user, setUser, password, setPassword, handleLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/lobby");
    }
  }, []);

  return (
    <LoginWrapper>
      <LoginForm
        user={user}
        setUser={setUser}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
      <FooterData>
        <FooterText>Gestión de Capital Humano - 2022</FooterText>
      </FooterData>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #f2f2f2;
`;

const FooterData = styled.div`
  position: absolute;
  bottom: 0;
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: rgba(27, 42, 78, 0.2);
  border-radius: 20px 15px 0 0;
`;

const FooterText = styled.div`
  opacity: 1;
  color: "black";
  cursor: default;
`;

export default Login;
