import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import useGet from "../../hooks/useGet";
import { Spin } from 'antd';

const FormEmployess = ({ closeModal, form, getData, employeeSelected}) => {

  const [obrasSocialesSeleccionadas, setObrasSocialesSeleccionadas] = useState([]);
  const [puestosSeleccionados, setPuestosSeleccionados] = useState([]);
  const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
  const [departamentosSeleccionados, setDepartamentosSeleccionados] = useState([]);

  const [obrasSociales, loading, getObrasSociales] = useGet(
    '/obraSocial',
    axios
  );

  const [puestos, loadingPuestos, getPuestos] = useGet(
    '/puestos',
    axios
  );

  const [areas, loadingAreas, getAreas] = useGet(
    '/areas',
    axios
  );

  const [departamentos, loadingDepartamentos, getDepartamentos] = useGet(
    '/departamentos',
    axios
  );

  const onFinish = async (values) => {
 if(employeeSelected === true){
  values = {...values, obrasSociales: obrasSocialesSeleccionadas, puestos: puestosSeleccionados, areas: areasSeleccionadas, departamentos: departamentosSeleccionados}

     try {
       const respuesta = await axios.post("/empleados", values);
       closeModal();
       getData();
       form.resetFields(); // Limpiar campos
       toast.success("Empleado registrado con éxito!");
     } catch (error) {
       toast.error(error.response?.data.message || error.message);
     }
 }else{
  values = {...values, obrasSociales: obrasSocialesSeleccionadas, puestos: puestosSeleccionados, areas: areasSeleccionadas, departamentos: departamentosSeleccionados}
    try {
        const respuesta = await axios.put(`/empleados/${employeeSelected._id}`, values);
        closeModal()
        getData();
        form.resetFields(); // Limpiar campos
        toast.success("Empleado modificado con éxito!");
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
 }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  
  useEffect(() => {
    if (employeeSelected !== true) {
      setObrasSocialesSeleccionadas(employeeSelected?.obrasSociales.map(obj=>obj._id));
      setPuestosSeleccionados(employeeSelected?.puestos.map(obj=>obj._id))
      setAreasSeleccionadas(employeeSelected?.areas)
      setDepartamentosSeleccionados(employeeSelected?.departamentos)
    }else {
      setObrasSocialesSeleccionadas([])
      setPuestosSeleccionados([])
      setAreasSeleccionadas([])
      setDepartamentosSeleccionados([])
    }
  }, [employeeSelected]);

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input name="nombre" />
      </Form.Item>

      <Form.Item
        label="Apellido"
        name="apellido"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Edad"
        name="edad"
        rules={[
          {
            required: true,
            message: "Please input your age!",
          },
        ]}
      >
        <Input type="number"/>
      </Form.Item>

      <Form.Item
        label="Dni"
        name="dni"
        rules={[
          {
            required: true,
            message: "Please input your DNI!",
          },
        ]}
      >
        <Input type="number"/>
      </Form.Item>

      <Form.Item
        label="Legajo"
        name="legajo"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input type="email" placeholder="Ingrese su correo electrónico" />
      </Form.Item>

      <Form.Item
        label="Domicilio"
        name="domicilio"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Genero"
        name="genero"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          //   onChange={}
          allowClear
        >
          <Option value="M">M</Option>
          <Option value="F">F</Option>
          <Option value="X">X</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Obra Social"
        name="obrasSociales"
        // rules={[
        //   {
        //     required: true,
        //     message: "ingrese una Obra Social",
        //   },
        // ]}
      >
   {!loading && employeeSelected? (
          obrasSociales.obraSociales.map((rep, index) => {
            const checkboxHandler = (event) => {
              const obraSocialId = rep._id;
              const isChecked = event.target.checked;

              // Verifica si el checkbox está marcado o desmarcado
              if (isChecked) {
                // Agrega la obra social al array de seleccionadas
                setObrasSocialesSeleccionadas((prevSeleccionadas) => [
                  ...prevSeleccionadas,
                  obraSocialId,
                ]);
              } else {
                // Remueve la obra social del array de seleccionadas
                setObrasSocialesSeleccionadas((prevSeleccionadas) =>
                  prevSeleccionadas.filter((id) => id !== obraSocialId)
                );
              }
            };

            return (
              <div key={index}>
                <Input
                  type="checkbox"
                  value={rep._id}
                  onChange={checkboxHandler}
                  checked={obrasSocialesSeleccionadas?.includes(rep._id)}
                />
                <label title="Seleccione al menos una">{rep.nombre}</label>
              </div>
            );
          })
        ) : (
          <Spin spinning={loading} />
        )}
      
      </Form.Item>
      
      <Form.Item
        label="Puestos"
        name="puestos"
      >

        {
          !loadingPuestos && employeeSelected?
          puestos.puestos.map((pues,index)=>{
            const checkboxHandler = (event) => {
              const puestoId = pues._id;
              const isChecked = event.target.checked;

              // Verifica si el checkbox está marcado o desmarcado
              if (isChecked) {
                // Agrega la obra social al array de seleccionadas
                setPuestosSeleccionados((prevSeleccionadas) => [
                  ...prevSeleccionadas,
                  puestoId,
                ]);
              } else {
                // Remueve la obra social del array de seleccionadas
                setPuestosSeleccionados((prevSeleccionadas) =>
                  prevSeleccionadas.filter((id) => id !== puestoId)
                );
              }
            };
            return (
              <div key={index}>
                <Input
                  type="checkbox"
                  value={pues._id}
                  onChange={checkboxHandler}
                  checked={puestosSeleccionados?.includes(pues._id)}
                />
                <label title="Seleccione al menos una">{pues.nombre}</label>
              </div>
            );
          }): (
            <Spin spinning={loading} />
          )
        }
      </Form.Item>

      {/* <Form.Item
        label="Areas"
        name="areas"
      >

        {
          !loadingAreas && employeeSelected?
          areas.areas.map((ar,index)=>{
            const checkboxHandler = (event) => {
              const areaId = ar._id;
              const isChecked = event.target.checked;

              // Verifica si el checkbox está marcado o desmarcado
              if (isChecked) {
                // Agrega el área al array de seleccionadas
                setAreasSeleccionadas((prevSeleccionadas) => [
                  ...prevSeleccionadas,
                  areaId,
                ]);
              } else {
                // Remueve el área del array de seleccionadas
                setAreasSeleccionadas((prevSeleccionadas) =>
                  prevSeleccionadas.filter((id) => id !== areaId)
                );
              }
            };
            return (
              <div key={index}>
                <Input
                  type="checkbox"
                  value={ar._id}
                  onChange={checkboxHandler}
                  checked={areasSeleccionadas?.includes(ar._id)}
                />
                <label title="Seleccione al menos una">{ar.nombre}</label>
              </div>
            );
          }): (
            <Spin spinning={loading} />
          )
        }
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormEmployess;
