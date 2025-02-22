const userData = require("../data/userData");
const bcrypt = require("bcrypt");

async function createUser(userInfo) {
  const { name, email, password } = userInfo;
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const existingUser = await userData.getUserByEmail(email);

  if (existingUser) {
    throw new Error("Account already exists under this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userData.createUser(name, email, hashedPassword);
}

async function logInUser(userInfo) {
  const { email, password } = userInfo;

  const user = await userData.getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  return user;
}

async function sendMessage(message, sender, receiver) {
  await userData.sendMessage(message, sender, receiver);
}

async function getUsers() {
  return await userData.getUsers();
}

module.exports = {
  createUser,
  logInUser,
  sendMessage,
  getUsers,
};
