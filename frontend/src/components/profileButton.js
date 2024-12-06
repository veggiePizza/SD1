import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../store/firebase';
import OpenModalMenuItem from './Navigation/OpenModalMenuItem';
import SignupFormModal from './SignupFormModal';
import FirebaseLogin from './Session/loginPopUp'
import FeatherIcon from "react-native-vector-icons/dist/Feather";
import styled, { css } from "styled-components";

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);//needs to be false and to update correctly
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) setShowMenu(false);
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(true);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="userMenu" onClick={openMenu}>

        <Container>
          <FeatherIcon
            name="menu"
            style={{
              color: "rgba(0,0,0,1)",
              fontSize: 24
            }}

          >
          </FeatherIcon>
        </Container>

      </button>
      <ul className={ulClassName} ref={ulRef}>

        {showMenu && (
          <>
            {user ? (
              <div className="menuList2">

                <img className="profilePicture" src={`${user.photo}`}></img>
                <li>Hello {user.firstName}</li>
                <li className="seperator">
                  <NavLink exact to="/tools/current">
                    <button className="manageTools">Manage Tools</button>
                  </NavLink>
                </li>
                <li>
                  <button className="logoutButton" onClick={logout}>Log Out</button>
                </li>
              </div>
            ) : (
              <div className="menuList">
            
                <NavLink
                  to="/AuthPage" 
                  onClick={closeMenu}
                  onItemClick={closeMenu}
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/AuthPage" 
                  onClick={closeMenu}
                  onItemClick={closeMenu}
                >
                  Sign up
                </NavLink>
              </div>)}
          </>
        )}
      </ul>
    </>
  );
}

const Container = styled.div`
  height: 41px;
  width: 110px;
  background-color: rgba(11,69,117,1);
  margin-left: 60px;
  margin-top: 36px;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProfileButton;