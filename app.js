require("dotenv").config();
const express = require("express");
const HttpError = require("./util/htttp-error");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler_middleware");
const app = express();
const { conn } = require("./db/connection");

/**
 * for handling CORS errors and setting headers
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
  next();
});

/// Handling the incoming Data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//Ensure File Serving Middleware (Optional)
app.use("/api/tasks/file/:taskId", async (req, res) => {
  const { getFileStreamByTaskId } = require("./service/fileService");
  await getFileStreamByTaskId(req.params.taskId, req, res);
});

//Storing File In Local Folder
// app.use(
//   "/uploads/files",
//   express.static(path.join(__dirname, "public", "uploads", "files"))
// );

app.use("/api", routes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  next(error);
});

// Use custom error-handling middleware
app.use(errorHandler);

module.exports = app;
