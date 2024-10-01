const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("./models/task");
const app = express();

const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  return res.send(`
        Try endpoints like 
        1. GET /tasks 
        2. GET /tasks/:id to get a list of tasks
        3. POST /tasks/:id and body to add task
        4. PUT /tasks/:id and body to update task
        5. DELETE /tasks/:id to delete task by id
    `);
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.send(tasks);
  } catch (error) {
    return res.send(error.message);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return res.send(task);
  } catch (error) {
    return res.send("No matching task found");
  }
});

app.post("/tasks", async (req, res) => {
  console.log(req.body);
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
      priority: req.body.priority,
      completed: req.body.hasOwnProperty("completed"),
    });
    await task.save();
    return res.send("Task Added Successfully");
  } catch (error) {
    return res.send(error.message);
  }
});

app.put("/tasks/:id", async (req, res) => {
  const updatedValue = {};
  if (req.body.title) {
    updatedValue.title = req.body.title;
  }
  if (req.body.description) {
    updatedValue.description = req.body.description;
  }
  if (req.body.dueDate) {
    updatedValue.dueDate = req.body.dueDate;
  }
  if (req.body.priority) {
    updatedValue.priority = req.body.priority;
  }
  if (req.body.completed) {
    updatedValue.completed = req.body.completed;
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, updatedValue, {
      new: true,
    });
    return res.send("Successfully updated");
  } catch (error) {
    return res.send(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    return res.send(`Successfully Deleted`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const startServer = async () => {
  console.log(`The server is running on http://localhost:${port}`);
  console.log(`Press CTRL + C to exit`);

  // MongoDB Connection
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Success! Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

app.listen(port, startServer);
