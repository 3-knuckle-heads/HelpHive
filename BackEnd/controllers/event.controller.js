import createEvent_DB from "../services/eventCreateService.js";
import getAllEvents_DB from "../services/eventGetService.js";
import respondToEvent from "../services/eventRespondService.js";

export async function createEvent(req, res) {
  try {
    const data = req.body;
    const file = req.file;
    const event = await createEvent_DB(data, file);

    res.status(201).json({
      event,
      message: "Event has been created successfully.",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

export async function respondToEventController(req, res) {
  try {
    const { eventId, userId } = req.body;

    const updatedEvent = await respondToEvent(eventId, userId);

    res.status(200).json({
      success: true,
      message: "User responded successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
