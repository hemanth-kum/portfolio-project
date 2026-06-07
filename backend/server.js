console.log("THIS SERVER FILE IS RUNNING");

const express = require("express");
const mongoose = require("mongoose");
const Project = require("./models/Project");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Portfolio Backend is Running 🚀");
});


mongoose.connect("mongodb+srv://admin:admin123@cluster0.8iwinws.mongodb.net/portfolioDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post("/projects", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

app.delete("/projects/:id", async (req, res) => {
  console.log("DELETE ROUTE HIT:", req.params.id);

  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get("/reset", async (req, res) => {
  try {
    await Project.deleteMany({});
    res.send("All projects deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/add-demo", async (req, res) => {
  try {
    await Project.insertMany([
      {
        title: "Portfolio Website",
        description: "Full stack MERN portfolio project"
      },
      {
        title: "AI Chat App",
        description: "Chatbot using AI APIs"
      },
      {
        title: "E-Commerce Website",
        description: "Full stack shopping platform"
      }
    ]);

    res.send("Demo projects added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
