const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/data");

const JWT_SECRET = process.env.JWT_SECRET || "sdfgerer4g1861v6erdf51ds35";

async function login(email, password) {
  const user = await db("users").where({ email }).first();
  if (!user || !bcrypt.compareSync(password, user.password)) return null;

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

module.exports = { login };
