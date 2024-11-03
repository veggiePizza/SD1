import React from "react";
import styled from "styled-components";

const AuthPage = () => {
  return (
    <Container>
      <ImageSection   backgroundImage={require("../assets/images/left_half.png")} />
      <FormSection>
        <GoBackButton>&lt;  Go back</GoBackButton>
        <Logo src={require("../assets/images/NewLenditLogo_1.png")} alt="Logo" />
        <WelcomeText>Welcome</WelcomeText>
        <AuthTitle>Sign Up or Log In</AuthTitle>
        <Label><Asterisk>*</Asterisk> Enter email</Label>
        <Input type="email" placeholder="Email address" />
        <ContinueButton>Continue</ContinueButton>
        <OrDivider>- OR -</OrDivider>
        <ButtonContainer>
          <CircularButton src={require("../assets/images/fb_button.png")} alt="Facebook" />
          <CircularButton src={require("../assets/images/google_button.png")} alt="Google" />
          <CircularButton src={require("../assets/images/apple_button.png")} alt="Apple" />
        </ButtonContainer>
        <TermsText>
          By signing in, you agree to our{" "}
          <TermsLink href="/terms">Terms</TermsLink> and{" "}
          <EULALink href="/eula">End User License Agreement (EULA)</EULALink>.
        </TermsText>
      </FormSection>
    </Container>
  );
};

const Asterisk = styled.span`
  color: #038DE2; /* Change this to your desired color */
  margin-right: 4px; /* Optional: adds some space after the asterisk */
`;

const Container = styled.div`
  display: flex;
  height: 100vh; /* Full viewport height */
`;

const ImageSection = styled.div`
  width: 30%; /* Set to 50% of the container's width */
  height: auto; /* Allow height to adjust automatically */
  background-image: url(${(props) => props.backgroundImage});
  background-size: contain; /* Ensures the image fits within the area */
  background-position: start; /* Centers the image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  aspect-ratio: auto; /* Maintains aspect ratio */
  position: relative; /* Position relative for inner content */
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white; /* Or any color */
`;

const GoBackButton = styled.button`
  align-self: flex-start; /* Align to top left */
  background: none;
  border: none;
  color: #0b4575; /* Change to your color */
  cursor: pointer;
  font-weight: 600;
`;

const Logo = styled.img`
  width: 150px; /* Adjust as needed */
  margin: 20px 0;
`;

const WelcomeText = styled.h3`
font-weight: 300;
 color: #999999; 
 font-size: 24px;
  margin: 10px 0;
`;

const AuthTitle = styled.h3`
  font-weight: 400;
 color: #1D2024; 
 font-size: 24px;
  margin: 5px 0;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 80%; /* Adjust as needed */
  height: 30px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ContinueButton = styled.button`
width: 82%;
  height: 50px;

  background-color: #0b4575;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin: 10px 0;
`;

const OrDivider = styled.div`
 color: #999999; 
  margin: 20px 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px; /* Space between buttons */
`;

const CircularButton = styled.img`
  width: 50px; /* Size of the circular button */
  height: 50px;
  border-radius: 50%; /* Makes it circular */
  object-fit: cover;
`;

const TermsText = styled.p`
  text-align: center;
  margin-top: 80px;
  font-size: 0.9em; /* Smaller text */
`;

const TermsLink = styled.a`
  color: #038DE2;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const EULALink = styled.a`
  color: #038DE2;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

export default AuthPage;
