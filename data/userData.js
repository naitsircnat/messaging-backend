const pool = require("../database");

async function createUser(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Invalid user details");
  }
  try {
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, password]
    );
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email");
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function sendMessage(message, sender, receiver) {
  if (!message) {
    throw new Error("Message missing");
  }

  try {
    await pool.query(
      "INSERT INTO messages (message, sender, receiver) VALUES (?,?,?)",
      [message, sender, receiver]
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUsers() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");

    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  sendMessage,
  getUsers,
};
