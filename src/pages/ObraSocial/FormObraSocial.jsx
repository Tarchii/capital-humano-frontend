import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { toast } from "react-toastify";
import axios from "../../config/axios";

const FormObraSocial = ({ closeModal, form,getData, employeeSelected}) => {


  const onFinish = async (values) => {
 if(employeeSelected == undefined){

     try {
       const respuesta = await axios.post("/obraSocial", values);
       closeModal();
       getData();
       form.resetFields(); // Limpiar campos
       toast.success("Obra social registrada con éxito!");
     } catch (error) {
       toast.error(error.response?.data.message || error.message);
     }
 }else{
    
    try {
        const respuesta = await axios.put(`/obraSocial/${employeeSelected._id}`, values);
        closeModal()
        getData();
        form.resetFields(); // Limpiar campos
        toast.success("Obra Social modificada con éxito!");
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
        label="domicilio"
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
        label="telefono"
        name="telefono"
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
        label="cuit"
        name="cuit"
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
export default FormObraSocial;
