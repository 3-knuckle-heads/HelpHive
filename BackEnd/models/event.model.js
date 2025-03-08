import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  desc: String,
  needed: Number,
  responded: Number,
  organizer: String,
  division: String,
  district: String,
  mapLink: String,
  image: String,
  date: String,
  uid: String,
  responders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
