import styled from "styled-components";
import { Button, Input } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { theme } from "../../utils/constants";
import { useEffect } from "react";

const LoginForm = ({ user, setUser, password, setPassword, handleLogin }) => {
  let disabled = user === "" || password === "";

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLogin]);

  return (
    <LoginCard>
      <LogoContainer>
        <img
          src={"https://cdn.onlinewebfonts.com/svg/img_215664.png"}
          alt="Logo"
        />
      </LogoContainer>
      <Title>Gestión de Capital Humano</Title>
      <FormContainer>
        <Input
          placeholder="Ingrese un usuario"
          onChange={(e) => setUser(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input.Password
          placeholder="Ingrese una contraseña"
          type="password"
          visibilityToggle
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 30 }}
        />
        <Button
          style={{ marginBottom: 10 }}
          onClick={() => handleLogin()}
          disabled={disabled}
        >
          <TeamOutlined />
          Iniciar sesión
        </Button>
      </FormContainer>
    </LoginCard>
  );
};

const LoginCard = styled.div`
  background-color: #fff;
  border-radius: ${theme.radius};
  box-shadow: 0 8px 24px rgba(22, 28, 45, 0.5);
  width: 35em;
  padding: 2em;

  @media (max-width: 560px) {
    width: 23em;
  }

  @media (max-height: 680px) {
    margin-top: -5em;
  }

  @media (max-height: 590px) {
    margin-top: -5em;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  img {
    :hover {
      width: 11em;
      transition: 0.5s ease;
    }

    :not(:hover) {
      width: 10em;
      transition: 0.5s ease;
    }
  }

  @media (max-height: 590px) {
    display: none;
  }
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export default LoginForm;
