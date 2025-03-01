import user from "../models/user.model.js";

async function getAllUsers_DB(req, res) {
  const users = await user.find({});
  return users;
}

export default getAllUsers_DB;
