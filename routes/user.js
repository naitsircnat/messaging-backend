const userServices = require("../services/userServices");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

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

router.post("/login", async (req, res) => {
  try {
    const user = await userServices.logInUser(req.body);

    const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(201).json({ Message: "Login successful", token: token });
  } catch (error) {
    res.status(401).json({ Message: error.message });
  }
}),
  (module.exports = router);
