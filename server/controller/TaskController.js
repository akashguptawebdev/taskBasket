import TaskModel from "../models/TaskModel.js";
export const newTaskController = async (req, res) => {
  const { title, description } = req.body;
  const { user } = req;

  if ((!title)) {
    return res.status(400).json({
      success: false,
      message: "Please Fill All Field",
    });
  }

  const newTask = await TaskModel.create({
    title,
    description,
    userId: user._id,
  });

  res.status(200).json({
    success: true,
    message: "task Saved Successfully",
    newTask,
  });
};

export const getAllTask = async (req, res) => {
  const userId = req.user._id;

  try {
    const tasks = await TaskModel.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return req.status(200).json("Task not Found");
    }

    const deleteTask = await TaskModel.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "Task completed Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if ((!title)) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Field",
      });
    }

    const updatedUser = await TaskModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      success: true,
      message: "update Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
