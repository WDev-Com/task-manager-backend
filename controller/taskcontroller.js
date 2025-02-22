const {
  taskService_StoreFilesOnDB: taskService,
  fileService,
} = require("../service");
const asyncHandler = require("../util/asyncHandler");

const createTask = asyncHandler(async (req, res) => {
  const newTask = await taskService.createTask(req.body, req.file);
  res.status(201).json(newTask);
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.getTasks();
  res.json(tasks);
});

const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const updatedTask = await taskService.updateTask(taskId, req.body, req.file);
  res.json(updatedTask);
});

const getFileByTaskId = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) return res.status(400).json({ message: "Task ID is required" });
  // Correct way to call service function
  await fileService.getFileStreamByTaskId(taskId, req, res);
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  await taskService.deleteTask(taskId);
  res.json({ message: "Task deleted successfully" });
});

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getFileByTaskId,
};
