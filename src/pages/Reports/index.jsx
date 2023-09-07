import React, { useEffect, useState } from 'react';
import { Button} from 'antd';
import axios from '../../config/axios';
import jsPDF from 'jspdf';
import styled from "styled-components";
import AppLayout from "../../components/layout/AppLayout";

const Reports = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const info = await axios.get('/empleados');
      setData(info.data.empleados);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text('Informe de Empleados', 10, 10);
    const employeesData = data;
    let startY = 20;
    employeesData.forEach((employee) => {
      doc.text(`Nombre: ${employee.nombre} ${employee.apellido}`, 10, startY);
      doc.text(`DNI: ${employee.dni}`, 10, startY + 10);
      doc.text(`Legajo: ${employee.legajo}`, 10, startY + 20);
      startY += 30;
    });
    doc.save('InformeEmpleados.pdf');
  };

  // Resto del código ...

  return (
    <>
    <AppLayout>
      <Container>
        <PageTitle>Reportes</PageTitle>
        <ButtonContainer>
          <ButtonStyled onClick={handleGeneratePDF}>Generar Informe de Empleados en PDF</ButtonStyled>
        </ButtonContainer>
      </Container>
    </AppLayout>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: bolder;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const ButtonStyled = styled(Button)`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #40a9ff;
  }
`;


export default Reports;
