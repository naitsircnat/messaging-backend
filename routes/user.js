const userServices = require("../services/userServices");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticateWithJwt = require("../middleware/AuthenticateWithJwt");

router.post("/register", async (req, res) => {
  try {
    await userServices.createUser(req.body);

    res.status(201).json({
      message: "registration successful",
    });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userServices.logInUser(req.body);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res
      .status(201)
      .json({ Message: "login successful", token: token, userId: user.id });
  } catch (error) {
    res.status(401).json({ Message: error.message });
  }
});

router.post("/message", authenticateWithJwt, async (req, res) => {
  const sender = req.userId;

  const { message, receiver } = req.body;

  try {
    await userServices.sendMessage(message, sender, receiver);

    res.status(200).json({ Message: "message sent successfully" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

router.get("/users", async (req, res) => {
  const users = await userServices.getUsers();

  res.json(users);

  try {
  } catch (error) {
    res.status(500).json({ Message: "Error retrieving users" });
  }
});

module.exports = router;
