import React from "react";
import styled from "styled-components";
import AppLayout from "../../components/layout/AppLayout";
import CardMember from "./CardMember";
import franco_tarchini from "../../assets/franco_tarchini.jpg";
import guillermo_alonso from "../../assets/guillermo_alonso.jpeg";
import faride_chair from "../../assets/faride_chair.jpeg";
import ivan_yuste from "../../assets/ivan_yuste.jpeg";
import josefina_japaze from "../../assets/josefina_japaze.jpg";
import juan_bustos_thames from "../../assets/juan_bustos_thames.jpeg";
import luciana_olmos from "../../assets/luciana_olmos.jpeg";

const Members = () => {
  return (
    <AppLayout>
      <Container>
        <PageTitle>Integrantes</PageTitle>
        <CardsWrapper>
          <CardMember
            name="Alonso Torino, Guillermo"
            legajo="45.205"
            email="guillermo.alonsotorino@alu.frt.utn.edu.ar"
            img={guillermo_alonso}
          />
          <CardMember
            name="Arévalo, Luciana Olmos"
            legajo="44.686"
            email="lucianaarevalo@alu.frt.utn.edu.ar"
            img={luciana_olmos}
          />
          <CardMember
            name="Bustos Thames, Juan Pablo"
            legajo="46.323"
            email="juan.bustosthames@alu.frt.utn.edu.ar"
            img={juan_bustos_thames}
          />
          <CardMember
            name="Chair Hasay, Faride"
            legajo="44.480"
            email="Faride.ChairHasay@alu.frt.utn.edu.ar"
            img={faride_chair}
          />
          <CardMember
            name="Japaze, María Josefina"
            legajo="44.640"
            email="Maria.japaze@alu.utn.frt.edu.ar"
            img={josefina_japaze}
          />
          <CardMember
            name="Tarchini, Franco"
            legajo="45.189"
            email="franco.tarchini@alu.frt.utn.edu.ar"
            img={franco_tarchini}
          />
          <CardMember
            name="Yuste, Leandro Ivan"
            legajo="44.686"
            email="leandroyuste@alu.frt.utn.edu.ar"
            img={ivan_yuste}
          />
        </CardsWrapper>
      </Container>
    </AppLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: bolder;
  padding: 10px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-around;
`;

export default Members;
