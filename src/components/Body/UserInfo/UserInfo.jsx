import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { GoRepo } from "react-icons/go";
import { BsCode } from "react-icons/bs";
import { UsergroupDeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { Card, Typography, Spin, Alert } from "antd";
import styled from "styled-components";

const User = styled.div`
  .ant-card-body {
    display: flex;
    align-items: center;
    .icon {
      flex: 4;
      .iconInner {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      svg {
        font-size: 30px;
      }
    }
    .text {
      flex: 7;
      font-size: 30px;
    }
  }
`;

const UserInfo = ({ userInfo, isloading, errorMsg }) => {
  const { public_gists, public_repos, followers, following } = userInfo;
  const { Title } = Typography;

  const info = [
    {
      id: 1,
      icon: <GoRepo />,
      label: "repos",
      value: public_repos,
      background: "rgb(255, 224, 240)",
      color: "rgb(218, 74, 145)",
    },
    {
      id: 2,
      icon: <UsergroupDeleteOutlined />,
      label: "followers",
      value: followers,
      color: "#2caeba",
      background: "#e0fcff",
    },
    {
      id: 3,
      icon: <UserAddOutlined />,
      label: "following",
      value: following,
      background: "rgb(230, 230, 255)",
      color: "rgb(93, 85, 250)",
    },

    {
      id: 4,
      icon: <BsCode />,
      label: "gists",
      value: public_gists,
      background: "rgb(255, 251, 234)",
      color: "rgb(240, 180, 41)",
    },
  ];

  if (errorMsg) {
    return (
      <Container>
        <Alert
          message="Error"
          description="No user found!"
          type="error"
          showIcon
        />
      </Container>
    );
  }

  return (
    <Container>
      <User>
        <Row className="gy-3">
          {info.map(userInfo => (
            <Col key={userInfo.id} lg={3} sm={12}>
              <Card bordered={false}>
                {isloading ? (
                  <Spin tip="Loading..."></Spin>
                ) : (
                  <>
                    <div className="icon">
                      <div
                        className="iconInner"
                        style={{
                          background: userInfo.background,
                          color: userInfo.color,
                        }}
                      >
                        {userInfo.icon}
                      </div>
                    </div>
                    <div className="text">
                      <Title level={2} className="fw-bold">
                        {userInfo.value}
                      </Title>
                      <p
                        style={{
                          textTransform: "capitalize",
                          color: "#617d98",
                          fontSize: "19px",
                        }}
                      >
                        {userInfo.label}
                      </p>
                    </div>
                  </>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </User>
    </Container>
  );
};

const mapToStateProps = state => {
  return {
    userInfo: state.userInfo,
    isloading: state.isLoading,
    errorMsg: state.errorMsg,
  };
};

export default connect(mapToStateProps)(UserInfo);
