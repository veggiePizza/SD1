import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function MaterialChipWithImageAndCloseButton(props) {
  return (
    <Container {...props}>
      <MaterialCommunityIconsIcon
        name="close-circle"
        style={{
          color: "#9E9E9E",
          fontSize: 24,
          marginRight: 4
        }}
      ></MaterialCommunityIconsIcon>
      <></>
      <MaterialCommunityIconsIcon
        name="close-circle"
        style={{
          color: "#9E9E9E",
          fontSize: 24,
          marginRight: 4
        }}
      ></MaterialCommunityIconsIcon>
      <></>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(230,230,230);
  border-radius: 50px;
  flex-direction: row;
`;

const Undefined = styled.div`
`;

export default MaterialChipWithImageAndCloseButton;
