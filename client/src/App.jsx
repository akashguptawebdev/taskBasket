import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { baseApiUrl } from "./allApi";
import NavBar from "./components/navBar/NavBar/NavBar.jsx";
import Login from "./pages/LoginPage/Login";
import { context } from "./main";
import axios from "axios";
import Register from "./pages/Register/Registration.jsx";
import MainPage from "./pages/Main page/MainPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LandingPage from "./pages/Landing Page/LandingPage.jsx";


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(context);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
  
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(baseApiUrl + "api/user/details", {
          withCredentials: true,
        })
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.data) {
          setIsAuthenticated(false);
          setUser({});
        }
      } finally {
          // Authentication check is done
          setIsCheckingAuth(false)
      }
    };


    fetchUser();
  }, [setIsAuthenticated, setUser]);

  if (isCheckingAuth) {
    // Show loading indicator while checking authentication
    return (
      <div className="flex  justify-center items-center w-full h-screen">
        <div className=""><i class="fa-solid fa-spinner text-4xl "></i></div>
      </div>
    );
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
          <Route
            path="*" element={ <MainPage />}
          />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" autoClose={2000} />
      </Router>
    </>
  );
};

export default App;
