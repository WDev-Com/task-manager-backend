const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/UploadFileToDB");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getFileByTaskId,
} = require("../controller/taskcontroller");

router.get("/", getTasks);
router.get("/file/:taskId", getFileByTaskId);
router.post("/create", upload.single("file"), createTask);
router.put("/:id", upload.single("file"), updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

/*
const fileUpload = require("../middleware/file-upload");
router.get("/", TaskController.getTasks);
router.post("/create", fileUpload.single("file"), TaskController.createTask);
router.put("/:id", fileUpload.single("file"), TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);
*/
