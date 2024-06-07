import React from "react";
import "./Features.css";
import { mainPic } from "../../../../assets/assetsprovider";
const Features = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#273036"
          fill-opacity="1"
          d="M0,64L60,96C120,128,240,192,360,197.3C480,203,600,149,720,144C840,139,960,181,1080,176C1200,171,1320,117,1380,90.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <div className="Features-container text-white gap-20 lg:gap-8 lg:px-48 px-5 h-screen">
        <section className="flex flex-2 justify-evenly items-center ">
        <div className="justify-center items-center hidden md:block  w-full">
          <img src={mainPic.relexPerson} alt="" className="rounded-md object-cover w-96" />
        </div>
        <div className="">
          <h1 className="font-bold text-4xl py-5">Unlock the Power of a To-Do List</h1>

          <div className="benifits flex flex-col gap-5 justify-evenly mt-5">
            <div className="benifits-head ">
           <div className="flex items-center gap-3">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQE-cB500hWzT6lyEwUylMrqqd6nMkWsQng&s" alt="" className="w-8 h-8 rounded-full"/>
              <h3>Better Time Management</h3>
           </div>
              <p className="ml-12">Manage your time effectively and get more done every day.</p>

            </div>

            <div className="benifits-head ">
              <div className="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png" alt="" className="w-8 h-8" />
              <h3>Increased Productivity</h3>
              </div>
              <p  className="ml-12">Boost your productivity by tackling tasks in an organized manner.</p>

            </div>

            <div className="benifits-head">
             <div className="flex items-center gap-3">
             <img src="https://cdn-icons-png.freepik.com/512/9119/9119230.png" alt="" className="w-10 h-10" />
              <h3>Achieve Goals</h3>
             </div>
             <p  className="ml-12">Lower stress levels by having a clear plan for the day.</p>
            </div>

            <div className="btn flex justify-center">
                <button className="mt-10 bg-orange-700 py-4 px-14 rounded-full font-bold ">Add Task</button>
            </div>

          </div>
        </div>
        </section>

      

           
        
      </div>
    </>
  );
};

export default Features;
