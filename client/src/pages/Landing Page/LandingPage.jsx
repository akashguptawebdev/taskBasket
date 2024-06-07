import React, { useContext } from "react";
import "./Landing.css";
import {context} from "../../main"
import { useNavigate } from "react-router-dom";
import Header from "../../components/navBar/LandingComponent/Header/Header";
import Features from "../../components/navBar/LandingComponent/Features/Features";

const LandingPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const navigateTo = useNavigate();

  if (isAuthenticated) {
    navigateTo("/mainPage");
  }
  return (
    <div className="main-Container px-5 md:px-20 mt-5 ">
      <Header/>
      <Features />
    </div>
  );
};

export default LandingPage;
