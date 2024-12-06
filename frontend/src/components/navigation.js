import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './profileButton';
import styled from "styled-components";
import './navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav'>
      <div>
        <NavLink exact to="/">
          <LogoImage src={require("../assets/images/NewLenditLogo_11.png")} alt="Logo" />
        </NavLink>
      </div>
      <div>
        <Container>
          <StartListing>Start Listing
            {sessionUser && (
              <NavLink className="create-tool-link" exact to="/tools/new">
                .
              </NavLink>
            )}
          </StartListing>
        </Container>
        {isLoaded && (
          <>
            <ProfileButton user={sessionUser} />
          </>
        )}
      </div>
    </div>
  );
}

const LogoImage = styled.img`
  width: 100%;  /* Adjust the width to make the logo smaller */
  height: 100%;  /* Maintain aspect ratio */
`;

const Container = styled.div`
  display: flex;
  background-color: rgba(11, 69, 117, 1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 50px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px 0.35px #000;
  height: 44px;
  width: 130px;
  margin-left: 30px;
  margin-top: 41px;
`;

const StartListing = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
  margin: 0px;
  padding: 0px;
`;

export default Navigation;
