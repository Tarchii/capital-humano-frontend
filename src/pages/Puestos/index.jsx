import styled from "styled-components";
import AppLayout from "../../components/layout/AppLayout";
import { Button, Form, Input, Modal, Spin, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import FormPuestosDeTrabajo from "./FormPuestosDeTrabajo";
import ViewDetailsModal from "../../components/ViewDetailsModal";

const defaultFilterValue = {
  name: "",
  area: "",
};

const Puestos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState([]);
  const [form] = Form.useForm(); // Instancia del formulario
  const [puestoSelected, setPuestoSelected] = useState(undefined);
  const [modeEdition, setModeEdition] = useState(false);
  const [filterValues, setFilterValues] = useState(defaultFilterValue);
  const [filtrado, setFiltrado] = useState([])

  const getData = async () => {
    try {
      const info = await axios.get("/puestos");
      const areasInfo = await axios.get("/areas");
      const empleadosInfo = await axios.get("/empleados");
      const puestos = info.data.puestos.map((puesto) => {
        const area = areasInfo.data.areas.find(
          (area) => area._id === puesto.area._id
        );
        const empleadosAsociados = empleadosInfo.data.empleados
    .filter((empleado) =>
      empleado.puestos.some((puestoEmpleado) => puestoEmpleado._id === puesto._id)
    )
    .map((empleado) => ({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      legajo: empleado.legajo,
    }));
        return {
          ...puesto,
          area: {
            nombre: area.nombre,
          },
          empleados : empleadosAsociados,
        };
      });
      setData(puestos);
      setAreas(areasInfo.data.areas);
      setFiltrado(puestos);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
 
    if(filterValues.name !== ""){
  
     let results = data.filter((em) =>
        em.nombre.toLowerCase().includes(filterValues.name)
      );
      setFiltrado(results);
      return
    }else if(filterValues.name==""){
      setFiltrado(data)
      return
    }
  
  }, [filterValues.name]);

  useEffect(() => {
 
    if(filterValues.area !== ""){
  
     let results = data.filter((em) =>
        em.area.nombre.toLowerCase().includes(filterValues.area)
      );
      setFiltrado(results);
      return
    }else if(filterValues.area==""){
      setFiltrado(data)
      return
    }
  
  }, [filterValues.area]);

  const filterTableData = useCallback((data, filterValues) => {
    if (!filterValues) return data;

    return data.filter((record) => {
      const nameMatch = record.nombre.startsWith(filterValues.name);
      const areaMatch = record.area.nombre.startsWith(filterValues.area);

      return nameMatch && areaMatch;
    });
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setPuestoSelected(undefined);
    setModeEdition(false);
  };

  
  const ViewDetailsPuesto = (puesto) => {
    setPuestoSelected(puesto);
    setIsModalOpen(true);
  };

  const editPuesto = (puesto) => {
    form.setFieldsValue(puesto);
    setPuestoSelected(puesto);
    setIsModalOpen(true);
    setModeEdition(true);
  };

  const deletePuesto = async (puesto) => {
    try {
      await axios.delete("/puestos/", { data: { id: puesto._id } });
      getData();
      toast.info("Puesto dado de baja");
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
      title: "area",
      dataIndex: ["area", "nombre"],
      key: "area",
    },
    {
      title: "sueldoBase",
      dataIndex: "sueldoBase",
      key: "nombre",
    },
    {
      title: "inicio",
      dataIndex: "inicio",
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
            onClick={() => ViewDetailsPuesto(record)}
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
          <Button shape="circle" onClick={() => editPuesto(record)}>
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
          <Button onClick={() => deletePuesto(record)} danger shape="circle">
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
            <PageTitle>Puestos de trabajo</PageTitle>
            <Button onClick={() => setIsModalOpen(true)}>Agregar Puesto</Button>
          </Header>
          <SearchContainer>
            <Input
              placeholder="Buscar por Nombre"
              disabled={filterValues.area!==""?true:false}
              value={filterValues.name}
              onChange={(e) =>
                setFilterValues({ ...filterValues, name: e.target.value })
              }
              allowClear
            />
            <Input
              placeholder="Buscar por Área"
              disabled={filterValues.name!==""?true:false}
              value={filterValues.area}
              onChange={(e) =>
                setFilterValues({ ...filterValues, area: e.target.value })
              }
              allowClear
            />
          </SearchContainer>
          {
            filtrado.length == 0 ?
            <Spin/>
            :

          <Table
            dataSource={filtrado}
            columns={columns}
            rowKey={(record) => record._id}
          />
          }
          {puestoSelected == undefined && modeEdition == false ? (
            <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
              <div style={{ margin: "20px" }}>
                <FormPuestosDeTrabajo
                  closeModal={closeModal}
                  form={form}
                  getData={getData}
                  areas={areas}
                />
              </div>
            </Modal>
          ) : puestoSelected !== undefined && modeEdition ? (
            <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
              <div style={{ margin: "20px" }}>
                <FormPuestosDeTrabajo
                  closeModal={closeModal}
                  form={form}
                  getData={getData}
                  puestoSelected={puestoSelected}
                  areas={areas}
                />
              </div>
            </Modal>
          ) : (
            <Modal visible={isModalOpen} onCancel={closeModal} footer={null}>
              <div style={{ margin: "20px" }}>
                <ViewDetailsModal
                  title={"Puesto de Trabahjo"}
                  dataObject={puestoSelected}
                />
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

export default Puestos;
