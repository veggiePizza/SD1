import React, { useState } from "react";
import styled from "styled-components";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonShare1 from "../components/MaterialButtonShare1";
import MaterialChipWithCloseButton from "../components/MaterialChipWithCloseButton";
import GoogleMapReact from 'google-map-react';


import "./styles.css";

function Untitled(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDate, setIsStartDate] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleDateChange = (date) => {
    if (isStartDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const AnyReactComponent = ({ text }) => <div>{text}</div>;


  const renderCalendar = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const startDay = new Date(selectedYear, selectedMonth, 1).getDay(); // Get the starting day of the month
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    return (
      
      <CalendarContainer>
        <CalendarHeader>
          {daysOfWeek.map((day) => (
            <CalendarHeaderCell key={day}>{day}</CalendarHeaderCell>
          ))}
        </CalendarHeader>
        <CalendarGrid>
          {Array.from({ length: startDay }, (_, index) => (
            <CalendarDay key={`empty-${index}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, day) => {
            const date = new Date(selectedYear, selectedMonth, day + 1);
            return (
              <CalendarDay
                key={day}
                onClick={() => handleDateChange(date)}
                isSelected={isStartDate ? date.toDateString() === startDate?.toDateString() : date.toDateString() === endDate?.toDateString()}
              >
                {day + 1}
              </CalendarDay>
            );
          })}
        </CalendarGrid>
      </CalendarContainer>
    );
  };


  const cardData = [
    {
      id: 1,
      username: 'Junior',
      productName: 'Pioneer DDJ-SB3',
      price: '$25.00/Day',
      imageSrc: require('../assets/images/product_image_a.png'), // Replace with actual image path
    },
    {
      id: 2,
      username: 'Junior',
      productName: 'DJI Ronin RSC2 Pro',
      price: '$20.00/Day',
      imageSrc: require('../assets/images/product_image_b.png'), // Replace with actual image path
    },
    {
      id: 3,
      username: 'Junior',
      productName: 'SONY 160GB CEA-G SERIE…',
      price: '$15.00/Day',
      imageSrc: require('../assets/images/product_image_c.png'), // Replace with actual image path
    },
  ];

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
              borderStyle: "solid"
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
              borderStyle: "solid"
            }}
          />
        </Image2Row>
      </Content>

      <MainContent>
        <LeftContainer>
        <DateCard>
          <h2>Add Dates for Prices</h2>
          <ButtonContainer>
  <StyledButton onClick={() => setIsStartDate(true)} selected={isStartDate}>
    Start Date
  </StyledButton>
  <StyledButton onClick={() => setIsStartDate(false)} selected={!isStartDate}>
    End Date
  </StyledButton>
</ButtonContainer>

          
<SelectorContainer>
  <Rectangle /> {/* Left Rectangle */}
  <MonthSelect value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
    {Array.from({ length: 12 }, (_, i) => (
      <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
    ))}
  </MonthSelect>
  <YearSelect value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
    {Array.from({ length: 20 }, (_, i) => (
      <option key={i} value={2023 + i}>{2023 + i}</option>
    ))}
  </YearSelect>
  <Rectangle /> {/* Right Rectangle */}
</SelectorContainer>



          {renderCalendar()}
          </DateCard>

          
          <NoticeButtonContainer>
            <NoticeButton>Please select a valid date range</NoticeButton>
          </NoticeButtonContainer>
          
          <PoliciesCard>
            <CardTitle>Policies</CardTitle>
            <PolicyRow>
              <PolicyIcon src={require("../assets/images/policy_icon.png")} alt="Policy Icon" />
              <PolicyText>Cancellation Policy</PolicyText>
              <PolicyButton>View</PolicyButton>
            </PolicyRow>
          </PoliciesCard>
        </LeftContainer>

        <RightContainer>
              <Card1>
              <ImageContainer src={require('../assets/images/card_image.png')} alt="Card Image" />
              <Title>Sony 24-105mm F4 G OSS Lens</Title>
              <Category>Cameras & Photography &gt; Lenses & Filters</Category>
              <SharedByContainer>
                <ProfileImage src={require('../assets/images/profile_image.png')} alt="Profile" />
                <span>Shared by Junior</span>
              </SharedByContainer>
              <RatingContainer>
                <Stars>⭐⭐⭐⭐⭐</Stars>
                <span>(5)</span>
              </RatingContainer>
              <PriceContainer>
  <div>
    <span>From</span>
    <br />
    <PriceText>$30.00</PriceText>
    <AmountText>/ Day</AmountText>
  </div>
  <GuaranteeText>
    <strong>Renters Guarantee:</strong> Covered up to $1000
  </GuaranteeText>
</PriceContainer>


            </Card1>

            <Card2>
  <CardTitle2>Description</CardTitle2>
  <CardDescription2>
  The Sony FE 24-105mm f4 G OSS Lens is a wide-angle to short-telephoto zoom
designed for Sony's full-frame E-mount CSCs. The lens offers a versatile 24-105mm
focal range with constant f4.0 aperture, making it ideal for a host of applications
including landscapes, portraits and travel. Perfect for videos and stills, the Direct Drive
SSM motor ensures fast.
  </CardDescription2>
</Card2>

<Card3>
  <CardTitle3>Attributes</CardTitle3>
  <TextRow>
    <StrongText>Brand:</StrongText> Sony
  </TextRow>
  <TextRow>
    <StrongText>Compatible Brand:</StrongText> For Sony
  </TextRow>
</Card3>

<CardsContainer>
  <Card4>
    <ButtonRow4>
      <Button4>
        Message Sharer
        <ButtonIcon4 src={require("../assets/images/message.png")} alt="Message Icon" />
      </Button4>
      <Button4>
        View Profile
        <ButtonIcon4 src={require("../assets/images/blue_person.png")} alt="Profile Icon" />
      </Button4>
    </ButtonRow4>
    <Divider />
    <CardTitle4>Useful information</CardTitle4>
    <TextRow4>
      <StrongText>Renters Guarantee:</StrongText> Covered up to
      $1000
    </TextRow4>
    <TextRow4>
      <StrongText>Min Booking Period:</StrongText> 1 day
    </TextRow4>
    <TextRow4>
      <StrongText>Max Booking Period:</StrongText> None
    </TextRow4>
    <TextRow4>
      <StrongText>Cancellation Policy:</StrongText> Flexible
    </TextRow4>
  </Card4>

  {/* Card 5: Location */}
  <Card5>
    <CardTitle5>Location</CardTitle5>
    <div style={{ height: '450px', width: '450px', alignSelf: 'center' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={32.705002}
          lng={-97.122780}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
    <LocationName>Arlington, Texas</LocationName>
    <AdditionalInfo>Accurate location provided after successful booking</AdditionalInfo>
  </Card5>
</CardsContainer>

<ProfileContainer>
  <ProfileTitle>
    Other items by Junior (5)   <ReviewsText> <StrongText>| </StrongText>   Reviews (0)</ReviewsText>
  </ProfileTitle>
  <ProfileCardsContainer>
    {cardData.map(({ id, username, productName, price, imageSrc }) => (
      <ItemCard key={id}>
        <ItemContent>
          <ProfileImage src={require('../assets/images/profile_image.png')} alt="Profile" />
          <Username>{username}</Username>
        </ItemContent>
        <ProductImage src={imageSrc} alt={productName} />
        <ProductName>{productName}</ProductName>
        <ProductPriceText>{price}</ProductPriceText>
      </ItemCard>
    ))}
  </ProfileCardsContainer>
  <BottomButton>View All</BottomButton> 
</ProfileContainer>

        </RightContainer>
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
          <ImageButtonQR src={require('../assets/images/qr_code.png')} alt="QR Code" />
        </Column>
      </FooterContainer>
      <IconsContainer>
  {Array.from({ length: 4 }, (_, index) => (
    <Icon key={index} src={require(`../assets/images/icon${index + 1}.png`)} alt={`Icon ${index + 1}`} />
  ))}
</IconsContainer>

<VerticalButtonContainer>
  <VerticalButton>Provide feedback</VerticalButton>
</VerticalButtonContainer>


    </Container>
    
  );
}

const BottomButton = styled.button`
  background-color: #0B4575; /* Button color */
  color: white; /* Text color */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  padding: 10px 20px; /* Padding for the button */
  cursor: pointer; /* Pointer cursor on hover */
  margin: 20px auto; /* Center the button and add space above and below */
  display: block; /* Make the button a block element */
  font-weight: bold;

  
  &:hover {
    background-color: #0A3E66; /* Darker color on hover */
  }
`;


const VerticalButtonContainer = styled.div`
  position: fixed; /* Fixes the button in place */
  top: 20px; /* Distance from the top */
  right: 0px; /* Distance from the right */
  z-index: 1000; /* Ensure it is above other elements */

`;

const VerticalButton = styled.button`
  background-color: #0B4575; /* Button color */
  color: white; /* Text color */
  border-radius: 5px 0px 0px 5px;
  padding: 10px 15px; /* Padding for the button */
  cursor: pointer; /* Pointer cursor on hover */
  writing-mode: vertical-rl; /* Make the text vertical */
  text-align: center; /* Center text */
  transform: rotate(0deg); /* Rotate the button to face upwards */
  border: 2px solid #FFFFFF;
      font-weight: 800;
box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -4px 4px 8px rgba(0, 0, 0, 0.2); 
  
  &:hover {
    background-color: #0A3E66; /* Darker color on hover */
  }
`;


const ProfileContainer = styled.div`
  width: 100%; /* Full width for the profile section */
  padding: 20px;
  margin-top: 20px; /* Space above the profile section */
`;
const ProfileTitle = styled.h3`
 color: #0B4575;
  display: flex;
  align-items: center; /* Center items vertically */
  margin-bottom: 10px; /* Reduced space below the title */
`;

const ReviewsText = styled.span`
  color: #525F7F; /* Color for reviews text */
  font-weight: 200; /* Make it bold */
  margin-left: 10px;
`;


const ProfileCardsContainer = styled.div`
  display: flex;
  flex-direction: row; /* Stack cards vertically */
  gap: 20px; /* Space between cards */
  margin-top: 48px;
`;

const ItemCard = styled.div`
width:30%;
  background-color: #FFFFFF;
  border: none;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center; /* Align items vertically */
  margin-bottom: 10px; /* Space below profile image */
`;

const Username = styled.span`
  margin-left: 10px; /* Space between image and username */
  font-weight: bold; /* Make username bold */
`;

const ProductImage = styled.img`
  width: 100%; /* Full width for product image */
  height: auto; /* Maintain aspect ratio */
  border-radius: 4px; /* Slightly rounded corners */
`;

const ProductName = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0; /* Space above and below product name */
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Space between cards */
  align-items: flex-start; /* Align cards to the top */
  margin: 20px 0; /* Margin around the container */
`;

const Card4 = styled.div`
    height: 547px;
  width: 60%; /* Adjust width as needed */
  background-color: #FFFFFF;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ButtonRow4 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Button4 = styled.button`
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  color: #0B4575;
  border: 2px solid #0B4575;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;

  img {
    margin-left: 5px; /* Space between text and icon */
  }
`;

const ButtonIcon4 = styled.img`
  width: 16px;
  height: 16px;
`;

const Divider = styled.hr`
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  margin: 40px 0;
`;

const CardTitle4 = styled.h3`
font-size: 26px;
  margin: 20px 0;
  font-weight: 600;
`;

const TextRow4 = styled.div`
  margin: 15px 0;
  font-size: 18px;
  padding-left: 12px;
`;


const Card5 = styled.div`
  width: 600px; /* Adjust width as needed */
  background-color: #FFFFFF;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
margin: 0 0 0 50px; 
`;

const CardTitle5 = styled.h3`
  margin: 10px 0;
`;

const LocationName = styled.p`
  margin: 5px 0;
  font-weight: bold; /* Highlight location name */
`;

const AdditionalInfo = styled.p`
  color: #757575; /* Grey color for additional info */
  margin: 5px 0;
`;

const CardTitle2 = styled.h3`
  margin: 0 0 10px 0; /* Space below the title */
  font-size: 20px; /* Adjust font size as needed */
`;

const CardTitle3 = styled.h3`
  margin: 0 0 10px 0; /* Space below the title */
  font-size: 20px; /* Adjust font size as needed */
`;


const CardDescription2 = styled.p`
margin-top: 20px;
  color: #757575; /* Grey color for description */
  font-size: 16px; /* Adjust font size as needed */
  font-weight: 200;

`;


const Card1 = styled.div`
  width: 100%; /* Full width for the first card */
  background-color: #fff;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Card2 = styled.div`
  width: 100%; /* Full width for the first card */
  background-color: #fff;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Card3 = styled.div`
  width: 100%; /* Full width for the first card */
  background-color: #fff;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TextRow = styled.p`
  margin: 5px 0; /* Space between text rows */
`;

const StrongText = styled.span`
  font-weight: bold; /* Make the text bold */
`;


const ImageContainer = styled.img`
  width: 100%; /* Full width */
  height: auto; /* Maintain aspect ratio */
  border-radius: 4px 4px 0 0; /* Rounded top corners */
`;

const Title = styled.h3`
  margin: 10px 0;
  font-size: 36px;
`;


const Category = styled.p`
font-weight: 200;
  color: #626262; /* Grey color for category text */
`;

const SharedByContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-weight: 700;
`;

const ProfileImage = styled.img`
  width: 30px; /* Adjust size as needed */
  height: 30px; /* Adjust size as needed */
  border-radius: 50%; /* Circular profile image */
  border: 2px solid #E8E8E8; /* Border for the profile image */
  margin-right: 10px; /* Space between image and text */
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Stars = styled.span`
  color: gold; /* Color for stars */
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Space between price section and guarantee */
  align-items: flex-start; /* Align items to the start */
  margin: 10px 0;
`;

const GuaranteeText = styled.span`
  align-self: self-end;
  text-align: right; /* Align guarantee text to the right */
`;


const ProductPriceText = styled.span`
color: #000000;
  font-weight: bold; /* Make the price bold */
  margin-right: 5px; /* Space between price and /Day */
  font-size: 14px;
`;

const PriceText = styled.span`
color: #0B4575;
  font-weight: bold; /* Make the price bold */
  margin-right: 5px; /* Space between price and /Day */
  font-size: 36px;
`;
const AmountText = styled.span`
  color: #757575; /* Grey color for amount */
`;

const Rectangle = styled.div`
  width: 50px; /* Adjust width as needed */
  height: 50px; /* Adjust height as needed */
  background-color: #EFF2F7; /* Color of the rectangles */
  border-radius:15px; /* Rounded corners */
  margin: 0 10px; /* Space between the rectangles and the select boxes */
`;


const DateCard = styled.div`
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
  background-color: #fff; /* White background for the card */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
`;


const MainContent = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const LeftContainer = styled.div`
  width: 30%; /* Take 25% of the width */
  padding: 20px;
  border-right: 1px solid #E8E8E8;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  background-color: #EFF2F7;
`;
const StyledButton = styled.button`
  margin: 10px 10px; /* Space between buttons */
  padding: 10px 20px;
  background-color: #FFFFFF;
  color: #757575;
  border: ${(props) => (props.selected ? '2px solid #0B4575' : 'none')}; /* Border for selected state */
  border-radius: 4px;
  cursor: pointer;
  width: 40%;
  transition: border 0.3s; /* Smooth transition for border change */
`;


const SelectorContainer = styled.div`
  display: flex;
  align-items: center; /* Center the items vertically */
  justify-content: space-between; /* Space items evenly */
  margin: 10px 0;
  position: relative; /* Needed for the rectangles to align properly */
`;


const MonthSelect = styled.select`
  margin-right: 10px;
  padding: 10px;
  border: none;
    color: #3E484F;
`;

const YearSelect = styled.select`
  padding: 10px;
    border: none;
      color: #3E484F;

`;

const NoticeButtonContainer = styled.div`
  position: relative;
    margin: 10px 0px;
      display: flex;
  justify-content: center;
    background-color: #FFFFFF;
      border: 1px solid #EDEEEE;
  border-radius: 4px;
`;

const NoticeButton = styled.button`
  padding: 20px 10px;
 background-color: rgba(8, 45, 76, 0.65);
   color: #FFFFFF;
  border: none;
  border-radius: 4px;
  width: 100%;
  margin: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const PoliciesCard = styled.div`
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 20px 20px;
  margin-top: 20px;
`;

const CardTitle = styled.h3`
  margin: 0;
`;

const PolicyRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
`;

const PolicyIcon = styled.img`
  width: 25px;
  height: 30px;
  margin-right: 20px;
`;

const PolicyText = styled.p`
  margin: 0;
  flex-grow: 1; /* Take up remaining space */
  font-weight: bold;
`;

const PolicyButton = styled.button`
  background-color: #FFFFFF;
  color: #0B4575;
  border: 2px solid #0B4575;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;

const RightContainer = styled.div`
  width: 75%; /* Take the remaining width */
  padding: 20px;
  display: flex;
  flex-wrap: wrap; /* Allow cards to wrap */
  gap: 20px; /* Space between cards */
`;



const CalendarContainer = styled.div`
  margin: 20px 0; /* Margin above and below the calendar */
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 columns for the days of the week */
`;

const CalendarHeaderCell = styled.div`
  text-align: center;
  font-weight: normal;
  padding: 10px 0;
  color: #849095;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 columns for the days of the week */
  gap: 5px; /* Space between days */
`;

const CalendarDay = styled.div`
  padding: 15px;
  background-color: ${(props) => (props.isSelected ? "#3D91FF" : "#FFFFFF")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #F8F8F8;
  }
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

export default Untitled;
