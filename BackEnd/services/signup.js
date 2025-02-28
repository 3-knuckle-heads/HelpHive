import user from "../models/user.model";
import bcrypt from "bcrypt";

async function createUser_DB(userData) {
  const { firstName, lastName, email, password } = userData;
  const hashedPass = bcrypt.hash(password, 50);

  const nUser = new user({
    firstName,
    lastName,
    email,
    hashedPass,
    role: "volunteer",
  });

  return await nUser.save();
}

module.exports = { createUser_DB };
