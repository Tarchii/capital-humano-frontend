import styled from 'styled-components';
import AppLayout from '../../components/layout/AppLayout';

const Lobby = () => {

  return (
    <AppLayout>
      <Container>¡Bienvenido {"user"}!</Container>
    </AppLayout>
  )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
font-size: 50px;
`;

export default Lobby;