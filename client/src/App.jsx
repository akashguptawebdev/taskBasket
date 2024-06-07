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


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(context);
  
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

    fetchUser();
  }, [isAuthenticated]);
  



  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainPage" element={<MainPage />} />
        </Routes>
        <Footer/>
          
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
