import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateKey from "../Utils/jwtUtils.js";

async function loginUser_DB(email, password) {
  try {
    const existing = await user.findOne({ email });

    if (existing) {
      const match = bcrypt.compare(password, existing.password);

      if (match) {
        const token = generateKey(existing);
        return token;
      } else {
        throw new Error("Password does not match");
      }
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    console.log("Login error: ", error.message);
    throw new Error("Invalid credentials!");
  }
}

export default loginUser_DB;
