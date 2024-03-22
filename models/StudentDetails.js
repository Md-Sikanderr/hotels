const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  StudentName: {
    type: String,
    required: true,
  },
  Course: {
    type: String,
    enum: ["MCA", "BCA", "BTECH", "MSC"],
    required: true,
  },
  Department: {
    type: String,
    enum: ["SEST", "LAW", "SCIENCE"],
  },
});

const StudentDetails = mongoose.model("PersonDetails", studentSchema);
module.exports = StudentDetails;
