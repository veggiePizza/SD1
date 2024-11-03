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

      <FooterContainer>
        <Column>
          <ColumnHeading>COMPANY</ColumnHeading>
          <Link>About</Link>
          <Link>Jobs</Link>
        </Column>
        <Column>
          <ColumnHeading>SUPPORT</ColumnHeading>
          <Link>FAQ</Link>
          <Link>Customer support</Link>
        </Column>
        <Column>
          <ColumnHeading>OTHER</ColumnHeading>
          <Link>Privacy Policy</Link>
          <Link>Terms and Conditions</Link>
        </Column>
        <Column>
          <ImageButtonQR
            src={require("../assets/images/qr_code.png")}
            alt="QR Code"
          />
        </Column>
      </FooterContainer>

      <IconsContainer>
        {Array.from({ length: 4 }, (_, index) => (
          <Icon
            key={index}
            src={require(`../assets/images/icon${index + 1}.png`)}
            alt={`Icon ${index + 1}`}
          />
        ))}
      </IconsContainer>

      <VerticalButtonContainer>
        <VerticalButton>Provide feedback</VerticalButton>
      </VerticalButtonContainer>
    </Container>
  );
}


const LeftFilterSection = () => {
  // Define categories inside the component
  const categories = [
    "Tools",
    "Sporting",
    "Vehicles",
    "Photo/Video",
    "Outdoors",
    "Instruments",
    "Events",
    "Electronics",
    "Appliances",
    "Gaming ",
    "Automotive",
    "Home",
    "Clothing",
    "Audio",
    "Places",
    "Services"
  ];

  return (
    <LeftContainer>
      <FilterHeader>
        <FilterTitle>FILTERS</FilterTitle>
        <EditText>CLEAR</EditText>
      </FilterHeader>
      <HorizontalLine />

      <CategoryTitle>Categories</CategoryTitle>
      {categories.map((category, index) => (
        <OptionContainer key={index}>
          <input type="checkbox" id={`category-${index}`} />
          <label htmlFor={`category-${index}`}>{category}</label>
        </OptionContainer>
      ))}

      <input
        type="text"
        placeholder="USD"
        style={{
          width: "30%",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "4px",
          border: "1px solid #e8e8e8",
        }}
      />
      <br/>
      <ApplyButton>Apply</ApplyButton>
    </LeftContainer>
  );
};


const RightProductSection = () => (
  <RightContainer>
    <ProductHeading>SEARCH FOR ITEMS NEAR YOU</ProductHeading>
    <ProductGrid>
      {Array.from({ length: 40 }, (_, index) => (
        <ProductBox key={index}>
          <ProductImagePlaceholder />
          <ProductNamePlaceholder />
        </ProductBox>
      ))}
    </ProductGrid>
  </RightContainer>
);


const VerticalButtonContainer = styled.div`
  position: fixed; /* Fixes the button in place */
  top: 20px; /* Distance from the top */
  right: 0px; /* Distance from the right */
  z-index: 1000; /* Ensure it is above other elements */
`;

const VerticalButton = styled.button`
  background-color: #0b4575; /* Button color */
  color: white; /* Text color */
  border-radius: 5px 0px 0px 5px;
  padding: 10px 15px; /* Padding for the button */
  cursor: pointer; /* Pointer cursor on hover */
  writing-mode: vertical-rl; /* Make the text vertical */
  text-align: center; /* Center text */
  border: 2px solid #ffffff;
  font-weight: 800;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -4px 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0a3e66; /* Darker color on hover */
  }
`;

const LeftContainer = styled.div`
  width: 20%; /* Take 30% of the width */
  padding: 20px;
  border-right: 1px solid #e8e8e8;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterTitle = styled.h4`
  margin: 0;
`;

const EditText = styled.span`
  color: #cccccc; /* Text color */
  cursor: pointer; /* Pointer cursor */
  padding: 5px 10px; /* Padding for better touch area */
  border-radius: 4px; /* Rounded corners for visual effect */
  font-weight: bold;
  &:hover {
    background-color: #0a3e66; /* Darker color on hover */
    color: white; /* Change text color on hover */
  }
`;


const HorizontalLine = styled.hr`
  margin: 10px 0; /* Space around the line */
  border: 0;
  border-top: 1px solid #e8e8e8;
`;

const CategoryTitle = styled.h4`
  margin: 20px 0 10px; /* Space around category title */
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
  margin-bottom: 5px; /* Space below each option */
`;

const ApplyButton = styled.button`
  background-color: #0b4575; /* Button color */
  color: white; /* Text color */
  border: none; /* No border */
  border-radius: 20px; /* Rounded corners */
  padding: 10px 20px; /* Padding */
  cursor: pointer; /* Pointer cursor */
  margin-top: 10px; /* Space above button */

  &:hover {
    background-color: #0a3e66; /* Darker color on hover */
  }
`;

const RightContainer = styled.div`
  width: 70%; /* Take remaining width */
  padding: 20px;
`;



const ProductHeading = styled.h2`
  margin-bottom: 20px; /* Space below heading */
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Four columns */
  gap: 20px; /* Space between items */
`;

const ProductBox = styled.div`
  padding: 10px;
`;

const ProductImagePlaceholder = styled.div`
  width: 100%;
  height: 200px; /* Height for product image */
  background-color: #e8e8e8; /* Placeholder color */
  border-radius: 4px; /* Rounded corners */
  margin-bottom: 10px; /* Space below the image */
`;

const ProductNamePlaceholder = styled.div`
  width: 60%;
  height: 20px; /* Height for product name */
  background-color: #e8e8e8; /* Placeholder color */
  border-radius: 4px; /* Rounded corners */
`;
const Image2Row = styled.div`
  height: 150px;
  display: flex;
  align-items: center; /* Center items vertically */
  justify-content: space-between; /* Distribute space between items */
  width: 90%; /* Full width of the container */
  margin: 0 120px; /* Space on left and right */
  border-bottom: 1px solid #E8E8E8;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: auto; /* Align to the right */
`;

const SearchInput = styled.input`
  padding: 10px;
  border: none; 
  border-radius: 10px;
  width: 250px; /* Adjust width as needed */
  box-shadow: none;
  outline: none;
  background-color: #F7F7F7;
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: #FFFFFF;
  color: #0B4575;
  border: 1px solid #E8E8E8; /* Add a solid border */
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  font-weight: bold; /* Make text bold */

  &:hover {
    background-color: rgba(3, 121, 206, 1);
  }
`;

const ImageButtonQR = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  cursor: pointer;
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

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 150px 50px 100px 250px;
  background-color: #f1f1f1;
  border-bottom: 2px solid #E8E8E8;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Align icons to the left */
  gap: 10px; /* Space between icons */
  background-color: #f1f1f1;
  padding: 80px 64px 64px 150px;
`;

const Icon = styled.img`
  width: 40px; /* Adjust size as needed */
  height: 40px; /* Adjust size as needed */
  border-radius: 50%; /* Make it circular */
  object-fit: cover; /* Maintain aspect ratio */
`;

const Column = styled.div`
  flex: 1;
  padding: 10px;
`;

const ColumnHeading = styled.h4`
  margin: 0 0 50px 0;
  font-weight: bold;
`;

const Link = styled.a`
  display: block;
  margin: 5px 0;
  color: #707479;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

export default Untitled;
