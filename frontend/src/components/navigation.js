import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './profileButton';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <>
      <img className = 'logo' src={`/api/images/lendit.png`}></img>
      <div className ='nav'>
        {isLoaded && (<ProfileButton classsName="menuButton" user={sessionUser} />)}
      </div>
    </>
  );
}

export default Navigation;

