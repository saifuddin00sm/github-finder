import React from "react";
import { Container } from "react-bootstrap";
import { Form, Input, Button, Typography, Spin, Alert, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import {
  signIn,
  signUp,
  socialMediaAccess,
} from "../../containers/Redux/AuthActions/authActions";
import { connect } from "react-redux";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const { Title } = Typography;

// social media authentication providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const NormalLoginForm = ({
  signin,
  signup,
  isLoading,
  error,
  loginWithSocialMedia,
}) => {
  const [showInput, setShowInput] = React.useState(false);

  // styles
  const containerStyle = {
    height: "auto",
    width: "400px",
    background: "#ffff",
    padding: "20px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    margin: "auto",

    position: "relative",
  };

  const overlay = {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: "0px",
    left: "0px",
    background: "	rgba(255, 255, 255, 0.8)",
    zIndex: "1200",
    transition: "all 0.5s",
    display: isLoading ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
  };

  // showing input handler
  const show = e => {
    e.preventDefault();
    setShowInput(prev => !prev);
  };

  // submit handler
  const onFinish = values => {
    if (showInput) {
      signup(values.email, values.password, values.name);
    } else {
      signin(values.email, values.password);
    }
  };

  // signing in with social media
  const signInWithSocialMedia = provider => {
    loginWithSocialMedia(provider);
  };

  return (
    <Container style={containerStyle}>
      <div style={overlay}>
        <Spin size="large" style={{ fontSize: "17px" }} tip="Loading..." />
      </div>

      <div>
        <div className="mb-3 text-center p-3">
          <Title level={3}>Welcome to GithubFinder</Title>
        </div>
        <div>
          <Button
            block
            className="mb-3 d-flex justify-content-center align-items-center"
            onClick={() => signInWithSocialMedia(googleProvider)}
          >
            <GoogleOutlined style={{ color: "#4285F4" }} />{" "}
            <span>Sign in with google</span>
          </Button>
          <Button
            block
            className="mb-3 d-flex justify-content-center align-items-center"
            onClick={() => signInWithSocialMedia(githubProvider)}
          >
            <GithubOutlined /> <span>Sign in with github</span>
          </Button>
        </div>
        <Divider plain className="mb-0">
          Or
        </Divider>
        <Title level={2} className="mb-4">
          {showInput ? "Sign Up" : "Login"}
        </Title>

        {error && (
          <Alert
            message={error.code.slice(5)}
            type="error"
            closable
            className="mb-4"
          />
        )}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {showInput && (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                type="text"
              />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {showInput ? (
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
          ) : null}
          <Form.Item className="text-center mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              {showInput ? "Sign Up" : "Log in"}
            </Button>
            <p className="mt-2">
              {showInput
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
            <a href="/" onClick={show}>
              {showInput ? "Login" : "Register now!"}
            </a>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

const mapToStateProps = state => {
  return {
    isLoading: state.isLoading,
  };
};

const mapToDispatchProps = dispatch => {
  return {
    signin: (email, password) => dispatch(signIn(email, password)),
    signup: (email, password, name) => dispatch(signUp(email, password, name)),
    loginWithSocialMedia: provider => dispatch(socialMediaAccess(provider)),
  };
};

export default connect(mapToStateProps, mapToDispatchProps)(NormalLoginForm);
