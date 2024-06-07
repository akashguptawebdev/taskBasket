import React, { useState } from "react";
import "./AddTask.css";
import axios from "axios";
import {baseApiUrl} from "../../allApi"
import { toast } from "react-toastify";
const AddTask = ({onTaskAdded}) => {
    const [task , setTask] = useState("");
    const [description , setDescription] = useState("");

    const HandleAddTask =async ()=>{
      try {
        const response = await axios.post(baseApiUrl+"api/task/newTask",{
            title:task,
            description
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      onTaskAdded();
      toast.success(response?.data?.message);
      setTask("")
      setDescription("")
        
      } catch (error) {
         if (error.response && error.response.data) {
        toast.error(error.response?.data.message);
        console.log(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
      }
  
    }

   

  return (
    <div>
      <div className="TaskList-Container flex justify-center w-full">
        <div className="taskDetails border p-5 rounded-md w-full ">
          <div className="mb-3 ">
            <input className="outline-none font-medium w-full" value={task} type="text" placeholder="Task name" onChange={(e)=>setTask(e.target.value)}/>
          </div>
          <div>
            <input className="outline-none  w-full" type="text" value={description} placeholder="Description"onChange={(e)=>setDescription(e.target.value)} />
          </div>
        </div>
      </div>
        
        <div className="border rounded-md border-t-0  text-end px-5 py-2">
            <button className= {`${!task? " bg-orange-300" : " bg-orange-700" }  py-1 px-8 rounded-full font-bold`} onClick={HandleAddTask} disabled={!task} >Add Task</button>
        </div>
    </div>
  );
};

export default AddTask;
