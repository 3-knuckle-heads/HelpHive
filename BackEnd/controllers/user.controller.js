import createUser_DB from "../services/userCreateService.js";
import loginUser_DB from "../services/userLoginService.js";

export async function createUser(req, res) {
  try {
    const data = req.body;
    //   console.log("req.body", req.body);
    const user = await createUser_DB(data);

    res.status(201).json({
      user: user,
      message: "User has been created.",
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

    const token = await loginUser_DB(email, password);

    res.json({ token: token });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
