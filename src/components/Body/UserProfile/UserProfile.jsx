import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Row, Col, Container } from "react-bootstrap";
import { Card, Typography, Spin } from "antd";
import axios from "axios";
import { AiOutlineProfile } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { BsLink } from "react-icons/bs";

const { Title } = Typography;

const Profile = styled.div`
  margin: 60px 0px 40px 0px;
  .profile {
    max-height: 250px;
    height: 250px;
    .address {
      font-size: 16px;
      p {
        color: #617d98;
      }
      svg {
        margin-right: 10px;
        font-size: 20px;
      }
    }
    .profile-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        text-decoration: none;
        padding: 5px 20px;
        border-radius: 10px;
        font-size: 15px;
        border: 2px solid var(--main-clr);
        color: var(--main-clr);
        transition: all 0.4s;
        &:hover {
          background-color: var(--main-clr);
          color: #fff;
        }
      }
    }
    .userPic {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }
  }
  /* followers stylings */

  .followers {
    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
  }

  .tags {
    background-color: #fff;
    padding: 5px 20px;
    position: absolute;
    top: -10%;
    left: 0;
    font-size: 17px;
    font-weight: bold;
    text-transform: capitalize;
    z-index: 100;
  }

  .ant-card-body {
    position: relative;
  }

  @media (max-width: 768px) {
    .first-col {
      margin-bottom: 3rem;
    }
  }
`;

const UserProfile = ({ userInfo, error, isLoading }) => {
  const [followers, setFollowers] = useState([]);

  const {
    avatar_url,
    bio,
    blog,
    followers_url,
    name,
    location,
    company,
    twitter_username,
    html_url,
  } = userInfo;

  //  fetching followers
  useEffect(() => {
    const getFollowers = () => {
      // callign data
      if (followers_url !== undefined) {
        axios
          .get(followers_url)
          .then(res => {
            setFollowers(res.data);
          })
          .catch(err => console.log(err));
      }
    };
    getFollowers();
    // eslint-disable-next-line
  }, [userInfo]);

  return (
    <Profile>
      <Container>
        <Row>
          <Col lg={6} sm={12} className="first-col">
            <Card>
              <div className="tags">
                <p>user</p>
              </div>
              <div className="profile">
                {isLoading ? (
                  <Spin tip="Loading..."></Spin>
                ) : (
                  <div className="wrapper">
                    <div className="profile-info mb-3">
                      <div className="d-flex gap-3 align-items-center">
                        <img
                          className="userPic"
                          src={avatar_url}
                          alt="userImage"
                        />
                        <div>
                          <p
                            style={{
                              fontSize: "20px",
                              color: "#000",
                              fontWeight: "bold",
                            }}
                          >
                            {name}
                          </p>
                          <p
                            style={{
                              fontSize: "17px",
                              color: "#617d98",
                            }}
                          >
                            {twitter_username}
                          </p>
                        </div>
                      </div>
                      <a href={html_url}>Follow</a>
                    </div>
                    <p style={{ fontSize: "16px", color: "#617d98" }}>{bio}</p>
                    <div className="address mt-3">
                      <p>
                        <AiOutlineProfile />
                        <span>{company}</span>
                      </p>
                      <p>
                        <MdLocationOn />
                        <span>{location}</span>
                      </p>
                      <div style={{ color: "#617d98" }}>
                        <BsLink />
                        <a style={{ color: "#617d98" }} href={blog}>
                          {blog}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </Col>
          <Col lg={6} sm={12}>
            <Card>
              <div className="tags">
                <p>Followers</p>
              </div>
              {isLoading ? (
                <Spin tip="Loading..." />
              ) : (
                <div
                  className="followers"
                  style={{ overflow: "auto", height: "250px" }}
                >
                  {followers.map(user => (
                    <div
                      key={user.node_id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      <div>
                        <img src={user.avatar_url} alt="userimage" />
                      </div>
                      <div>
                        <Title level={4} className="text-capitalize">
                          {user.login}
                        </Title>
                        <a
                          style={{ color: "#617d98", fontSize: "17px" }}
                          href={user.html_url}
                        >
                          {user.html_url}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Profile>
  );
};

// redux state
const mapToStateProps = state => {
  return {
    userInfo: state.userInfo,
    error: state.errorMsg,
    isLoading: state.isLoading,
  };
};

export default connect(mapToStateProps)(UserProfile);
