import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialIconsIcon from "react-native-vector-icons/dist/MaterialIcons";

function MaterialButtonShare4(props) {
  return (
    <Container {...props}>
      <MaterialIconsIcon
        name="person"
        style={{
          color: "#fff",
          fontSize: 24,
          alignSelf: "center"
        }}
      ></MaterialIconsIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(189,189,189,1);
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  min-width: 32px;
  min-height: 32px;
  flex-direction: column;
  box-shadow: 0px 2px 1.2px  0.2px #111 ;
`;

export default MaterialButtonShare4;
