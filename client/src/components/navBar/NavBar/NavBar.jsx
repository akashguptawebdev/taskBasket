import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mainPic } from "../../../assets/assetsprovider.js";
import { context } from "../../../main.jsx"
import "./navbar.css";
import { toast } from "react-toastify";
import UserDetails from "./UserDetails.jsx";
import axios from "axios";
import { baseApiUrl } from "../../../allApi.js";
const NavBar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigateTo = useNavigate();
  const [show, setShow] = useState(true);

  const handleLogout =async()=>{
    try {
      const response = await axios.get(baseApiUrl+"api/user/logout",{
        withCredentials:true
      });
      toast.success(response?.data?.message);
      setIsAuthenticated(false);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response?.data.message);

      } else {
    
        toast.error("An unexpected error occurred.");
      }
    }
  }

  return (
    <nav className=" flex justify-between px-5  md:px-20 h-20 items-center  bg-slate-400">
      <div className="logo flex items-center">
        <Link to={"/"}>
        <img src={mainPic.TaskBasket} alt="logo" className="logo-img w-14 h-14 rounded-full"></img>
        </Link>
      </div>

      <div className="sm:block hidden">
        <div className="nav-links flex justify-center items-center gap-5">
          <Link to={"/"}>Home</Link>
          <Link to={"/Features"}>Features</Link>
          <Link to={"/about"}>ABOUT US</Link>
        </div>
      </div>
      <div>
          
          {isAuthenticated ?  <UserDetails  handleLogout={handleLogout} /> : 
        <Link to={"/login"} className="bg-white px-3 py-1 rounded-lg font-bold font-sans">Login</Link>
        }     
      </div>
    </nav>
  );
};

export default NavBar;
