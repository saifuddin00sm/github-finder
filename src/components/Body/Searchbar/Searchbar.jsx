import React from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { connect } from "react-redux";
import { loadData } from "../../../containers/Redux/actionType";
import axiosOrder from "../../../axiosOrder";

const FormEl = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 60px;
  form {
    flex: 8;
    margin-right: 40px;
    display: flex;
    align-items: center;
    position: relative;

    width: 100%;
  }
  div {
    flex: 4;
  }

  @media (max-width: 768px) {
    flex-flow: column;
    form {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
`;

const Searchbar = ({ loadData, isloading }) => {
  const [value, setValue] = React.useState("");
  const [requests, setRequests] = React.useState({});

  React.useEffect(() => {
    const getData = () => {
      axiosOrder
        .get("rate_limit")
        .then(res => {
          setRequests(res.data.rate);
        })
        .catch(error => {
          console.log(error);
        });
    };

    getData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (!value) return;
    loadData(value);
  };

  return (
    <Container>
      <FormEl>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              size="large"
              placeholder="Search by username"
              prefix={<SearchOutlined />}
              onChange={e => setValue(e.target.value)}
              value={value}
            />
          </div>
          <Button
            style={{
              position: "absolute",
              right: "5px",
              top: "4px",
              zIndex: "100",
            }}
            type="primary"
            htmlType="submit"
            loading={isloading}
            disabled={!value}
          >
            Search
          </Button>
        </form>
        <div>
          <h2 style={{ color: "#617d98" }}>
            Requests left : {requests.remaining} / {requests.limit}
          </h2>
        </div>
      </FormEl>
    </Container>
  );
};

const mapToDispatchProps = dispatch => {
  return {
    loadData: searchVal => dispatch(loadData(searchVal)),
  };
};

const mapToStateProps = state => {
  return {
    isloading: state.isLoading,
  };
};

export default connect(mapToStateProps, mapToDispatchProps)(Searchbar);
