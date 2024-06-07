import React, { useEffect, useState } from "react";
import "./EditTask.css";
import axios from "axios";
import { baseApiUrl } from "../../allApi";
import { toast } from "react-toastify";

const EditTask = ({ task, onEditComplete }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleEditTask = async () => {
    try {
      const response = await axios.patch(
        `${baseApiUrl}api/task/taskUpdate/${task._id}`,
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response?.data?.message);
      onEditComplete(); // Notify the parent component about the edit completion
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

  return (
    <div>
      <div className="TaskList-Container flex justify-center w-full">
        <div className="taskDetails border p-5 rounded-md w-full">
          <div className="mb-3">
            <input
              className="outline-none font-medium w-full"
              value={title}
              type="text"
              placeholder="Task name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              className="outline-none w-full"
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="border rounded-md border-t-0 text-end px-5 py-2">
        <button
          className={`${
            !title || !description ? "bg-red-500" : "bg-green-800"
          } text-white py-1 px-8 rounded-full font-bold`}
          onClick={handleEditTask}
          disabled={!title || !description}
        >
          Edit Task
        </button>
      </div>
    </div>
  );
};

export default EditTask;
