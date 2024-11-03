import React, { Component } from "react";
import styled, { css } from "styled-components";
import SimpleLineIconsIcon from "react-native-vector-icons/dist/SimpleLineIcons";

function MaterialButtonShare1(props) {
  return (
    <Container {...props}>
      <SimpleLineIconsIcon
        name="globe"
        style={{
          color: "rgba(3,141,226,1)",
          fontSize: 24,
          alignSelf: "center"
        }}
      ></SimpleLineIconsIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,255,255,1);
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  min-width: 40px;
  min-height: 40px;
  flex-direction: column;
  box-shadow: 0px 2px 1.2px  0.2px #111 ;
`;

export default MaterialButtonShare1;
