import createUser_DB from "../services/userCreateService.js";
import loginUser_DB from "../services/userLoginService.js";
import updateUser_DB from "../services/userUpdateService.js";
import getAllUsers_DB from "../services/userGetService.js";
import { generateToken, generateRefreshToken } from "../Utils/jwtUtils.js";

export async function createUser(req, res) {
  try {
    const data = req.body;
    //   console.log("req.body", req.body);
    const user = await createUser_DB(data);

    const uid = user._id.toString();
    console.log("user._id", uid);

    const token = generateToken(uid);
    const rtoken = generateRefreshToken(uid);

    res.status(201).json({
      user: user,
      message: "User has been created.",
      token: token,
      refreshToken: rtoken,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await loginUser_DB(email, password);

    const uid = user._id.toString();
    console.log("userId", uid);

    const token = generateToken(uid);
    const rtoken = generateRefreshToken(uid);

    const rUser = {
      ...user,
      token: token,
      refreshToken: rtoken,
    };

    res.json(rUser);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await getAllUsers_DB();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function updateUser(req, res) {
  try {
    const data = req.body;
    const file = req.file;

    const updatedUser = await updateUser_DB(data, file);

    res.status(200).json({
      updatedUser,
      message: "User updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
