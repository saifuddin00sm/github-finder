import React from "react";
import styled from "styled-components";
import Logo from "./logo/Logo";
import Navbar from "./Navbar/Navbar";

const HeaderComp = styled.header`
  height: 70px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  margin-bottom: 100px;
`;

const Header = () => {
  return (
    <HeaderComp>
      <Logo />
      <Navbar />
    </HeaderComp>
  );
};

export default Header;
