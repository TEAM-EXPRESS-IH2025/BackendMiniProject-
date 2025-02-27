const router = require("express").Router();

const Student = require("../models/Students.model");


// POST /api/students
router.post("/", async(req, res) => {
  const newStudent = req.body;

  try {
    const student = await Student.create(newStudent);
    res.status(201).json(student);
    
  } catch (error) {
    console.error("POST student err: ", error)
    res.status(500).json({ error: "Failed to create new student" })
  };

});

//GET /api/students
router.get("/", async(req, res) => {
  try {
    const students = await Student.find({}).populate("cohort");
    res.status(200).json(students);

  } catch (error) {
    console.error("GET student err: ", error)
      res.status(500).json({ error: "Failed to retrieve students" });
  }
});

// GET /api/students/:studentId
router.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    res.status(200).json(student);

  } catch (error) {
    console.error("GET studentID error",error)
    res.status(500).json({ error: "Failed to retrieve student by id" });
  }
});

// PUT /api/students/:studentId
router.put("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const newStudent = req.body;
  
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, newStudent, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("PUT student error", error);
    res.status(500).json({ error: "Failed to update student" });
  }
});

// DELETE /api/students/:studentId
router.delete("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    res.status(204).json(deletedStudent);
  } catch (error) {
    console.error("DELETE student error", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

// GET /api/students/cohort/:cohortId --> Retrieves all of the students for a given cohort
router.get("/cohort/:cohortId",async(req, res)=>{
  const { cohortId } = req.params; 

  try {
    const studentOfCohort = await Student.find({cohort: cohortId}).populate("cohort");
    res.status(200).json(studentOfCohort);
  } catch (error) {
    console.error("GET students/cohort/:cohortId:", error);
    res.status(500).json({ error: "Failed to retrieve Cohort" });
  }
});

module.exports = router