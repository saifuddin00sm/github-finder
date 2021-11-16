import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import Pie from "../../charts/Pie";
import Column from "../../charts/Column";
import Bar from "../../charts/Bar";
import Doughnut from "../../charts/Doughnut";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Repos.css";

const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const Repos = ({ userInfo, isLoading }) => {
  const [repo, setRepo] = useState([]);
  const { repos_url } = userInfo;

  useEffect(() => {
    const getRepos = () => {
      if (repos_url !== undefined) {
        axios
          .get(`${repos_url}?per_page=100`)
          .then(res => {
            if (res.status === 200) {
              setRepo(res.data);
            }
          })
          .catch(err => console.log(err));
      }
    };

    getRepos();
    // eslint-disable-next-line
  }, [userInfo]);

  // languages
  const languages = repo.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  // Most popular
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map(item => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // Most use data
  const mostUsed = Object.values(languages).sort((a, b) => a.value - b.value);

  // forks and stars
  let { stars, forks } = repo.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <div>
      <Container>
        <Row>
          <Col lg={5} sm={12} className="mb-3">
            {isLoading ? <Spin indicator={antIcon} /> : <Pie data={mostUsed} />}
          </Col>
          <Col lg={7} sm={12}>
            {isLoading ? <Spin indicator={antIcon} /> : <Column data={stars} />}
          </Col>
        </Row>

        <Row>
          <Col lg={5} sm={12} className="mb-3">
            {isLoading ? (
              <Spin indicator={antIcon} />
            ) : (
              <Doughnut data={mostPopular} />
            )}
          </Col>
          <Col lg={7} sm={12}>
            {isLoading ? <Spin indicator={antIcon} /> : <Bar data={forks} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapToStateProps = state => {
  return {
    userInfo: state.userInfo,
    isLoading: state.isLoading,
  };
};

export default connect(mapToStateProps)(Repos);
