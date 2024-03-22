const express = require("express");
const router = express.Router();
const StudentDetails = require("./../models/StudentDetails");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const studentdata = new StudentDetails(data);
    const response = await studentdata.save();
    console.log("Student details posted successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await StudentDetails.find();
    console.log("Student data get successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:courseType", async (req, res) => {
  try {
    const courseType = req.params.courseType;
    if (
      courseType == "MCA" ||
      courseType == "BCA" ||
      courseType == "MSC" ||
      courseType == "BTECH"
    ) {
      const response = await StudentDetails.find({ Course: courseType });
      console.log("Course data fetched successfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Course Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Updation operations
router.put("/:id", async (req, res) => {
  try {
    const personID = req.params.id; //extract the id from the database
    const updatedPersonData = req.body;
    const response = await StudentDetails.findByIdAndUpdate(
      personID,
      updatedPersonData,
      {
        new: true, //Return the updated document
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
