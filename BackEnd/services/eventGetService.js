import event from "../models/event.model.js";

async function getAllEvents_DB(req, res) {
  const events = await event.find({});
  return events;
}

export default getAllEvents_DB;
