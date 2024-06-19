const express = require("express");
const router = express.Router();
const Item = require("../models/itemSchema");

router.get("/", async (req, res) => {
  try {
    const item = await Item.find();
    if (!item) {
      res.status(500).json({
        success: false,
        message: "No items with present in this restaurant",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Displaying items in this restaurant",
      data: item,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
