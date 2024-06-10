import React, { useContext, useEffect, useState } from "react";
import AddTask from "../../components/AddTask/AddTask";
import ShowTask from "../../components/ShowTask/ShowTask";
import axios from "axios";
import { context } from "../../main";
import { useNavigate } from "react-router-dom";


const MainPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Set a timeout to wait before checking authentication
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      navigateTo("/login");
    }
  }, [isCheckingAuth, isAuthenticated, navigateTo]);

  return (
    <div className="h-screen px-5 md:px-20 mt-20">
      {isCheckingAuth ? (
        <p>Loading...</p> // Optionally show a loading indicator during the delay
      ) : (<>

      <ShowTask />
   
      </>
      )}
    </div>
  );
};

export default MainPage;
