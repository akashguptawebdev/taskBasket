import React, { useEffect, useState } from "react";
import "./ShowTask.css";
import axios from "axios";
import { baseApiUrl } from "../../allApi";
import { toast } from "react-toastify";
import AddTask from "../AddTask/AddTask";
import EditTask from "../EditTask/EditTask.jsx";

const ShowTask = () => {
  const [taskData, setTaskData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(
        baseApiUrl+"/api/task/getAllTask",
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setTaskData(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response?.data.message);
        console.log(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`${baseApiUrl}api/task/taskDelete/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response?.data.message);
      fetchTask(); // Re-fetch tasks after deletion to update the list
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response?.data.message);
        console.log(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleEdit = (index , elem) => {
    setEditingIndex(index === editingIndex ? null : index); // Toggle editing state
   
  };

  const handleEditComplete = () => {
    setEditingIndex(null); // Close the EditTask component
    fetchTask(); // Re-fetch tasks to update the list
  };

  return (
    <div>
      <AddTask onTaskAdded={fetchTask} /> {/* Add this line */}
      <div className="taskData mt-5">
        {taskData.map((data, index) => (
          editingIndex === index ? (
            <>
            <EditTask key={index} task={data}  onEditComplete={handleEditComplete}/>
            <div className="text-end" >
            <span onClick={() => setEditingIndex(null)} className="border cursor-pointer relative bottom-9 right-44 py-1 px-8 bg-red-300 rounded-full ">Cancel</span>
            </div>
            </>
          ) : (
            <div
              key={index}
              className="data rounded-full border px-5 mb-5 flex justify-between items-center"
            >
              <div className="p-3">
                <h3 className="font-medium font-sans">{data.title}</h3>
                <p>{data.description}</p>
              </div>
              <div className="flex items-center">
                <div
                  className="roundedDiv cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleDeleteTask(data._id)}
                >
                  {hoveredIndex === index && (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAIClLAy_95k0lnsJPztgXtUckJaWDDAAA6A&s"
                      className="rounded-full object-cover"
                      alt="delete.png"
                    />
                  )}
                </div>
                <i
                  className="fa-solid fa-pen-to-square cursor-pointer"
                  onClick={() => handleEdit(index , data )}
                ></i>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ShowTask;
