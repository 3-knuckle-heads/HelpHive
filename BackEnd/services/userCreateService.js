import user from "../models/user.model.js";
import bcrypt from "bcrypt";

async function createUser_DB(userData) {
  const { firstName, lastName, email, password } = userData;
  const hashedPass = await bcrypt.hash(password, 10);

  const nUser = new user({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPass,
    role: "volunteer",
  });

  // console.log("nUser", nUser);

  return await nUser.save();
}

export default createUser_DB;
