require("dotenv").config();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongouri = process.env.MONGO_URI;
let storage = new GridFsStorage({
  url: mongouri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "newBucket",
      };
      resolve(fileInfo);
    });
  },
});

let upload = multer({
  storage,
});

module.exports = { upload };
