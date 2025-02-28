import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["volunteer", "host"],
    default: "volunteer",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
