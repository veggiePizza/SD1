import React from "react";
import styled from "styled-components";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonShare1 from "../components/MaterialButtonShare1";
import MaterialChipWithCloseButton from "../components/MaterialChipWithCloseButton";

import "./styles.css";

function Untitled(props) {
  return (
    <Container>
      <Content>
        <Image2Row>
          <Image2
            src={require("../assets/images/NewLenditLogo_1.png")}
            alt="Logo"
          />
          <SearchContainer>
            <SearchInput placeholder="🔍 What are you looking for rent?" />
            <SearchButton>Search</SearchButton>
          </SearchContainer>

          <MaterialButtonViolet
            style={{
              height: 44,
              width: 130,
              borderRadius: 50,
              marginLeft: 30,
            }}
          />
          <MaterialButtonShare1
            style={{
              height: 30,
              width: 48,
              borderWidth: 1,
              borderColor: "rgba(232,232,232,1)",
              marginLeft: 29,
              borderStyle: "solid",
            }}
          />
          <MaterialChipWithCloseButton
            style={{
              height: 41,
              width: 110,
              borderWidth: 1,
              borderColor: "rgba(232,232,232,1)",
              marginLeft: 60,
              marginRight: 60,
              borderStyle: "solid",
            }}
          />
        </Image2Row>
      </Content>

      <MainContent>
        <LeftFilterSection />
        <RightProductSection />
      </MainContent>
    </Container>
  );
}

const LeftFilterSection = () => {
  return (
    <LeftContainer>
      <Title>Add Payment Method</Title>
      <PaymentInfo>Payment securely processed by <StyledStripe>Stripe</StyledStripe></PaymentInfo>
      <Subtitle>Add the information of your card.</Subtitle>
      <InputLabel>Cardholder’s Name</InputLabel>
      <Input placeholder="Enter name" />
      <InputLabel>Card Number</InputLabel>
      <CardNumberContainer>
        <CardInput placeholder="1234 5678 9012 3456" />
        <CardIcon>💳</CardIcon>
      </CardNumberContainer>
      <CardExpiryCVC>
        <div>
          <InputLabel>Expiry</InputLabel>
          <Input placeholder="03 / 25" />
        </div>
        <div>
          <InputLabel>CVC</InputLabel>
          <Input placeholder="123" />
        </div>
      </CardExpiryCVC>
      <InputLabel>Discount Code</InputLabel>
      <DiscountContainer>
        <Input placeholder="Enter code" />
        <ApplyButton>Apply</ApplyButton>
      </DiscountContainer>
      <PayButton>Pay</PayButton>
    </LeftContainer>
  );
};

const RightProductSection = () => (
  <RightContainer>
    <Card backgroundImage={require("../assets/images/grad_back.png")}>
      <CardTitle>Summary</CardTitle>
      <RectangleCard>
        <DateContainer>
          <DateTitle>Start Date</DateTitle>
          <DateValue>10/01/2024</DateValue>
        </DateContainer>
        <CenterText>to</CenterText> 
        <DateContainer>
          <DateTitle>End Date</DateTitle>
          <DateValue>10/07/2024</DateValue>
        </DateContainer>
      </RectangleCard>
      <RentalInfo>
        <span>Rental (6 days)</span>
        <span>$120.00</span>
      </RentalInfo>
      <HorizontalLine />
      <Total>
        <span>Total</span>
        <span>$120.00</span>
      </Total>
      <Disclaimer>This listing does not require ID Verification</Disclaimer>
      <Agreement>By booking, you agree to the LendIt Terms and all special instructions from the Lender.</Agreement>
    </Card>
  </RightContainer>
);

const LeftContainer = styled.div`
  width: 30%;
  padding: 20px;
  border-right: 1px solid #e8e8e8;
`;

const RightContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
    text-align: center;
  margin-bottom: 50px;
`;

const PaymentInfo = styled.p`
  margin: 0;
  font-size: 14px;
  color: #575757;
`;

const StyledStripe = styled.span`
  font-family: 'Courier New', Courier, monospace; /* Change this to desired font */
  font-weight: 900;
  color: #000000;
  font-size: 20px;
`;

const Subtitle = styled.p`
  margin: 20px 0;
    color: #575757;

`;

const InputLabel = styled.label`
  margin-top: 10px;
    margin-bottom: 5px;
font-size: 12px;
  display: block;
      color: #575757;

`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  margin-bottom: 10px;
   background-color: #EEEEEE;
`;

const CardNumberContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const CardInput = styled(Input)`
  width: 75%;
  padding-left: 36px; /* Adjust for icon */
`;

const CardIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 6px;
  font-size: 20px; /* Adjust as needed */
`;

const CardExpiryCVC = styled.div`
  display: flex;
  justify-content: normal;
  gap: 50px;
`;

const DiscountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ApplyButton = styled.button`
  background-color: #0B4575;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 1px;
`;

const PayButton = styled.button`
  background-color: #0B4575;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
`;

const Card = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  background-size: fit; /* Cover the entire area */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent repeating */
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 450px;
  height: 500px;
`;


const CardTitle = styled.h3`
font-size: 32px;
  margin-bottom: 24px;
`;

const RectangleCard = styled.div`
  display: flex;
  align-items: center; /* Align items vertically centered */
  justify-content: space-between; /* Space between the items */
  width: 420px; /* Full width of the card */
  margin: 50px 0; /* Space above and below */
  padding: 20px 10px; /* Padding inside the rectangle */
  border: 1px solid rgba(0, 0, 0, 0.1); /* Optional border */
  border-radius: 10px; /* Optional border radius */
  background: rgba(255, 255, 255, 0.5); /* Optional background for visibility */
`;

const CenterText = styled.span`
  font-weight: bold; /* Make the text bold */
  color: #0B4575; /* Adjust color as needed */
  margin: 0 10px; /* Margin to space out from DateContainers */
`;
const DateContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const DateTitle = styled.span`
`;

const DateValue = styled.span`
  display: block;
    font-weight: bold;
color: #0B4575;
`;

const RentalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const HorizontalLine = styled.hr`
  border: none; /* Remove default border */
  height: 1px; /* Set height of the line */
  background-color: #000000; /* Set the desired color */
  margin: 20px 0; /* Add margin above and below the line */
`;


const Total = styled(RentalInfo)`
  font-weight: bold;
`;

const Disclaimer = styled.p`
  text-align: center;
  margin: 10px 0;
`;

const Agreement = styled.p`
  text-align: center;
  font-size: 12px;
`;

const Image2Row = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 0 120px;
  border-bottom: 1px solid #E8E8E8;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: auto;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 10px;
  width: 250px;
  background-color: #F7F7F7;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: #FFFFFF;
  color: #0B4575;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: rgba(3, 121, 206, 1);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const Image2 = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
`;

const Container = styled.div`
  position: relative; 
  width: 100vw; 
  overflow: hidden; 
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
    justify-content: center; /* Center items horizontally */
  align-items: center; /* Center items vertically */
`;

export default Untitled;
