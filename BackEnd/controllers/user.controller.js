import createUser_DB from "../services/signup";

async function createUser(req, res) {
  try {
    const data = req.body;
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

module.exports = { createUser };
