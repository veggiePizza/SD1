import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './profileButton';
import './navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav'>
      <div>
        <NavLink exact to="/"><img className="nav-logo" src={`/api/images/lendit.png`}></img></NavLink>
      </div>
      <div>
        {sessionUser && <><NavLink className="create-tool-link" exact to="/tools/new">Start Lending!</NavLink></>}
        {isLoaded && (<>
          <ProfileButton user={sessionUser} />
        </>)}
      </div>
    </div>
  );
}

export default Navigation;

