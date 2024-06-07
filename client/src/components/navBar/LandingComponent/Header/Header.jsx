import React from 'react'
import "./Header.css"
import {mainPic} from "../../../../assets/assetsprovider"
const Header = () => {
  return (
    <div>
      <div className="header-top hero md:flex gap-12 relative">

        <div className="left banner">
          <h1 className='font-sans font-bold'>Effortless Task Management for Busy Lives</h1>
          <p>
          A to-do list streamlines tasks, enhances productivity, reduces stress, and helps achieve daily goals efficiently.</p>
        </div>
        <div className="banner">
          <img src={ mainPic.taskImg} alt="hero" className="animated-image " />
        </div>
      </div>

      
      
    </div>
  )
}

export default Header