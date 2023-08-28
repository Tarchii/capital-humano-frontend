import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { toast } from "react-toastify";
import axios from "../../config/axios";

const FormEmployess = ({ setIsModalOpen, form,getData, employeeSelected }) => {


  const onFinish = async (values) => {
 if(employeeSelected == undefined){

     try {
       const respuesta = await axios.post("/empleados", values);
       setIsModalOpen(false);
       getData();
       form.resetFields(); // Limpiar campos
       toast.success("Empleado registrado con éxito!");
     } catch (error) {
       toast.error(error.response?.data.message || error.message);
     }
 }else{
    
    try {
        
        const respuesta = await axios.put(`/empleados/${employeeSelected._id}`, values);
        setIsModalOpen(false);
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
