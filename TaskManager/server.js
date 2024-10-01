const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const Task = require("./models/task");
const app = express();

// app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  return res.render("index");
});

app.get("/tasks", async (req, res) => {
  return res.send("helloww testing task manager server");
});

app.get("/tasks/:id", async (req, res) => {
  return res.send("helloww testing task manager server");
});

app.post("/tasks", async (req, res) => {
  return res.send("helloww testing task manager server");
});

app.put("/tasks", async (req, res) => {
  return res.send("helloww testing task manager server");
});

app.delete("/tasks/:id", async (req, res) => {
  return res.send("helloww testing task manager server");
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
