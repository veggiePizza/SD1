import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateTool from "./components/Tools/CreateTool";
import LoginFormModal from "./components/Session/loginPopUp";
import ToolPage from "./components/Tools/toolOverview";
import LandingPage from "./components/landingPage";
import ToolsManagement from "./components/Tools/ToolsManagement";
import UpdateTool from "./components/Tools/UpdateTool";

import Login from "./components/Session/login";
import SignUp from "./components/Session/register";
import Profile from "./components/Session/profile";
import { auth } from "./components/Session/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/tools/current" element={<ToolsManagement />} />
            <Route path="/tools/new" element={<CreateTool />} />
            <Route path="/tools/:id" element={<ToolPage />} />
            <Route path="/tools/:id/edit" element={<UpdateTool />} />
            <Route path="/login" element={<LoginFormModal />} />
            <Route path="/login2" element={<Login />} />
            <Route path="/sign2" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
