import React from "react";
import styled from "styled-components";

const ViewDetailsModal = ({ title, dataObject }) => {
  const renderNestedObjects = (obj) => {
    return (
      <StyledUl key={obj}>
        {Object.keys(obj).map((key) => (
          <StyledLi key={key}>
            <LiWrapper>
              <Concept>{key}</Concept>
              <Value>
                {typeof obj[key] === "object"
                  ? renderNestedObjects(obj[key])
                  : obj[key]}
              </Value>
            </LiWrapper>
          </StyledLi>
        ))}
      </StyledUl>
    );
  };

  return (
    <Container>
      <Title>Detalles de {title}</Title>
      {renderNestedObjects(dataObject)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bolder;
  padding: 10px;
`;

const LiWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const Concept = styled.div`
  font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: bolder;
  border: 1px solid #1890ff;
  background-color: #1890ff;
  border-radius: 5px 5px 0 0;
  width: 100%;
`;

const Value = styled.div`
  font-size: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border: 1px solid black;
  border-radius: 0 0 5px 5px;
  width: 100%;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 10px;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export default ViewDetailsModal;
