import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { baseApiUrl } from "./allApi";
import NavBar from "./components/navBar/NavBar/NavBar.jsx";
import Login from "./pages/LoginPage/Login";
import { context } from "./main";
import axios from "axios";
import Register from "./pages/Register/Registration.jsx"
import MainPage from "./pages/Main page/MainPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LandingPage from "./pages/Landing Page/LandingPage.jsx";
import { messaging } from "./FireBase.js";
import { getToken } from "firebase/messaging";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(context);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey: 'BJG_q_-rmY_2VsTuu73y-tF5N-9P1Rl0BADG1ney8HMrmHBUDc47wbOk47gjv6aoBOJpfn0H13KbR0m19ptAdHo'
      });
      console.log(token);
    } else if (permission === 'denied') {
      alert("You denied the notification");
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(baseApiUrl + "api/user/details", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.data) {
          setIsAuthenticated(false);
          setUser({});
        }
      } finally {
        setIsCheckingAuth(false); // Authentication check is done
      }
    };

    // Request user for notification permission
    requestPermission();

    fetchUser();
  }, [setIsAuthenticated, setUser]);

  if (isCheckingAuth) {
    // Show loading indicator while checking authentication
    return "/";
  }

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />

          {/* Redirect based on authentication status once check is complete */}
          <Route path="*" element={isAuthenticated ? <MainPage /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" autoClose={2000} />
      </Router>
    </>
  );
};

export default App;
