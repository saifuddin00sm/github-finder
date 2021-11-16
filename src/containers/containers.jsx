import React from "react";
import Body from "../components/Body/Body";
import Repos from "../components/Body/Repos/Repos";
// import Header from "../components/Header/Header";

const containers = props => {
  return (
    <>
      <main>
        <Body />
        <Repos />
      </main>
    </>
  );
};

export default containers;
