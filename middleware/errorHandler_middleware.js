const multer = require("multer");
const { fileService } = require("../service");

const errorHandler = async (error, req, res, next) => {
  try {
    // Delete file from GridFS if the task creation or update fails
    if (req.file && req.file.id) {
      const fileId = req.file.id;
      await fileService.deleteFileById(fileId);
      console.log(
        `Custom Error Handler Line No 15 : File with ID ${fileId} deleted from GridFS due to task failure.`
      );
    }

    // Handle Multer errors properly
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File size too large! Max 10MB allowed." });
      }
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ message: "Unexpected file field name!" });
      }
    }

    if (error.message.includes("Invalid file type")) {
      return res.status(400).json({ message: error.message });
    }

    if (error.name === "MongoError") {
      return res
        .status(500)
        .json({ message: "Database error during file upload!" });
    }

    if (res.headersSent) {
      return next(error);
    }

    res.status(error.code || 500).json({
      message: error.message || "An unknown error occurred!",
    });
  } catch (err) {
    console.error("Error in error handler:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error while handling errors." });
  }
};

module.exports = errorHandler;
