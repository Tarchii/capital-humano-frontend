import { Tabs } from "antd";
import styled from "styled-components";
import AppLayout from "../../components/layout/AppLayout";
import TableEmployees from "./TableEmployees";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { endpoints } from "../../services/endpoints";
import axios from "axios";

const Employees = () => {
  const [isTabDisabled, setIsTabDisabled] = useState(true);

  // const { data, refetch } = useQuery(
  //   ['employees'],
  //   async () => await axios.get(endpoints.EMPLEADOS),
  //   {
  //     initialData: { data: { employees: [] } },
  //   }
  // );

  // const { mutate } = useMutation(
  //   ['delete', 'employees'],
  //   async (id) => {
  //     return await axios.delete(`${endpoints.EMPLEADOS}/${id}`);
  //   },
  //   {
  //     onSuccess: () => {
  //       refetch();
  //     },
  //     onMutate: (id) => {
  //       return id;
  //     },
  //   }
  // );

  // console.log('data', data);

  return (
    <AppLayout>
      <Container>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Tabla Empleados" key="1">
            <TableEmployees />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Detalles Empleado"
            key="2"
            disabled={isTabDisabled}
          >
            Content of Tab Pane 2
          </Tabs.TabPane>
        </Tabs>
      </Container>
    </AppLayout>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default Employees;
