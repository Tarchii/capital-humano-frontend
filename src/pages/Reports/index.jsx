import React, { useEffect, useState } from 'react';
import { Button} from 'antd';
import axios from '../../config/axios';
import jsPDF from 'jspdf';
import styled from "styled-components";
import AppLayout from "../../components/layout/AppLayout";

const Reports = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [healthInsuranceData, setHealthInsuranceData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [buData, setBUData] = useState([]);
  const [areaData, setAreaData] = useState([]);

  const getEmployeeData = async () => {
    try {
      const info = await axios.get('/empleados');
      setEmployeeData(info.data.empleados);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getHealthInsuranceData = async () => {
    try {
      const info = await axios.get('/obraSocial');
      setHealthInsuranceData(info.data.obraSociales);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHealthInsuranceData();
  }, []);

  const getRoleData = async () => {
    try {
      const info = await axios.get('/puestos');
      setRoleData(info.data.puestos);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRoleData();
  }, []);

  const getBUData = async () => {
    try {
      const info = await axios.get('/departamentos');
      setBUData(info.data.departamentos);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBUData();
  }, []);

  const getAreaData = async () => {
    try {
      const info = await axios.get('/areas');
      setAreaData(info.data.areas);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAreaData();
  }, []);


  const handleGenerateEmployeePDF = () => {
    const doc = new jsPDF();
    doc.text('Informe de Empleados', 10, 10);
    const employeesData = employeeData;
    let startY = 20;
    employeesData.forEach((employee) => {
      doc.text(`Nombre: ${employee.nombre} ${employee.apellido}`, 10, startY);
      doc.text(`DNI: ${employee.dni}`, 10, startY + 10);
      doc.text(`Legajo: ${employee.legajo}`, 10, startY + 20);
      startY += 30;
    });
    doc.save('InformeEmpleados.pdf');
  };

  const handleGenerateHealthInsurancePDF = () => {
    const doc = new jsPDF();
    doc.text('Informe de Obras Sociales', 10, 10);
    const healthInsurancesData = healthInsuranceData;
    let startY = 20;
    healthInsurancesData.forEach((healthInsurance) => {
      doc.text(`Nombre: ${healthInsurance.nombre}`, 10, startY);
      doc.text(`Domicilio: ${healthInsurance.domicilio}`, 10, startY + 10);
      doc.text(`Teléfono: ${healthInsurance.telefono}`, 10, startY + 20);
      doc.text(`CUIT: ${healthInsurance.cuit}`, 10, startY + 30);
      startY += 40;
    });
    doc.save('InformeObrasSociales.pdf');
  };

  const handleGenerateRolePDF = () => {
    const doc = new jsPDF();
    doc.text('Informe de Puestos de trabajo', 10, 10);
    const rolesData = roleData;
    let startY = 20;
    rolesData.forEach((role) => {
      doc.text(`Nombre: ${role.nombre}`, 10, startY);
      doc.text(`Descripción: ${role.descripcion}`, 10, startY + 10);
      doc.text(`Sueldo Base: ${role.sueldoBase}`, 10, startY + 20);
      doc.text(`Inicio: ${role.inicio}`, 10, startY + 30);
      const areaName = areaData.find((area) => area._id === role.area)?.nombre || 'No asignado';
      doc.text(`Área: ${areaName}`, 10, startY + 40);
      startY += 50;
    });
    doc.save('InformeRoles.pdf');
  };

  const handleGenerateBusinessUnitPDF = () => {
    const doc = new jsPDF();
    doc.text('Informe de Departamentos de trabajo', 10, 10);
    const busData = buData;
    let startY = 20;
    busData.forEach((bu) => {
      doc.text(`Nombre: ${bu.nombre}`, 10, startY);
      doc.text(`Descripción: ${bu.descripcion}`, 10, startY + 10);
      startY += 20;
    });
    doc.save('InformeDepartamentos.pdf');
  };

  const handleGenerateAreaPDF = () => {
    const doc = new jsPDF();
    doc.text('Informe de Áreas de trabajo', 10, 10);
    const areasData = areaData;
    let startY = 20;
    areasData.forEach((area) => {
      doc.text(`Nombre: ${area.nombre}`, 10, startY);
      doc.text(`Descripción: ${area.descripcion}`, 10, startY + 10);
      const departamentoName = buData.find((departamento) => departamento._id === area.departamento)?.nombre || 'No asignado';
      doc.text(`Departamento: ${departamentoName}`, 10, startY + 20);
      startY += 30;
    });
    doc.save('InformeAreas.pdf');
  };

  return (
    <>
    <AppLayout>
      <Container>
        <PageTitle>Reportes</PageTitle>
        <ButtonContainer>
          <ButtonStyled onClick={handleGenerateEmployeePDF}>Generar Informe de Empleados en PDF</ButtonStyled>
        </ButtonContainer>
        <ButtonContainer>
          <ButtonStyled onClick={handleGenerateHealthInsurancePDF}>Generar Informe de Obras Sociales en PDF</ButtonStyled>
        </ButtonContainer>
        <ButtonContainer>
          <ButtonStyled onClick={handleGenerateRolePDF}>Generar Informe de Puestos de Trabajo en PDF</ButtonStyled>
        </ButtonContainer>
        <ButtonContainer>
          <ButtonStyled onClick={handleGenerateBusinessUnitPDF}>Generar Informe de Departamentos de Trabajo en PDF</ButtonStyled>
        </ButtonContainer>
        <ButtonContainer>
          <ButtonStyled onClick={handleGenerateAreaPDF}>Generar Informe de Áreas de Trabajo en PDF</ButtonStyled>
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
