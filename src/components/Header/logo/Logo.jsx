import React from "react";
import styled from "styled-components";

const LogoComp = styled.div`
  h1 > span:first-child {
    color: var(--main-clr);
  }
`;

const Logo = () => {
  return (
    <LogoComp>
      <h1>
        Git<span>Hub</span>
        <span>-Finder</span>
      </h1>
    </LogoComp>
  );
};

export default Logo;
