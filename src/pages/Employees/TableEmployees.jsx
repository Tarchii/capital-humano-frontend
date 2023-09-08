import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Form, Modal, Table, Input } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import axios from "../../config/axios";
import FormEmployess from "./FormEmployees";
import ViewDetails from "./ViewDetails";
import { toast } from "react-toastify";

const defaultFilterValue = {
  dni: "",
  legajo: "",
  apellido: "",
};

const TableEmployees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm(); // Instancia del formulario
  const [employeeSelected, setEmployeeSelected] = useState(undefined);
  const [modeEdition, setModeEdition] = useState(false);
  const [filterValues, setFilterValue] = useState(defaultFilterValue);

  const getData = async () => {
    try {
      const info = await axios.get("/empleados");
      setData(info.data.empleados);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const filterTableData = (data, filterValues) => {
    if (!filterValues) return data;

    return data.filter((record) => {
      const legajoMatch = record.legajo
        .toString()
        .startsWith(filterValues.legajo);
      const dniMatch = record.dni.toString().startsWith(filterValues.dni);
      const apellidoMatch = record.apellido.startsWith(filterValues.apellido);

      // Devolver true solo si todas las condiciones se cumplen
      return legajoMatch && dniMatch && apellidoMatch;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEmployeeSelected(undefined);
    setModeEdition(false);
  };

  const ViewDetailsEmployee = (employee) => {
    setEmployeeSelected(employee);
    setIsModalOpen(true);
  };

  const editEmployee = (employee) => {
    setEmployeeSelected(employee);
    form.setFieldsValue(employee);
    setIsModalOpen(true);
    setModeEdition(true);
  };

  const deleteEmployee = async (employee) => {
    try {
      await axios.delete("/empleados/", { data: { id: employee._id } });
      getData();
      toast.info("Empleado dado de baja");
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const columns = [
    {
      title: "Legajo",
      dataIndex: "legajo",
      key: "legajo",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Domicilio",
      dataIndex: "domicilio",
      key: "domicilio",
    },
    {
      title: "Ver Detalles",
      dataIndex: "verDetails",
      key: "verDetalles",
      render: (text, record) => (
        <CenteredButton>
          <Button
            type="primary"
            shape="circle"
            onClick={() => ViewDetailsEmployee(record)}
          >
            <EyeOutlined />
          </Button>
        </CenteredButton>
      ),
    },
    {
      title: "Editar",
      dataIndex: "editar",
      key: "editar",
      render: (text, record) => (
        <CenteredButton>
          <Button shape="circle" onClick={() => editEmployee(record)}>
            <EditOutlined />
          </Button>
        </CenteredButton>
      ),
    },
    {
      title: "Eliminar",
      dataIndex: "eliminar",
      key: "eliminar",
      render: (text, record) => (
        <CenteredButton>
          <Button onClick={() => deleteEmployee(record)} danger shape="circle">
            <DeleteOutlined />
          </Button>
        </CenteredButton>
      ),
    },
    {
      title: "Agregar Foto",
      dataIndex: "agregarFoto",
      key: "agregarFoto",
      render: () => (
        <CenteredButton>
          <Button shape="circle">
            <UploadOutlined />
          </Button>
        </CenteredButton>
      ),
    },
  ];

  return (
    <>
      <Header>
        <PageTitle>Empleados</PageTitle>
        <Button onClick={() => setIsModalOpen(true)}>Agregar Empleado</Button>
      </Header>
      <SearchContainer>
        <Input
          placeholder="Buscar por Legajo"
          value={filterValues.legajo}
          onChange={(e) =>
            setFilterValue({ ...filterValues, legajo: e.target.value })
          }
          allowClear
          type="number"
        />
        <Input
          placeholder="Buscar por Apellido"
          value={filterValues.apellido}
          onChange={(e) =>
            setFilterValue({ ...filterValues, apellido: e.target.value })
          }
          allowClear
        />
        <Input
          placeholder="Buscar por DNI"
          value={filterValues.dni}
          onChange={(e) =>
            setFilterValue({ ...filterValues, dni: e.target.value })
          }
          allowClear
          type="number"
        />
      </SearchContainer>
      <Table
        dataSource={filterTableData(data, filterValues)}
        columns={columns}
        rowKey={(record) => record._id}
      />
      {employeeSelected == undefined && modeEdition == false ? (
        <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
          <div style={{ margin: "20px" }}>
            <FormEmployess
              closeModal={closeModal}
              form={form}
              getData={getData}
              employeeSelected={true}
            />
          </div>
        </Modal>
      ) : employeeSelected !== undefined && modeEdition ? (
        <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
          <div style={{ margin: "20px" }}>
            <FormEmployess
              closeModal={closeModal}
              form={form}
              getData={getData}
              employeeSelected={employeeSelected}
            />
          </div>
        </Modal>
      ) : (
        <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
          <div style={{ margin: "20px" }}>
            <ViewDetails employeeSelected={employeeSelected} />
          </div>
        </Modal>
      )}
    </>
  );
};

const PageTitle = styled.h1`
  font-size: 25px;
  font-weight: bolder;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const CenteredButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  & > * {
    margin-right: 16px;
  }
`;

export default TableEmployees;
