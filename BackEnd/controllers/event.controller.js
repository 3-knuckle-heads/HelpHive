import createEvent_DB from "../services/eventCreateService.js";

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
