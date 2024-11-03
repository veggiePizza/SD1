import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import * as sessionActions from "./store/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CreateTool from "./components/Tools/CreateTool";
import LoginFormModal from "./components/Session/loginPopUp";
import ToolPage from "./components/Tools/toolOverview";
import ToolsManagement from "./components/Tools/ToolsManagement";
import UpdateTool from "./components/Tools/UpdateTool";
import Login from "./components/Session/login";
import SignUp from "./components/Session/signUpWithEmail";
import Profile from "./components/Session/profile";

import "./icons.js";
import Landing from "./screens/Landing.js";
import Booking from "./screens/Booking";
import Tools from "./screens/Tools";
import AuthPage from "./screens/AuthPage";
import PaymentPage from "./screens/PaymentPage";

import "./App.css";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/tools/current" element={<ToolsManagement />} />
            <Route path="/tools/new" element={<CreateTool />} />
            <Route path="/tools/:id" element={<ToolPage />} />
            <Route path="/tools/:id/edit" element={<UpdateTool />} />
            <Route path="/login" element={<LoginFormModal />} />
            <Route path="/login2" element={<Login />} />
            <Route path="/sign2" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Landing" element={<Landing />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/Tools" element={<Tools />} />
            <Route path="/AuthPage" element={<AuthPage />} />
            <Route path="/PaymentPage" element={<PaymentPage />} />

          </Routes>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
