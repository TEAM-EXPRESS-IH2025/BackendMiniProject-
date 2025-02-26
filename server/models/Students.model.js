const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const studentsSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  linkedinUrl: { type: String, unique: true },
  languages: { type: [String] },
  program: String,
  background: String,
  image: String,
  projects: {type:[String]},
  cohort: {type:mongoose.Schema.Types.ObjectId, ref: "Cohorts"},
});
const Students = mongoose.model("students", studentsSchema);
module.exports = Students;