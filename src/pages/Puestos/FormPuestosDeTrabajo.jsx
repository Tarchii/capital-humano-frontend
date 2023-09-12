import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { toast } from "react-toastify";
import axios from "../../config/axios";

const FormPuestosDeTrabajo = ({
  closeModal,
  form,
  areas,
  getData,
  puestoSelected,
}) => {
  const onFinish = async (values) => {
    values = values.area.hasOwnProperty("id")
      ? {
          ...values,
          area: areas.find((area) => area.nombre == values.area.nombre)._id,
        }
      : {
          ...values,
          area: areas.find((area) => area.nombre == values.area)._id,
        };

    if (puestoSelected == undefined) {
      try {
        const respuesta = await axios.post("/puestos", values);
        closeModal();
        getData();
        form.resetFields(); // Limpiar campos
        toast.success("Puesto registrado con éxito!");
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
    } else {
      try {
        const respuesta = await axios.put(
          `/puestos/${puestoSelected._id}`,
          values
        );
        closeModal();
        getData();
        form.resetFields(); // Limpiar campos
        toast.success("Puesto modificado con éxito!");
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        label="descripcion"
        name="descripcion"
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
        label="Area"
        name="area"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Select placeholder="Seleccione un area">
          {areas.map((area) => (
            <Option key={area.id} value={area.nombre}></Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Sueldo Base"
        name="sueldoBase"
        rules={[
          {
            required: true,
            message: "Please input your age!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Fecha de Inicio"
        name="inicio"
        rules={[
          {
            required: true,
            message: "Please input your DNI!",
          },
        ]}
      >
        <Input type="date" />
      </Form.Item>

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

export default FormPuestosDeTrabajo;
