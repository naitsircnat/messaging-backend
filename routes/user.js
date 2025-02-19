const userServices = require("../services/userServices");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    await userServices.createUser(req.body);

    res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});
