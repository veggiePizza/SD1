import React, { Component } from "react";
import styled, { css } from "styled-components";
import FeatherIcon from "react-native-vector-icons/dist/Feather";

function MaterialButtonTransparentHamburger(props) {
  return (
    <Container {...props}>
      <FeatherIcon
        name="menu"
        style={{
          color: "rgba(0,0,0,1)",
          fontSize: 24
        }}
      ></FeatherIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
`;

export default MaterialButtonTransparentHamburger;
