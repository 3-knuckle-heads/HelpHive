import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profilePic: String,
  role: {
    type: String,
    enum: ["volunteer", "host"],
    default: "volunteer",
  },
  contactNumber: String,
  skills: String,
});

const User = mongoose.model("User", userSchema);
export default User;
