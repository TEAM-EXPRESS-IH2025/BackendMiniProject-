const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortsSchema = new Schema({
  inProgress: { type: String },
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  programManager: String,
  leadTeacher: String,
  totalHours: Number,
});
const Cohorts = mongoose.model("cohorts", cohortsSchema);
module.exports = Cohorts;
