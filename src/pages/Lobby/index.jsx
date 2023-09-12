import styled from "styled-components";
import AppLayout from "../../components/layout/AppLayout";
import { useAuthContext } from "../../context/AuthContext";

const Lobby = () => {
  const { authContext } = useAuthContext();

  return (
    <AppLayout>
      <Container>¡Bienvenido {authContext.name}!</Container>
    </AppLayout>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 50px;
`;

export default Lobby;
