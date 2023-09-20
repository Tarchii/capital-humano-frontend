import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { toast } from "react-toastify";
import axios from "../../config/axios";

const FormArea = ({
  closeModal,
  form,
  getData,
  employeeSelected,
  departamentos,
}) => {
  
  const onFinish = async (values) => {
    values = values.departamento.hasOwnProperty("id")
      ? {
          ...values,
          departamento: departamentos.find(
            (departamento) => departamento.nombre == values.departamento.nombre
          )._id,
        }
      : {
          ...values,
          departamento: departamentos.find(
            (departamento) => departamento.nombre == values.departamento
          )._id,
        };
    if (employeeSelected == undefined) {
      try {
        const respuesta = await axios.post("/areas", values);
        closeModal();
        getData();
        form.resetFields(); // Limpiar campos
        toast.success("Área registrada con éxito!");
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
    } else {
      try {
        const respuesta = await axios.put(
          `/areas/${employeeSelected._id}`,
          values
        );
        closeModal();
        getData();
        form.resetFields(); // Limpiar campos
        toast.success("Área modificada con éxito!");
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
        label="Departamento"
        name="departamento"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Select placeholder="Seleccione un departamento">
          {departamentos.map((departamento) => (
            <Option key={departamento._id} value={departamento.nombre}></Option>
          ))}
        </Select>
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

export default FormArea;
