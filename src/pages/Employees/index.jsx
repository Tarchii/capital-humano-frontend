import { Tabs } from "antd";
import styled from "styled-components";
import AppLayout from "../../components/layout/AppLayout";
import TableEmployees from "./TableEmployees";

const Employees = () => {
  return (
    <AppLayout>
      <Container>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Tabla Empleados" key="1">
            <TableEmployees />
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
