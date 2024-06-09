import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Landing Page/LandingPage.jsx"
import { baseApiUrl } from "./allApi";
import NavBar from "./components/navBar/NavBar/NavBar.jsx";
import Login from "./pages/LoginPage/Login";
import { context } from "./main";
import axios from "axios";
import Register from "./pages/Register/Registration.jsx"
import MainPage from "./pages/Main page/MainPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LandingPage from "./pages/Landing Page/LandingPage.jsx";
import {messaging} from "./FireBase.js"
import {getToken} from "firebase/messaging"


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(context);



  const requestPermission = async()=>{
    const permission = await Notification.requestPermission()

    if(permission === 'granted'){
      // Generate Token
    const token = await getToken(messaging , {vapidKey:'BJG_q_-rmY_2VsTuu73y-tF5N-9P1Rl0BADG1ney8HMrmHBUDc47wbOk47gjv6aoBOJpfn0H13KbR0m19ptAdHo'})
    console.log(token)
    }else if(permission === 'denied'){
      alert("You denied for the notification")
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
      
      }
    };

    // Req user for notification permission
    requestPermission();

   

    fetchUser();
  }, [isAuthenticated]);
  


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
          <Route path="*" element={`${isAuthenticated?<MainPage/>:<LandingPage/>}`} />
        </Routes>
        <Footer/>
          
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
