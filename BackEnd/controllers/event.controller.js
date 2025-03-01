import createEvent_DB from "../services/eventCreateService.js";
import getAllEvents_DB from "../services/eventGetService.js";

export async function createEvent(req, res) {
  try {
    const data = req.body;
    const event = await createEvent_DB(data);

    res.status(201).json({
      event: event,
      message: "Event has been created.",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function getAllEvents(req, res) {
  try {
    const events = await getAllEvents_DB();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
