import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  needed: Number,
  responded: Number,
  organizer: String,
  location: String,
  image: String,
  date: String,
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
