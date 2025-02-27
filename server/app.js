const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const Cohorts = require("./models/Cohorts.model");
const Students = require("./models/Students.model");

const app = express();
const cohort = require("./data/cohorts.json");
const student = require("./data/students.json");

const mongoosesetup = async ()=>{
  try {
    const x = await mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api");
     console.log(`Connected to Database: "${x.connections[0].name}"`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
} 
mongoosesetup();

// app config
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// CORS middleware
// access to every ip&domain
// app.use(cors())
// access to specific ip&domain
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// import studentRouter
const studentRouter = require("./routes/students.routes");
app.use("/api/students", studentRouter);
// import cohortRouter
const cohortRouter = require("./routes/cohorts.routes")
app.use("/api/cohorts", cohortRouter)

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
