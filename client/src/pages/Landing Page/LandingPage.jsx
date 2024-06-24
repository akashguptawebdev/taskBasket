import React, { useContext, useEffect, useState } from "react";
import "./Landing.css";
import { context } from "../../main";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navBar/LandingComponent/Header/Header";
import Features from "../../components/navBar/LandingComponent/Features/Features";

const LandingPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [checkIsAuthe, setCheckIsAuth] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setCheckIsAuth(false);
    }, 500);
  }, [isAuthenticated, checkIsAuthe]);

  if (isAuthenticated) {
    navigateTo("/mainPage");
  }

  return (
    <>
    <div className="">
    {checkIsAuthe ? (
        <div>Loading...</div>
      ) : (
        <div className="main-Container px-5 md:px-20 mt-5 ">
          <Header />
          <div>
          <Features />
          </div>
        </div>
      )}

    </div>
     
    </>
  );
};

export default LandingPage;
