/*
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["TODO", "DONE"],
    default: "TODO",
  },
  linked_file: {
    type: String,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports.Task = Task;
*/
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  created_on: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["TODO", "DONE"],
    default: "TODO",
  },
  deadline: { type: Date },
  file_id: { type: mongoose.Schema.Types.ObjectId, ref: "newBucket.files" },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports.Task = Task;
