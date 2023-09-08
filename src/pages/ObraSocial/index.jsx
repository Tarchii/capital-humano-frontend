import { Button, Form, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import AppLayout from "../../components/layout/AppLayout";
import FormObraSocial from "./FormObraSocial";
import ViewDetailsObraSocial from "./ViewDetailsObraSocial";

const ObraSocial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm(); // Instancia del formulario
  const [employeeSelected, setEmployeeSelected] = useState(undefined);
  const [modeEdition, setModeEdition] = useState(false);

  const getData = async () => {
    try {
      const info = await axios.get("/obraSocial");
      setData(info.data.obraSociales);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
    form.setFieldsValue(employee);
    setEmployeeSelected(employee);
    setIsModalOpen(true);
    setModeEdition(true);
  };

  const deleteEmployee = async (employee) => {
    try {
      await axios.delete("/obraSocial/", { data: { id: employee._id } });
      getData();
      toast.info("Obra Social dada de baja");
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const columns = [
    {
      title: "nombre",
      dataIndex: "nombre",
      key: "legajo",
    },
    {
      title: "domicilio",
      dataIndex: "domicilio",
      key: "apellido",
    },
    {
      title: "telefono",
      dataIndex: "telefono",
      key: "nombre",
    },
    {
      title: "cuit",
      dataIndex: "cuit",
      key: "dni",
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
  ];

  return (
    <AppLayout>
      <Container>
        <PageTitle>
          <Header>
            <PageTitle>Obras Sociales</PageTitle>
            <Button onClick={() => setIsModalOpen(true)}>
              Agregar Obra Social
            </Button>
          </Header>
          <Table dataSource={data.length > 0 && data} columns={columns} />
          {employeeSelected == undefined && modeEdition == false ? (
            <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
              <div style={{ margin: "20px" }}>
                <FormObraSocial
                  closeModal={closeModal}
                  form={form}
                  getData={getData}
                />
              </div>
            </Modal>
          ) : employeeSelected !== undefined && modeEdition ? (
            <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
              <div style={{ margin: "20px" }}>
                <FormObraSocial
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
                <ViewDetailsObraSocial employeeSelected={employeeSelected} />
              </div>
            </Modal>
          )}
        </PageTitle>
      </Container>
    </AppLayout>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-size: 20px;
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

export default ObraSocial;
