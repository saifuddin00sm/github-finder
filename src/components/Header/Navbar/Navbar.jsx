import { Button, Avatar, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LogoutOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { logOut } from "../../../containers/Redux/AuthActions/authActions";
import { useNavigate } from "react-router-dom";

const Nav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    li {
      margin: 0 10px;
    }
  }
`;

const Navbar = ({ signout, authInfo }) => {
  const [names, setName] = useState("");

  const name = JSON.parse(localStorage.getItem("name"));

  useEffect(() => {
    if (name) {
      setName(name);
    }
  }, [authInfo]);

  const navigate = useNavigate();

  const logout = () => {
    navigate("login");
    setName("");
    signout();
  };

  return (
    <Nav>
      <ul>
        {names && (
          <li>
            <Avatar
              style={{ backgroundColor: "#7265e6", verticalAlign: "middle" }}
              size="medium"
            >
              {names.charAt().toUpperCase()}
            </Avatar>
          </li>
        )}
        <li>
          <h5>
            <strong style={{ textTransform: "capitalize" }}>{names}</strong>
          </h5>
        </li>
        {names && (
          <li>
            <Tooltip title="Logout" placement="top">
              <Button
                type="primary"
                shape="circle"
                icon={<LogoutOutlined />}
                size="medium"
                danger
                onClick={logout}
              />
            </Tooltip>
          </li>
        )}
      </ul>
    </Nav>
  );
};

const mapToDispatchProps = dispatch => {
  return {
    signout: () => dispatch(logOut()),
  };
};

const mapToStateProps = state => {
  return {
    authInfo: state.authInfo,
  };
};

export default connect(mapToStateProps, mapToDispatchProps)(Navbar);
