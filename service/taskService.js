const fs = require("fs");
const path = require("path");
const HttpError = require("../util/htttp-error");
const { Task } = require("../model");
const mongoose = require("mongoose");

const createTask = async (task, file) => {
  try {
    if (task.created_on) {
      task.created_on = convertToDate(task.created_on);
    }
    if (task.deadline) {
      task.deadline = convertToDate(task.deadline);
    }

    const newTask = await Task.create({
      ...task,
      linked_file: file ? file.path : null, // Store file path if uploaded
    });

    return newTask;
  } catch (err) {
    if (file) {
      fs.unlink(file.path, () => {}); // Delete the uploaded file if task creation fails
    }
    throw new HttpError("Could not create task", 500);
  }
};

const convertToDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const getTasks = async () => {
  try {
    return await Task.find();
  } catch (err) {
    throw new HttpError(err.message || "Could not fetch tasks", 500);
  }
};

const updateTask = async (taskId, task, file) => {
  try {
    if (!mongoose.isValidObjectId(taskId)) {
      throw new HttpError("Invalid Task Id", 400);
    }

    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      throw new HttpError("Task Not Found", 404);
    }

    // Convert date fields if present
    if (task.created_on) {
      task.created_on = convertToDate(task.created_on);
    }
    if (task.deadline) {
      task.deadline = convertToDate(task.deadline);
    }

    // Delete old file if a new one is uploaded
    if (file && existingTask.linked_file) {
      fs.unlink(existingTask.linked_file, () => {});
    }

    // Update task properties
    Object.assign(existingTask, task, {
      linked_file: file ? file.path : existingTask.linked_file,
    });

    await existingTask.save();
    return existingTask;
  } catch (err) {
    if (file) {
      fs.unlink(file.path, () => {}); // Cleanup new file if update fails
    }
    throw new HttpError(err.message || "Updating task failed", 500);
  }
};

const deleteTask = async (taskId) => {
  try {
    if (!mongoose.isValidObjectId(taskId)) {
      throw new HttpError("Invalid Task Id", 400);
    }
    const task = await Task.findById(taskId);
    if (!task) {
      throw new HttpError("Task Not Found", 404);
    }

    // Delete the associated file
    if (task.linked_file) {
      fs.unlink(task.linked_file, () => {});
    }

    return await Task.findByIdAndDelete(taskId);
  } catch (err) {
    throw new HttpError(err.message || "Deleting task failed", 500);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
