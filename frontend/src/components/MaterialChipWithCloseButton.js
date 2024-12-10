import React from "react";
import styled from "styled-components";
import MaterialButtonShare4 from "./MaterialButtonShare4";
import MaterialButtonTransparentHamburger from "./MaterialButtonTransparentHamburger";

<<<<<<< HEAD
function MaterialChipWithCloseButton(props, {SessionUser}) {
=======
function MaterialChipWithCloseButton(props) {
>>>>>>> 4cd84d6ed50be7d3fd5a1bbcf635472744bb78a1
  return (
    <Container {...props}>
      <MaterialButtonShare4
        style={{
          width: 20,
          height: 20,
          marginRight: '14px' // Space between the two buttons
        }}
      />
      <MaterialButtonTransparentHamburger
        style={{
          height: 36,
          width: 36
        }}
<<<<<<< HEAD
        user = {SessionUser}
=======
>>>>>>> 4cd84d6ed50be7d3fd5a1bbcf635472744bb78a1
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* Center items vertically */
  justify-content: space-between; /* Space items evenly */
  background-color: rgba(255, 255, 255, 1);
  padding-left: 12px;
  padding-right: 12px; /* Added padding for consistency */
  border-radius: 50px;
  height: 40px; /* Ensure a consistent height */
`;

export default MaterialChipWithCloseButton;
