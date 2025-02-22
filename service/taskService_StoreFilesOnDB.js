const { deleteFileById } = require("./fileService");
const { Task } = require("../model");
const HttpError = require("../util/htttp-error");
const { mongoose } = require("mongoose");

const convertToDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const createTask = async (taskData, file) => {
  try {
    if (!file || !file.id) {
      throw new HttpError("File upload failed", 400);
    }

    const newTask = new Task({
      ...taskData,
      created_on: taskData.created_on
        ? convertToDate(taskData.created_on)
        : new Date(),
      deadline: taskData.deadline ? convertToDate(taskData.deadline) : null,
      file_id: file.id,
    });

    await newTask.save();
    return newTask;
  } catch (error) {
    console.error("Error in createTask:", error);
    throw new HttpError(error.message || "Task creation failed", 500);
  }
};

const getTasks = async () => {
  try {
    return await Task.find();
  } catch (error) {
    console.error("Error in getTasks:", error);
    throw new HttpError("Failed to fetch tasks", 500);
  }
};

const updateTask = async (taskId, taskData, file) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new HttpError("Invalid ID", 400);
    }
    // console.log("taskId ", taskId);
    // console.log("taskData ", taskData);
    // console.log("file ", file);

    const task = await Task.findById(taskId);
    if (!task) throw new HttpError("Task not found", 404);

    if (file) {
      await deleteFileById(task.file_id); // Delete old file
      task.file_id = file.id;
    }

    task.title = taskData.title || task.title;
    task.description = taskData.description || task.description;
    task.deadline = taskData.deadline
      ? convertToDate(taskData.deadline)
      : task.deadline;

    await task.save();
    return task;
  } catch (error) {
    // console.error("Error in updateTask:", error);
    throw new HttpError(error.message || "Task update failed", 500);
  }
};

const deleteTask = async (taskId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new HttpError("Invalid ID", 400);
    }
    const task = await Task.findById(taskId);
    if (!task) throw new HttpError("Task not found", 404);

    if (task.file_id) {
      await deleteFileById(task.file_id); // Delete file from GridFS
    }

    await Task.findByIdAndDelete(taskId);
    return { message: "Task deleted successfully" };
  } catch (error) {
    // console.error("Error in deleteTask:", error);
    throw new HttpError(error.message || "Task deletion failed", 500);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
