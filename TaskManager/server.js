const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const Task = require("./models/task");
const app = express();

const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));

// Pages
app.get("/", async (req, res) => {
  const filePath = path.resolve(__dirname, "public/index.html");
  res.sendFile(filePath);
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.send(JSON.stringify(tasks));
  } catch (error) {
    return res.send(error.message);
  }
});

app.get("/addTask", async (req, res) => {
  const filePath = path.resolve(__dirname, "public/addTask.html");
  res.sendFile(filePath);
});
// Pages

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return res.send(JSON.stringify(task));
  } catch (error) {
    return res.send("No matching task found");
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.titleInputBox,
      description: req.body.descriptionInputBox,
      dueDate: req.body.dueDateInputBox
        ? new Date(req.body.dueDateInputBox)
        : null,
      priority: req.body.priorityOptions,
      completed: req.body.hasOwnProperty("completedCheckbox"),
    });
    task.save();
    return res.send("Task Added Successfully");
  } catch (error) {
    return res.send(error.message);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Student.findByIdAndUpdate(
      req.params.id,
      { name: "Aisha" },
      { new: true }
    );
    return res.send("Successfully updated");
  } catch (error) {
    return res.send(error.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete("66fb3b7be54d2f4b4fb1c1f8");
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
