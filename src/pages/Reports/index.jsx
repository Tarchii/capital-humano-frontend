import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "../../config/axios";
import jsPDF from "jspdf";
import styled from "styled-components";
import AppLayout from "../../components/layout/AppLayout";
import 'jspdf-autotable';

const Reports = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [healthInsuranceData, setHealthInsuranceData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [buData, setBUData] = useState([]);
  const [areaData, setAreaData] = useState([]);

  const getEmployeeData = async () => {
    try {
      const info = await axios.get("/empleados");
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
      const info = await axios.get("/obraSocial");
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
      const info = await axios.get("/puestos");
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
      const info = await axios.get("/departamentos");
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
      const info = await axios.get("/areas");
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
    doc.setFontSize(18);
    doc.text("Informe de Empleados", 20, 20);
    
    const employeesData = employeeData;
    
    const headers = ['Empleado', 'DNI', 'Legajo', 'Puesto', 'Área', 'Departamento'];
    const rows = [];
    
    const puestoCounts = {};
    const areaCounts = {};
    const departamentoCounts = {};
    
    employeesData.forEach((employee) => {
      const puesto = employee.puestos[0]?.nombre || "No asignado";
      const area = employee.puestos[0]?.area?.nombre || "No asignado";
      const departamento = employee.puestos[0]?.area?.departamento?.nombre || "No asignado";
    
      puestoCounts[puesto] = (puestoCounts[puesto] || 0) + 1;
      areaCounts[area] = (areaCounts[area] || 0) + 1;
      departamentoCounts[departamento] = (departamentoCounts[departamento] || 0) + 1;
    
      const rowData = [
        `${employee.nombre} ${employee.apellido}`,
        employee.dni,
        employee.legajo,
        employee.puestos[0]?.nombre || "No asignado",
        employee.puestos[0]?.area?.nombre || "No asignado",
        employee.puestos[0]?.area?.departamento?.nombre || "No asignado"
      ];
      rows.push(rowData);
    });
    
    const table = doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30,
      theme: 'grid',
      styles: {
        fontSize: 11,
        cellPadding: 4,
        textColor: [0, 0, 0],
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 32 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        5: { cellWidth: 45 }
      }
    });
    
    const tableHeight = table.autoTableEndPosY(); // Get the table height
    
    const countsText = `
    Cantidad total de empleados:\x1B ${employeesData.length}
    Cantidad de empleados por puesto:\x1B\n${formatCounts(puestoCounts)}
    Cantidad de empleados por área:\x1B\n${formatCounts(areaCounts)}
    Cantidad de empleados por departamento:\x1B\n${formatCounts(departamentoCounts)}
  `;
  
    let startYCounts = tableHeight + 10;
    
    // Check if counts text will fit on this page
    const { h } = doc.getTextDimensions(countsText);
    const pageHeight = doc.internal.pageSize.height;
    
    if (startYCounts + h > pageHeight) {
      doc.addPage();
      startYCounts = 10; // Start from the top on a new page
    }
    
    doc.setFontSize(12);
    doc.text(countsText, 10, startYCounts);
    
    doc.save("InformeEmpleados.pdf");
  };
  
  const formatCounts = (counts) => {
    let result = '';
    for (const key in counts) {
      if (counts.hasOwnProperty(key)) {
        result += `    • ${key}: ${counts[key]}\n`;
      }
    }
    return result;
  };
  

  const handleGenerateHealthInsurancePDF = () => {
    const doc = new jsPDF();
  doc.text("Informe de Obras Sociales", 20, 20);

  const headers = ['Nombre', 'Domicilio', 'Teléfono', 'CUIT'];
  const rows = [];

  healthInsuranceData.forEach((healthInsurance) => {
    const rowData = [
      healthInsurance.nombre || "No asignado",
      healthInsurance.domicilio || "No asignado",
      healthInsurance.telefono || "No asignado",
      healthInsurance.cuit || "No asignado"
    ];
    rows.push(rowData);
  });

  const table = doc.autoTable({
    head: [headers],
    body: rows,
    startY: 30,
    theme: 'grid',
    styles: {
      fontSize: 11,
      cellPadding: 4,
      textColor: [0, 0, 0],
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
      3: { cellWidth: 30 }
    }
  });
    doc.save("InformeObrasSociales.pdf");
  };

  const handleGenerateRolePDF = () => {
    const doc = new jsPDF();
  doc.text("Informe de Puestos de Trabajo", 20, 20);

  const headers = ['Nombre', 'Descripción', 'Sueldo Base', 'Inicio', 'Área'];
  const rows = [];

  roleData.forEach((role) => {
    const areaName =
      areaData.find((area) => area._id === role.area)?.nombre || "No asignado";
    const rowData = [
      role.nombre || "No asignado",
      role.descripcion || "No asignado",
      role.sueldoBase || "No asignado",
      role.inicio || "No asignado",
      areaName
    ];
    rows.push(rowData);
  });

  const table = doc.autoTable({
    head: [headers],
    body: rows,
    startY: 30,
    theme: 'grid',
    styles: {
      fontSize: 11,
      cellPadding: 4,
      textColor: [0, 0, 0],
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 40 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30 },
      4: { cellWidth: 40 }
    }
  });

  doc.save("InformePuestosTrabajo.pdf");
  };

  const handleGenerateBusinessUnitPDF = () => {
    const doc = new jsPDF();
  doc.text("Informe de Departamentos de Trabajo", 20, 20);

  const headers = ['Nombre', 'Descripción'];
  const rows = [];

  buData.forEach((department) => {
    const rowData = [
      department.nombre || "No asignado",
      department.descripcion || "No asignado"
    ];
    rows.push(rowData);
  });

  const table = doc.autoTable({
    head: [headers],
    body: rows,
    startY: 30,
    theme: 'grid',
    styles: {
      fontSize: 11,
      cellPadding: 4,
      textColor: [0, 0, 0],
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 70 }
    }
  });

  doc.save("InformeDepartamentos.pdf");
  };

  const handleGenerateAreaPDF = () => {
    const doc = new jsPDF();
  doc.text("Informe de Áreas de Trabajo", 20, 20);

  const headers = ['Nombre', 'Descripción', 'Departamento', 'Jefe de Área'];
  const rows = [];

  areaData.forEach((area) => {
    const departmentName =
      buData.find((department) => department._id === area.departamento)?.nombre || 'No asignado';
      
      const manager = employeeData.find((employee) => {
        const employeeRoles = employee.puestos;
        return employeeRoles.some(role => role.area._id === area._id && role.nombre.toLowerCase().includes('jefe') && role.nombre.toLowerCase().includes('área'));
      });
  
      const managerName = manager ? `${manager.nombre} ${manager.apellido}` : 'No asignado';
  
      const rowData = [
        area.nombre || 'No asignado',
        area.descripcion || 'No asignado',
        departmentName,
        managerName
      ];
      rows.push(rowData);
  });

  const table = doc.autoTable({
    head: [headers],
    body: rows,
    startY: 30,
    theme: 'grid',
    styles: {
      fontSize: 11,
      cellPadding: 4,
      textColor: [0, 0, 0],
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 70 },
      2: { cellWidth: 35 },
      3: { cellWidth: 50 } // Adjust the width for the manager column
    }
  });

  doc.save('InformeAreas.pdf');
  };

  return (
    <>
      <AppLayout>
        <Container>
          <PageTitle>Reportes</PageTitle>
          <ButtonsWrapper>
            <ButtonStyled onClick={handleGenerateEmployeePDF}>
              Generar Informe de Empleados en PDF
            </ButtonStyled>
            <ButtonStyled onClick={handleGenerateHealthInsurancePDF}>
              Generar Informe de Obras Sociales en PDF
            </ButtonStyled>
            <ButtonStyled onClick={handleGenerateRolePDF}>
              Generar Informe de Puestos de Trabajo en PDF
            </ButtonStyled>
            <ButtonStyled onClick={handleGenerateBusinessUnitPDF}>
              Generar Informe de Departamentos de Trabajo en PDF
            </ButtonStyled>
            <ButtonStyled onClick={handleGenerateAreaPDF}>
              Generar Informe de Áreas de Trabajo en PDF
            </ButtonStyled>
          </ButtonsWrapper>
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

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
`;

const ButtonStyled = styled(Button)`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

  &:hover {
    background-color: #00111f;
  }
`;

export default Reports;
