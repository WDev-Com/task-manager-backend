const multer = require("multer");
const uuid = require("uuid");

const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
  "application/msword": "doc",
};

const fileUpload = multer({
  limits: { fileSize: 500000 }, // Limit file size
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(
        "File Middleware Line No 13 : Uploading file to /uploads/files..."
      );
      cb(null, "uploads/files"); // Ensure the correct path (without "/")
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      if (!ext) {
        return cb(new Error("Invalid file type"), false);
      }
      cb(null, uuid.v4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log(
      "File Middleware Line No 26 : File received:",
      file.originalname,
      "Type:",
      file.mimetype
    );
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    cb(isValid ? null : new Error("Invalid mime type!"), isValid);
  },
});

module.exports = fileUpload;
