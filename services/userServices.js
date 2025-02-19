const userData = require("../data/userData");
const bcrypt = require("bcrypt");

async function createUser(name, email, password) {
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

module.exports = {
  createUser,
};
