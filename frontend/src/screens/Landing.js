import React from "react";
import styled from "styled-components";
import MaterialButtonShare from "../components/MaterialButtonShare";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonShare1 from "../components/MaterialButtonShare1";
import MaterialChipWithCloseButton from "../components/MaterialChipWithCloseButton";
import Carousel from "./Carousel/Carousel";
import uuidv4 from "uuid";
import ProfileButton from '../components/profileButton'
import { useSelector } from 'react-redux';
import "./styles.css";


function Untitled({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);


  const cardData = [
    { title: "Tools", image: require("../assets/images/card1.png") },
    { title: "Sporting", image: require("../assets/images/card2.png") },
    { title: "Photo/Video", image: require("../assets/images/card3.png") },
    { title: "Outdoors", image: require("../assets/images/card4.png") },
    { title: "Instruments", image: require("../assets/images/card5.png") },
    { title: "Events", image: require("../assets/images/card6.png") },
    { title: "Electronics", image: require("../assets/images/card7.png") },
    { title: "Appliances", image: require("../assets/images/card8.png") },
  ];

  const slides = [
    {
      key: uuidv4(),
      content: (
        <div
          className="slide"
          style={{ backgroundImage: `url(${require("../assets/images/cara1.png")})` }}
        >
          Why would you buy, when you can rent!
        </div>
      )
    },
    {
      key: uuidv4(),
      content: (
        <div
          className="slide"
          style={{ backgroundImage: `url(${require("../assets/images/cara2.png")})` }}
        >
        </div>
      )
    },
    {
      key: uuidv4(),
      content: (
        <div
          className="slide"
          style={{ backgroundImage: `url(${require("../assets/images/cara3.png")})` }}
        >
        </div>
      )
    },
    {
      key: uuidv4(),
      content: (
        <div
          className="slide"
          style={{ backgroundImage: `url(${require("../assets/images/cara4.png")})` }}
        >
        </div>
      )
    },
    {
      key: uuidv4(),
      content: (
        <div
          className="slide"
          style={{ backgroundImage: `url(${require("../assets/images/cara5.png")})` }}
        >
        </div>
      )
    }

  ];





  return (
    <Container>
      <BackgroundImage
        src={require("../assets/images/redd-f-nTXOmJL97MY-unsplash_1.png")}
        alt="Background"
      />
      <Content>
        <Image2Row>
          
        </Image2Row>
        <LoremIpsum>RENT WHAT YOU NEED. <br />LEND WHAT YOU HAVE.</LoremIpsum>

        {/* Original Image3Row, unchanged */}
        <Image3Row>
          <Image3
            src={require("../assets/images/play_store_button.png")}
            alt="Google Play"
          />
          <Image4
            src={require("../assets/images/app_store_button.png")}
            alt="App Store"
          />
        </Image3Row>
      </Content>

      {/* New Section Below the Background Content */}
      <NewSection>
        <CategorySection>
          <Title>CATEGORIES</Title>
          <ButtonRow>
            <CircularButton>◄</CircularButton>
            <CircularButton>►</CircularButton>
            <SeeAllButton>See All</SeeAllButton>
          </ButtonRow>
        </CategorySection>

        {/* Scrollable Cards Section, placed below the entire background section */}
        <CardContainer>
          {cardData.map((item, index) => (
            <Card key={index}>
              <CardImage src={item.image} alt={item.title} />
              <CardText>{item.title}</CardText>
            </Card>
          ))}
        </CardContainer>

      </NewSection>

      <InspirationSection>
        <InspirationTitle>Some Inspiration</InspirationTitle>
        <InspirationContainer>
          <InspirationItem>
            <InspirationImage src={require("../assets/images/inspiration1.png")} alt="Inspiration 1" />
            <InspirationText>Discover skills</InspirationText>
          </InspirationItem>
          <InspirationItem>
            <InspirationImage src={require("../assets/images/inspiration2.png")} alt="Inspiration 2" />
            <InspirationText>New adventures</InspirationText>
          </InspirationItem>
        </InspirationContainer>
        <InspirationContainer>
          <InspirationItem>
            <InspirationImage src={require("../assets/images/inspiration3.png")} alt="Inspiration 3" />
            <InspirationText>Bring some joy</InspirationText>
          </InspirationItem>
          <InspirationItem>
            <InspirationImage src={require("../assets/images/inspiration4.png")} alt="Inspiration 4" />
            <InspirationText>DIY</InspirationText>
          </InspirationItem>
        </InspirationContainer>
      </InspirationSection>

      <InviteSection>
        <InviteBackgroundImage
          src={require("../assets/images/invite.png")}
          alt="Invite Background"
        />
        <InviteContent>
          <InviteTitle>Get 10% off</InviteTitle>
          <InviteSubtitle>Invite your friends and save money on your next rental.</InviteSubtitle>
          <InviteButton>Invite Friends</InviteButton>
        </InviteContent>
      </InviteSection>

      <Carousel slides={slides} />


      <InviteSection2>
        <InviteBackgroundImage2
          src={require("../assets/images/invite2.png")}
          alt="Invite2 Background"
        />
        <InviteContent2>
          <InviteTitle2>You and your friends can earn today!</InviteTitle2>
          <InviteButton2>Learn More</InviteButton2>
        </InviteContent2>
      </InviteSection2>

      <InviteSection3>
        <InviteBackgroundImage3
          src={require("../assets/images/banner1.png")}
          alt="Invite3 Background"
        />
      </InviteSection3>

      <TitleContainer>
        <TitleRow>
          <TitleCont1>EARN MONEY</TitleCont1>
          <TitleCont2>SAVE MONEY</TitleCont2>
        </TitleRow>
        <Underlines>
          <BlueUnderline />
          <GreyUnderline />
        </Underlines>
      </TitleContainer>
      <ContentContainer>
        <LeftContent>
          <LeftTitle>
            Start listing and earn money with <LeftTitleBlue>Lend It!!</LeftTitleBlue>
          </LeftTitle>
          <LeftTitle2>Earn extra cash by sharing what you own</LeftTitle2>
        </LeftContent>
        <RightImage src={require('../assets/images/lawnmover.png')} alt="Description" />
      </ContentContainer>

      <MapSection>
        <MapBackgroundImage src={require('../assets/images/map-background.png')} alt="Map Background" />
        <MapContentWrapper>
          <MapTitleContainer>
            <MapTitle>Get it in the iOS
              App Store or on
              Google Play
              today!
            </MapTitle>
          </MapTitleContainer>
          <MapButtonContainer>
            <MapImageButton src={require('../assets/images/app_store_button.png')} alt="App Store" />
            <MapImageButton src={require('../assets/images/play_store_button.png')} alt="Play Store" />
          </MapButtonContainer>
        </MapContentWrapper>
      </MapSection>

      <FeaturesSection>
        <FeatureTitle>WHY LENDIT?</FeatureTitle>
        <FeatureText>Unlock the power of your community! Rent and book services effortlessly in one app. With secure payments and your transactions are
          safe and your items are protected!</FeatureText>

        <FeatureContainer>
          <FeatureCard>
            <FeatureImage src={require('../assets/images/feature1.png')} alt="Feature 1" />
            <FeatureCardTitle>Economical</FeatureCardTitle>
            <FeatureCardText>Monetize what you already own! Make money from unused items and save on things you rarely need.</FeatureCardText>
          </FeatureCard>

          <FeatureCard>
            <FeatureImage src={require('../assets/images/feature2.png')} alt="Feature 2" />
            <FeatureCardTitle>Safe</FeatureCardTitle>
            <FeatureCardText>ID verification and privacy
              safeguards help to make
              Lending and borrowing safe for
              both parties.</FeatureCardText>
          </FeatureCard>

          <FeatureCard>
            <FeatureImage src={require('../assets/images/feature3.png')} alt="Feature 3" />
            <FeatureCardTitle>Secure</FeatureCardTitle>
            <FeatureCardText>Best in class payment
              processing by Stripe keeps your
              financial details secure.</FeatureCardText>
          </FeatureCard>
        </FeatureContainer>
      </FeaturesSection>

      <NewsletterSection>
        <NewsBackgroundImage src={require('../assets/images/newsletterbackground.png')} alt="News Background" />
        <NewsletterContent>
          <NewsletterHeading>Sign up for news, updates and promotions</NewsletterHeading>
          <NewsletterInputContainer>
            <NewsletterInputField type="text" placeholder="Your email" />
            <NewsletterSubmitButton>Submit</NewsletterSubmitButton>
          </NewsletterInputContainer>
        </NewsletterContent>
      </NewsletterSection>

      <FooterContainer>
        <Column>
          <ColumnHeading>COMPANY</ColumnHeading>
          <Link>About</Link>
          <Link>Jobs</Link>
          <Link>Our Guarantee</Link>
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
          <Link>Cookies preferences</Link>
        </Column>
        <Column>
          <ImageButton src={require('../assets/images/play_store_button.png')} alt="Play Store Button" />
          <ImageButton src={require('../assets/images/app_store_button.png')} alt="App Store Button" />
        </Column>
      </FooterContainer>


    </Container>
  );
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
padding: 150px 50px 100px 250px;
  background-color: #f1f1f1; /* Light gray background */
`;

const Column = styled.div`
  flex: 1; /* Equal width for each column */
  padding: 10px;
`;

const ColumnHeading = styled.h4`
  margin: 0 0 50px 0; /* Heading margin */
  font-weight: bold; /* Bold headings */
`;

const Link = styled.a`
  display: block; /* Block links for vertical stacking */
  margin: 5px 0; /* Space between links */
  color: #707479; /* Link color */
  text-decoration: none; /* Remove underline */
  
  &:hover {
    text-decoration: underline; /* Underline on hover */
  }
`;

const ImageButton = styled.img`
  width: 100px; /* Adjust size as needed */
  height: 35px; /* Adjust size as needed */
  margin-right: 10px; /* Space between buttons */
  cursor: pointer; /* Pointer cursor on hover */
`;

const NewsletterSection = styled.div`
  position: relative;
  height: 600px; /* Adjust height as needed */
  display: flex;
  align-items: center; /* Center align vertically */
  justify-content: center; /* Center horizontally */
  overflow: hidden; /* Hide overflow to maintain layout */
`;

const NewsBackgroundImage = styled.img`
  position: absolute; /* Position the background image */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  object-fit: fit; /* Cover the entire section */
  z-index: 1; /* Send to the back */
`;

const NewsletterContent = styled.div`
  position: relative; /* To stack above the background */
  z-index: 2; /* Bring content above background */
  text-align: center; /* Center align text */
  color: white; /* Text color */
`;

const NewsletterHeading = styled.h2`
  font-size: 36px; /* Adjust font size as needed */
  margin-bottom: 20px; /* Space between heading and input */
`;

const NewsletterInputContainer = styled.div`
  display: flex; /* Align input and button in a row */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  margin: 0 auto; /* Center the container */
`;

const NewsletterInputField = styled.input`
  padding: 10px;
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  margin-right: 10px; /* Space between input and button */
  width: 400px;
  height: 40px;
`;

const NewsletterSubmitButton = styled.button`
  padding: 10px 20px;
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
 background-color: rgba(255, 255, 255, 0.6); /* Button color */
  color: white; /* Text color */
  font-weight: 700;
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s; /* Smooth background change */

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const FeaturesSection = styled.div`
margin-top: 200px;
  padding: 50px 100px; /* Add padding around the section */
`;

const FeatureTitle = styled.h2`
  margin: 0; /* Remove default margin */
  color: #000; /* Title color */
  font-size: 36px; /* Title font size */
  text-align: left; /* Align text to the left */
`;

const FeatureText = styled.p`
  color: #333; /* Text color */
  font-size: 18px; /* Text font size */
  margin-top: 50px; /* Space above the text */
  margin-bottom: 80px; /* Space below the text */
  font-weight: 200;
`;

const FeatureContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Distribute space evenly */
  margin-top: 30px; /* Space above the feature rectangles */
`;

const FeatureCard = styled.div`
  background-color: #fff; /* Background color for the rectangle */
  border-radius: 10px; /* Rounded corners */
  padding: 50px 20px; /* Padding inside the rectangle */
  width: 25%; /* Width of each rectangle */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: flex-start; /* Align items to the left */
`;

const FeatureImage = styled.img`
  width: 40px; /* Adjust size as needed */
  height: 40px; /* Adjust size as needed */
  object-fit: fit; /* Ensure the image covers the area */
  margin-bottom: 10px; /* Space below the image */
`;

const FeatureCardTitle = styled.h3`
  font-size: 24px; /* Title font size */
  margin-top: 18px
`;

const FeatureCardText = styled.p`
  color: #666; /* Text color */
  font-size: 16px; /* Text font size */
  margin-top: 18px; /* Space above the text */
  font-weight: 200;
`;

const MapSection = styled.div`
  position: relative;
  width: 100%;
  height: 1000px; /* Adjust height as needed */
  overflow: hidden;
  margin-top: 100px;
`;

const MapBackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fit;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0; /* Send it to the back */
`;

const MapContentWrapper = styled.div`
  position: relative;
  z-index: 1; /* Bring content in front of the background */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 50px; /* Space inside the content */
  background-color: #038DE2;
  width: 40%;
  margin-top: 20%;
  margin-left: 5%;
    border-radius: 30px;
`;

const MapTitleContainer = styled.div`
  padding: 10px 0px; /* Padding for the rectangle */
  margin-bottom: 20px; /* Space below the title */
`;

const MapTitle = styled.h2`
  margin: 0; /* Remove default margin */
  color: #000; /* Title color */
  width: 350px;
  font-size: 42px;
  color: #FFFFFF;
`;

const MapButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Space between buttons */
`;

const MapImageButton = styled.img`
  width: 150px; /* Adjust size as needed */
  height: 50px; /* Adjust size as needed */
  cursor: pointer; /* Change cursor on hover */
`;


const Container = styled.div`
  position: relative; 
  width: 100vw; 
  overflow: hidden; 
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%;
  height: 889px; /* Fixed height for background */
  object-fit: cover; 
  z-index: 0; 
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px; /* Added padding for separation */
`;

const Image2 = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
`;

const Image2Row = styled.div`
  height: 200px;
  flex-direction: row;
  display: flex;
  margin-top: 11px;
  margin-left: 60px;
  margin-right: 109px;
`;

const LoremIpsum = styled.span`
  font-family: "Rhodium Libre", serif;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 43px;
  line-height: 43px;
  margin-top: 182px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
      margin-left: -500px;

`;

const NewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px; /* Space above the new section */
  z-index: 1; /* Ensure it's above the background */
`;

const CategorySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%; /* Adjust as needed */
margin: 250px auto 50px;
`;

const Title = styled.h2`
  font-family: Roboto;
  font-weight: 700;
  color: #000000;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
`;

const CircularButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border: 2px solid #E8E8E8;
  color: #038DE2;
`;

const SeeAllButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
    border: 2px solid #E8E8E8;
  color: #038DE2;
`;

const CardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 48px 0; /* Space above and below the cards */
  width: 90%; /* Adjust as needed */
  margin: 0 auto; /* Center the card container */
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 38px;
`;

const CardImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 50%;
  background-color: #F7F7F7;
`;

const CardText = styled.span`
  font-family: "Rhodium Libre", serif;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-top: 5px;
`;

const Image3 = styled.img`
  width: 100%;
  height: 60px;
  object-fit: contain;
`;

const Image4 = styled.img`
  width: 100%;
  height: 60px;
  margin-left: 17px;
  object-fit: contain;
`;

const Image3Row = styled.div`
  height: 60px;
  flex-direction: row;
  display: flex;
  margin-top: 114px;
  margin-left: 746px;
  margin-right: 203px;
`;

const InspirationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px; /* Space above the section */
  width: 100%; /* Adjust as needed */
`;

const InspirationTitle = styled.h3`
  font-family: Roboto;
  font-weight: 700;
  color: #000;
  margin-bottom: 48px; /* Space below title */
    align-self: baseline;
    margin-left: 6%;
    font-size: 24px;

`;

const InspirationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; /* Full width for the container */
  margin-bottom: 20px; /* Space between the rows */
`;

const InspirationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InspirationImage = styled.img`
  width: 650px; /* Square size */
  height: 650px; /* Square size */
  object-fit: cover; /* Cover the area */
  background-color: #F7F7F7; /* Background color */
`;

const InspirationText = styled.span`
  font-family: Roboto;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-top: 5px;
    align-self: baseline;
    font-size: 22px;

`;

const InviteSection = styled.div`
  position: relative;
  height: 500px;
  margin: 50px 200px;
  overflow: hidden;
  border: 2px solid rgba(232, 232, 232, 0.5);
`;

const InviteBackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const InviteContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  color: white;
`;

const InviteTitle = styled.h2`
  font-family: Roboto;
  font-weight: 800;
  font-size: 48px;
  margin: 0;
`;

const InviteSubtitle = styled.h3`
  font-family: Roboto;
  font-weight: 500;
  font-size: 28px;
  margin: 5px 0 20px 0;
  width: 450px;
`;

const InviteButton = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  background-color: #010101;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #000000;
  }
`;

const InviteSection2 = styled.div`
  position: relative;
  height: 500px;
  margin: 50px 200px;
  overflow: hidden;
  border-radius: 20px;
`;

const InviteBackgroundImage2 = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
  z-index: 0;
`;

const InviteContent2 = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  color: white;
`;

const InviteTitle2 = styled.h2`
  font-family: Roboto;
  font-weight: 700;
  font-size: 46px;
  margin:  50px 100px;
  width: 500px;
`;


const InviteButton2 = styled.button`
  padding: 20px 40px;
  border-radius: 50px;
  border: none;
  background-color: #038DE2;
  color: white;
  cursor: pointer;
  font-size: 16px;
  align-self: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #038DE2;
  }
`;

const InviteSection3 = styled.div`
  position: relative;
  height: 600px;
  margin: 20px 100px;
  overflow: hidden;
`;

const InviteBackgroundImage3 = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
  z-index: 0;
`;

const TitleContainer = styled.div`
  display: flex; /* Align titles side by side */
  flex-direction: column; /* Stack titles vertically */
  align-items: flex-start; /* Align titles to the start */
  position: relative; /* Position relative for underlines */
margin: 200px 100px 0;`;

const TitleRow = styled.div`
  display: flex; /* Use flex to align titles side by side */
  width: 100%; /* Full width for the row */
`;

const TitleCont1 = styled.h2`
font-weight: 500;
  margin: 0;
  color: #038DE2;
  margin-right: 20px; /* Space between titles */
      font-size: 20px;

`;


const TitleCont2 = styled.h2`
font-weight: 500;
  margin: 0;
  color: #707479;
  margin-right: 20px; /* Space between titles */
      font-size: 20px;

`;



const Underlines = styled.div`
  position: relative;
  width: 100%; /* Full width for underlines */
  margin-top: 8px; /* Space above the underlines */
`;

const BlueUnderline = styled.div`
  height: 4px;
  background-color: #038DE2; /* Blue color */
  width: 130px; /* Adjust width as necessary */
  position: absolute;
  top: 100%; /* Place below the titles */
  left: 0; /* Align with the first title */
`;

const GreyUnderline = styled.div`
  height: 1px;
  background-color: #707479; /* Grey color */
  width: 40%; /* Full width */
  margin-top: 4px; /* Space between blue and grey underline */
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: 20px; /* Space below the titles */
  height: 400px; /* Adjust height as necessary */
    margin: 0 50px;

`;

const LeftTitle = styled.h3`
width: 500px;
    font-size: 44px;
margin-top: 50px;
  margin-bottom: 10px; /* Adjust this value to reduce space below the title */
`;

const LeftTitle2 = styled.h3`
color: #707479;
    font-size: 24px;
font-weight: 200;
  margin-bottom: 10px; /* Adjust this value to reduce space below the title */
`;

const LeftTitleBlue = styled.span`
  color: #038DE2; /* Change this to your desired blue color */
  font-weight: bold; /* Optional: make it bold */
`;

const LeftContent = styled.div`
 margin: 50px 100px 0;
   display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute space between titles */
  flex: 1;
  height: fit-content;

`;


const RightImage = styled.img`
  flex: 1; /* Take full height */
  object-fit: cover; /* Cover the area */
  height: 100%; /* Full height */
  border-top-right-radius: 20px; /* Rounded border on top right */
`;



export default Untitled;
