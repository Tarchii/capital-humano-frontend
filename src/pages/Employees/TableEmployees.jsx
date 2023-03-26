import { Button, Modal, Table } from 'antd';
import React, { useState } from 'react'
import styled from 'styled-components';
import { UploadOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const TableEmployees = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Header>
                <PageTitle>
                    Empleados
                </PageTitle>
                <Button onClick={() => setIsModalOpen(true)}>Agregar Empleado</Button>
            </Header>
            <Table dataSource={dataSource} columns={columns} />
            <Modal visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => setIsModalOpen(false)}>
                <h1>Modal</h1>
            </Modal>
        </>
    )
}

const dataSource = [
    {
        key: '1',
        legajo: '45189',
        apellido: 'Tarchini',
        nombre: 'Franco',
        dni: '40000889',
        domicilio: 'Av. Rivadavia 1234',

    },
    {
        key: '2',
        legajo: '45189',
        apellido: 'Tarchini',
        nombre: 'Franco',
        dni: '40000889',
        domicilio: 'Av. Rivadavia 1234',

    },
    {
        key: '3',
        legajo: '45189',
        apellido: 'Tarchini',
        nombre: 'Franco',
        dni: '40000889',
        domicilio: 'Av. Rivadavia 1234',

    },
    {
        key: '4',
        legajo: '45189',
        apellido: 'Tarchini',
        nombre: 'Franco',
        dni: '40000889',
        domicilio: 'Av. Rivadavia 1234',

    },
    {
        key: '5',
        legajo: '45189',
        apellido: 'Tarchini',
        nombre: 'Franco',
        dni: '40000889',
        domicilio: 'Av. Rivadavia 1234',

    },
    {
        key: '6',
        legajo: '45189',
        apellido: 'Tarchini',
        nombre: 'Franco',
        dni: '40000889',
        domicilio: 'Av. Rivadavia 1234',

    },
    {
        key: '7',
        legajo: '45189',
        apellido: 'Tarchini',
        nombre: 'Franco',
        dni: '40000889',
        domicilio: 'Av. Rivadavia 1234',

    },
];

const columns = [
    {
        title: 'Legajo',
        dataIndex: 'legajo',
        key: 'legajo',
    },
    {
        title: 'Apellido',
        dataIndex: 'apellido',
        key: 'apellido',
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
    },
    {
        title: 'DNI',
        dataIndex: 'dni',
        key: 'dni',
    },
    {
        title: 'Domicilio',
        dataIndex: 'domicilio',
        key: 'domicilio',
    },
    {
        title: 'Ver Detalles',
        dataIndex: 'verDetails',
        key: 'verDetalles',
        render: () => <CenteredButton>
            <Button type='primary' shape='circle'><EyeOutlined /></Button>
        </CenteredButton>
    },
    {
        title: 'Editar',
        dataIndex: 'editar',
        key: 'editar',
        render: () => <CenteredButton>
            <Button shape='circle'><EditOutlined /></Button>
        </CenteredButton>
    },
    {
        title: 'Eliminar',
        dataIndex: 'eliminar',
        key: 'eliminar',
        render: () => <CenteredButton>
            <Button danger shape='circle'><DeleteOutlined /></Button>
        </CenteredButton>
    },
    {
        title: 'Agregar Foto',
        dataIndex: 'agregarFoto',
        key: 'agregarFoto',
        render: () => <CenteredButton>
            <Button shape='circle'><UploadOutlined /></Button>
        </CenteredButton>
    }
];

const Container = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`;

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

export default TableEmployees