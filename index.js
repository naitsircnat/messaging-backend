const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to the API" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
