import React, { Component } from "react";
import styled, { css } from "styled-components";
import FeatherIcon from "react-native-vector-icons/dist/Feather";
<<<<<<< HEAD
import ProfileButton from './profileButton';

function MaterialButtonTransparentHamburger(props, {user}) {
=======

function MaterialButtonTransparentHamburger(props) {
>>>>>>> 4cd84d6ed50be7d3fd5a1bbcf635472744bb78a1
  return (
    <Container {...props}>
      <FeatherIcon
        name="menu"
        style={{
          color: "rgba(0,0,0,1)",
          fontSize: 24
        }}
<<<<<<< HEAD
        
      >
      </FeatherIcon>
=======
      ></FeatherIcon>
>>>>>>> 4cd84d6ed50be7d3fd5a1bbcf635472744bb78a1
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

<<<<<<< HEAD
export default MaterialButtonTransparentHamburger;
=======
export default MaterialButtonTransparentHamburger;
>>>>>>> 4cd84d6ed50be7d3fd5a1bbcf635472744bb78a1
