import React, { useContext, useState } from "react";
import { context } from "../../main.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../../allApi.js";
import { toast } from "react-toastify";
import "./Login.css";
import { mainPic } from "../../assets/assetsprovider.js";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        baseApiUrl + "api/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response?.data?.message);
      setIsAuthenticated(true);
      navigateTo("/");

      if (isAuthenticated) {
        navigateTo("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response?.data.message);
        console.log(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }

    if (isAuthenticated) {
      return <Navigate to={"/"} />;
    }
  };

  return (
    <>
      <div className="mainContainer w-full h-screen flex justify-center  items-center">
        <div className="loginPage bg-white w-80  rounded-md p-5">
          <div className="header text-center p-8 text-2xl">
            <h2>Login</h2>
          </div>

          <div className="login-credintion-container px-5">
            <div className="">
              <p>Email</p>
              <div className="userName-Input flex items-center">
                <i class="fa-regular fa-user"></i>
                <input
                  className="p-3 "
                  type="email"
                  value={email}
                  placeholder="Type your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5">
              <p>Password</p>
              <div className="userName-Input flex items-center">
                <i class="fa-solid fa-lock"></i>
                <input
                  className="p-3 "
                  type="password"
                  value={password}
                  placeholder="Type your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="forget-Pasword flex mt-5 justify-end">
                <Link to={""}>Forget Password?</Link>
              </div>
            </div>

            <div className="loginBtn m-5 flex justify-center items-center">
              <button type="button" onClick={handleLogin} className="">
                Login
              </button>
            </div>

            <div className="signup-using-direct">
              <p className="text-center pt-10 p-5"> Or Signup using </p>
              <div className="directLink  flex gap-3 items-center justify-center">
                <img
                  src={mainPic.facebook}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <img
                  src={mainPic.twitter}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <img
                  src={mainPic.google}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
              </div>
            </div>

            <div className="register text-center ">
            <p className="text-center pt-10 p-5"> Or Signup using </p>
              <Link to={"/register"} >SIGN UP</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
