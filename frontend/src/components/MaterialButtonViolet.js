import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialButtonViolet(props) {
  return (
    <Container {...props}>
      <StartListing>Start Listing</StartListing>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(11,69,117,1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 100px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const StartListing = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
  margin: 0px;
  padding: 0px;
`;

export default MaterialButtonViolet;
