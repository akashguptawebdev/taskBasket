import React, { useEffect, useState } from "react";
import AddTask from "../../components/AddTask/AddTask";
import ShowTask from "../../components/ShowTask/ShowTask";
import axios from "axios";

const MainPage = () => {
 
  return (
    <div className="h-screen px-5 md:px-20 mt-20">
      {/* <AddTask /> */}
      <ShowTask />

    </div>
  );
};

export default MainPage;
