import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function generateKey(user) {
  const payload = {
    //   name: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
}

export default generateKey;
