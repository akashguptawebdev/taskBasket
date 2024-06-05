import React from 'react'
import {Link} from "react-router-dom"

const NavBar = () => {
  return (
    <div className='px-10 m-auto h-10 bg-slate-400'>
        <div className="navItem flex justify-between  ">
            <div>
               <Link to={"/"}> 
               <img src="" alt="Brand Logo" />
               </Link>
            </div>
            <div>
            <Link to={"/login"} className='text-white font-bold text-2xl  text-center'>
                Login
            </Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar