import React, { useContext, useState } from "react";
import { context } from "../../../main";
import { Link } from "react-router-dom";
import "./navbar.css";

const UserDetails = ({ handleLogout }) => {
  const { isAuthenticated, user } = useContext(context);
  const firstName = user?.fullname ? user.fullname.split(" ")[0] : "";
  const [menuVisible, setMenuVisible] = useState(false);

  return (
   <>
   <div
      className="relative flex items-center gap-2 py-10"
      onMouseEnter={() => setMenuVisible(true)}
      onMouseLeave={() => setMenuVisible(false)}
    >
      <div className="flex items-center gap-2">
        <Link to={"/mainPage"}>
        <img
          src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg"
          alt=""
          className="w-10 h-10 rounded-full userImg cursor-pointer"
        />
        </Link>
       
        <h1 className="text-black font-semibold">{firstName}</h1>
      </div>

      {menuVisible && (
        <div className="absolute top-24   bg-black text-white rounded-md font-sans profileMenu">
          <div className="flex flex-col">
            <Link to="/" className="p-2" onClick={handleLogout} >
              Logout
            </Link>
            <Link to="/profile" className="p-2">
              Profile
            </Link>
          </div>
        </div>
      )}
    </div>
   </>
  );
};

export default UserDetails;
