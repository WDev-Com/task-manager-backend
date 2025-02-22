const mongoose = require("mongoose");
const { getBucket } = require("../db/connection"); // Import function to get bucket
const { Task } = require("../model");

// Get file by ID
const getFileById = async (fileId) => {
  try {
    const bucket = getBucket();
    if (!bucket) throw new Error("Bucket is not initialized");

    const file = await bucket.s.db.collection("newBucket.files").findOne({
      _id: new mongoose.Types.ObjectId(fileId),
    });

    if (!file) throw new Error("File not found");
    return file;
  } catch (error) {
    throw new Error(error.message || "Error retrieving file");
  }
};

// Delete file by ID
const deleteFileById = async (fileId) => {
  if (!fileId) throw new Error("Invalid file ID");

  try {
    const bucket = getBucket();
    if (!bucket) throw new Error("Bucket is not initialized");

    await bucket.delete(new mongoose.Types.ObjectId(fileId));
    console.log(`File with ID ${fileId} deleted successfully.`);
  } catch (error) {
    throw new Error("File deletion failed: " + error.message);
  }
};

// Stream file by task ID
const getFileStreamByTaskId = async (taskId, req, res) => {
  try {
    console.log("Checking Task ID:", taskId);

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    // Fetch the Task document to get `file_id`
    const task = await Task.findById(taskId);
    if (!task || !task.file_id) {
      return res.status(404).json({ message: "File not found for task" });
    }

    console.log("Found file_id:", task.file_id);

    const bucket = getBucket();
    if (!bucket) throw new Error("Bucket is not initialized");

    // Find file metadata using `file_id`
    const file = await bucket.s.db.collection("newBucket.files").findOne({
      _id: new mongoose.Types.ObjectId(task.file_id),
    });

    if (!file) {
      return res.status(404).json({ message: "File not found in GridFS" });
    }

    console.log("Streaming file:", file.filename);

    // Stream the file
    const readStream = bucket.openDownloadStream(file._id);
    res.setHeader("Content-Type", file.contentType);
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error.message);
    return res
      .status(500)
      .json({ message: error.message || "Error streaming file" });
  }
};

module.exports = { getFileById, deleteFileById, getFileStreamByTaskId };
