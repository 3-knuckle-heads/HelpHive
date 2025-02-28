import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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

module.exports = mongoose.model("user", userSchema);
