import styled from "styled-components";
import AppLayout from "../../components/layout/AppLayout";
import { Button, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import FormArea from "./FormArea";
import ViewDetailsArea from "./ViewDetailsArea";

const defaultFilterValue = {
  name: "",
};

const Areas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm(); // Instancia del formulario
  const [employeeSelected, setEmployeeSelected] = useState(undefined);
  const [modeEdition, setModeEdition] = useState(false);
  const [filterValues, setFilterValues] = useState(defaultFilterValue);

  const getData = async () => {
    try {
      const info = await axios.get("/areas");
      setData(info.data.areas);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterTableData = (data, filterValues) => {
    if (!filterValues) return data;

    return data.filter((record) => {
      const nameMatch = record.nombre.startsWith(filterValues.name);

      return nameMatch;
    });
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
      await axios.delete("/areas/", { data: { id: employee._id } });
      getData();
      toast.info("Área dada de baja");
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
      title: "descripcion",
      dataIndex: "descripcion",
      key: "apellido",
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
            <PageTitle>Áreas de trabajo</PageTitle>
            <Button onClick={() => setIsModalOpen(true)}>Agregar área</Button>
          </Header>
          <SearchContainer>
            <Input
              placeholder="Buscar por Nombre de Área"
              value={filterValues.name}
              onChange={(e) =>
                setFilterValues({ ...filterValues, name: e.target.value })
              }
              allowClear
            />
          </SearchContainer>
          <Table
            dataSource={filterTableData(data, filterValues)}
            columns={columns}
          />
          {employeeSelected == undefined && modeEdition == false ? (
            <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
              <div style={{ margin: "20px" }}>
                <FormArea
                  closeModal={closeModal}
                  form={form}
                  getData={getData}
                />
              </div>
            </Modal>
          ) : employeeSelected !== undefined && modeEdition ? (
            <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
              <div style={{ margin: "20px" }}>
                <FormArea
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
                <ViewDetailsArea employeeSelected={employeeSelected} />
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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  & > * {
    margin-right: 16px;
  }
`;

export default Areas;
