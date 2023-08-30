import { Dropdown, Menu, Button } from "antd";
import React from "react";
import styled from "styled-components";
import { getUserAvatar, getUserName } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/capitalh");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Button type="text" onClick={handleLogOut}>
              Cerrar sesión
            </Button>
          ),
        },
      ]}
    />
  );

  return (
    <HeaderContainer>
      <p
        style={{
          fontWeight: "bolder",
          marginTop: 10,
        }}
      >
        Software de Gestión de Capital Humano
      </p>
      <Dropdown overlay={menu}>
        <User>
          <UserName>{getUserName()}</UserName>
          <UserImage>
            <img src={getUserAvatar()} alt="user" />
          </UserImage>
        </User>
      </Dropdown>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e3e3e3;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;

const User = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  font-weight: bolder;
`;

const UserImage = styled.div`
  margin-left: 10px;

  img {
    width: 40px;
    vertical-align: middle;
    border-style: none;
    border-radius: 50%;
  }
`;

export default Header;
