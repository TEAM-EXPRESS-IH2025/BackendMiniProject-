const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const Cohorts = require("./models/Cohorts.model");
const Students = require("./models/Students.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// http://localhost:5005

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

const cohort=require("./data/cohorts.json");
const student=require("./data/students.json");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173"  
}));

// CORS middleware
// access to every ip&domain
// app.use(cors())
// access to specific ip&domain
app.use(
  cors({
    origin: ['http://localhost:5173']
  })
)

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  res.json (cohort);
});

app.get("/api/students", (req, res) => {
  res.json (student);
});


app.get("/cohorts" ,(req,res) => {
  Cohorts.find({})
  .then((cohorts) => {
    console.log("Retrieved Cohorts ->", cohorts);
    res.json(cohorts);
  })
  .catch((error) => {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).json({ error: "Failed to retrieve cohorts" });
  });
});

app.get("/students" ,(req,res) => {
  Students.find({})
  .then((students) => {
    console.log("Retrieved students ->", students);
    res.json(students);
  })
  .catch((error) => {
    console.error("Error while retrieving students ->", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  });
});




// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});