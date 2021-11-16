import React, { useEffect } from "react";
import Containers from "./containers/containers";
import { connect } from "react-redux";
import { getToken } from "./containers/Redux/AuthActions/authActions";
import { initialData } from "./containers/Redux/actionType";
import Header from "./components/Header/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";

function App({ initialData, error, info, getToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    initialData();
    getToken();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (info === null) {
      navigate("login");
    } else {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [info]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Containers />} />
        <Route path="login" element={<Login error={error} />} />
      </Routes>
    </>
  );
}

const mapToStateProps = state => {
  return {
    error: state.authError,
    info: state.authInfo,
  };
};

const mapToDispatchProps = dispatch => {
  return {
    initialData: () => dispatch(initialData()),
    getToken: () => dispatch(getToken()),
  };
};

export default connect(mapToStateProps, mapToDispatchProps)(App);
