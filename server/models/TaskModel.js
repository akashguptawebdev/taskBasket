import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Additional fields can be added here (e.g., status, dueDate)
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
