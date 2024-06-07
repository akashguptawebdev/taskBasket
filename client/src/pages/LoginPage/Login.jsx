import React, { useContext, useState } from "react";
import { context } from "../../main.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../../allApi.js";
import { toast } from "react-toastify";
import "./Login.css";

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
                  src="data:image/png;base64,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"
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <img
                  src="https://cdn.pixabay.com/photo/2015/03/10/17/30/twitter-667462_640.png"
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jsjkG08rq1TWf5GSSpxc2zmDYU9BmNa7Zg&s"
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
