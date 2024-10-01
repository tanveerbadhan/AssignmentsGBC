const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
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
