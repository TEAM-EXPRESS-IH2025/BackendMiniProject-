const router = require("express").Router();

const Student = require("../models/Students.model");


// POST /api/students
router.post("/", async(req, res,next) => {
  const newStudent = req.body;

  try {
    const student = await Student.create(newStudent);
    res.status(201).json(student);
    
  } catch (error) {
    console.error("POST student err: ", error)
   // res.status(500).json({ error: "Failed to create new student" })
    next(error);
  };

});

//GET /api/students
router.get("/", async(req, res,next) => {
  try {
    const students = await Student.find({}).populate("cohort");
    res.status(200).json(students);

  } catch (error) {
    console.error("GET student err: ", error)
    //  res.status(500).json({ error: "Failed to retrieve students" });
      next(error);
  }
});

// GET /api/students/:studentId
router.get("/:studentId", async (req, res,next) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    res.status(200).json(student);

  } catch (error) {
    console.error("GET studentID error",error)
   // res.status(500).json({ error: "Failed to retrieve student by id" });
    next(error);
  }
});

// PUT /api/students/:studentId
router.put("/:studentId", async (req, res,next) => {
  const { studentId } = req.params;
  const newStudent = req.body;
  
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, newStudent, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("PUT student error", error);
    // res.status(500).json({ error: "Failed to update student" });
    next(error);
  }
});

// DELETE /api/students/:studentId
router.delete("/:studentId", async (req, res,next) => {
  const { studentId } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    res.status(204).json(deletedStudent);
  } catch (error) {
    console.error("DELETE student error", error);
   // res.status(500).json({ error: "Failed to delete student" });
    next(error);
  }
});

// GET /api/students/cohort/:cohortId --> Retrieves all of the students for a given cohort
router.get("/cohort/:cohortId",async(req, res,next)=>{
  const { cohortId } = req.params; 

  try {
    const studentOfCohort = await Student.findById({cohort: cohortId}).populate("cohort");
    res.status(200).json(studentOfCohort);
  } catch (error) {
    console.error("GET students/cohort/:cohortId:", error);
    //res.status(500).json({ error: "Failed to retrieve Cohort" });
    next(error);
  }
});

module.exports = router;