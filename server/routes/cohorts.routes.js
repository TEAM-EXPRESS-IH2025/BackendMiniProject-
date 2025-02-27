const router = require("express").Router();

const Cohort = require("../models/Cohorts.model");
 

//POST /api/cohorts - Creates a new cohort
router.post("/", async (req,res)=>{
  const newCohort = req.body;
  try {
    const cohort = await Cohort.create(newCohort);
    res.status(201).json(newCohort);
  } catch (error) {
    console.error("Failed POST cohorts: ",error)
    res.status(500).json({ error: "Failed to create new newCohorts" });
  }
})

//GET /api/cohorts - Retrieves all of the cohorts in the database collection
router.get("/", async (req, res) => {
  try {
    const cohort = await Cohort.find({});
    res.status(200).json(cohort);
  } catch (error) {
    console.error("Failed GET cohorts: ",error)
    res.status(500).json({ error: "Failed to retruive cohorts" });
  }
});

//PUT /api/cohorts/:cohortId - Updates a specific cohort by id
router.put("/:cohortId", async (req,res) => {
  const { cohortId } = req.params;
  const newCohort = req.body;

  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId,newCohort, {new:true});
    res.status(200).json(updatedCohort);
  } catch (error) {
    console.error("Failed PUT cohort: ",error)
    res.status(500).json({ error: "Failed to update cohort" });
  }
});

//DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
router.delete("/:cohortId", async (req,res) => {
  const { cohortId } = req.params;
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(cohortId)
    res.status(204).json({message:"deleted cohort"});
  } catch (error) {
    console.error("Failed DELETE cohort: ",error)
    res.status(500).json({ error: "Failed to delete Cohorts" });
  }
});

//GET /api/cohorts/:cohortId - Retrieves a specific cohort by id

router.get("/:cohortId",async (req,res)=>{
  const {cohortId}=req.params;

  try {
    const cohort = await Cohort.findById(cohortId);
    res.status(200).json(cohort);
  } catch (error) {
    console.error("Failed GET cohort: ",error);
    res.status(500).json({ error: "Failed to retrieve cohort" });
  }
});


module.exports = router