import eventModel from "../models/event.model.js";

async function respondToEvent_DB(eventId, userId) {
  try {
    const event = await eventModel.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    if (event.responders.includes(userId)) {
      throw new Error("User has already responded to this event");
    }

    const updatedEvent = await eventModel.findByIdAndUpdate(
      eventId,
      { $push: { responders: userId }, $inc: { responded: 1 } },
      { new: true }
    );

    return updatedEvent;
  } catch (error) {
    console.log("error", error);
    throw new Error(error.message);
  }
}

export default respondToEvent_DB;
