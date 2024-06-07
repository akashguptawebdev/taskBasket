import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"
import { mainPic } from "../../assets/assetsprovider";
const Footer = () => {
    const tasks = [
        {
          id: 1,
          title: "Morning Exercise",
          description: "30-minute jog in the park",
        },
        {
          id: 2,
          title: "Office Meeting",
          description: "Team sync-up meeting in Conference Room B",

        },
        {
          id: 3,
          title: "Grocery Shopping",
          description: "Buy fruits, vegetables, and dairy products",
  
        },
        {
          id: 4,
          title: "Project Deadline",
          description: "Submit final report to the client",
   
        },
        {
          id: 5,
          title: "Call with Mentor",
          description: "Discuss career goals and development plan",

        },
        {
          id: 6,
          title: "Dinner with Friends",
          description: "Dinner at Italian restaurant downtown",
      
        },
      ];
      

  return (
    <>
      <footer className="px-5 md:px-20 bg-black text-white">
        <hr />
        <div className="content ">
            
          <div className="">
            <img src={mainPic.TaskBasket} alt="logo" className="logo-img md:w-52"/>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          <div>
            <h4>Task</h4>
            <ul>
              {tasks.map((element) => (
                <li key={element.id}>
                  <span>{element.title}</span>
                  <span>{element.description}</span>
             
                
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
            
              <span>843-438-1886</span>
            </div>
            <div>
           
              <span>akashgupta.webdev@gmail.com</span>
            </div>
            <div>
              
              <span>Bihar, India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;