import createUser_DB from "../services/userCreateService.js";
import loginUser_DB from "../services/userLoginService.js";
import getAllUsers_DB from "../services/userGetService.js";
import { generateRefreshToken } from "../Utils/jwtUtils.js";

export async function createUser(req, res) {
  try {
    const data = req.body;
    //   console.log("req.body", req.body);
    const user = await createUser_DB(data);

    const token = generateRefreshToken(data);
    const rtoken = generateRefreshToken(data.email);

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

    const data = await loginUser_DB(email, password);
    const rtoken = generateRefreshToken(email);

    const rUser = {
      ...data,
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
