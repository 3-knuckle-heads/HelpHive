import event from "../models/event.model.js";

async function createEvent_DB(userData) {
  const { title, desc, needed, responded, organizer, location, image, date } =
    userData;

  const nEvent = new event({
    title: title,
    desc: desc,
    needed: needed,
    responded: responded,
    organizer: organizer,
    location: location,
    image: image,
    date: date,
  });

  return await nEvent.save();
}

export default createEvent_DB;
