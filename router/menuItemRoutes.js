const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");
const Person = require("../models/Person");

//MenuItem post method
router.post("/", async (req, res) => {
  try {
    const menudata = req.body;
    const newMenuData = new MenuItem(menudata);
    const responses = await newMenuData.save();
    console.log("Menu data is saved");
    res.status(200).json(responses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Menu Item get method
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu data fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "Spicy" || tasteType == "Sweet" || tasteType == "Sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("data fetched as per required");
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuID = req.params.id;
    const updatedMenuItem = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuID, updatedMenuItem, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuID = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuID);

    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("Data deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
