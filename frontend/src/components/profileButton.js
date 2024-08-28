import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../store/firebase';
import OpenModalMenuItem from './Navigation/OpenModalMenuItem';
import SignupFormModal from './SignupFormModal';
import FirebaseLogin from './Session/loginPopUp'

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(true);//needs to be false and to update correctly
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

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/")
  };console.log(user);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="userMenu" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>

        {showMenu && (
          <>
            {user ? (
              <div className="menuList2">

                <img className="profilePicture" src={`${user.photoURL}`}></img>
                <li>Hello {user.displayName}</li>
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
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<FirebaseLogin />}
                />
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>)}
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;