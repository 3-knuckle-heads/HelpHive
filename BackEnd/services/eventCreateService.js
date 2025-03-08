import { cloudinary } from "../cloudinaryConfig.js";
import eventModel from "../models/event.model.js";

async function uploadToCloudinary(file) {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "event_images",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image");
  }
}

export async function createEvent_DB(userData, file) {
  try {
    let imageUrl = null;

    if (file) {
      imageUrl = await uploadToCloudinary(file);
    }

    const { title, desc, needed, responded, organizer, location, date } =
      userData;

    console.log("userData", userData);

    let uid = title + "_" + organizer + "_" + location;
    uid.replace(" ", "_");
    console.log("uid", uid);

    const exists = await eventModel.findOne({ uid });

    if (exists) {
      console.log("exists", exists);
      throw new Error(
        "Event with same title, organizer & location already exists"
      );
    }

    const nEvent = new eventModel({
      title,
      desc,
      needed,
      responded,
      organizer,
      location,
      image: imageUrl,
      date,
      uid,
    });

    return await nEvent.save();
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

export default createEvent_DB;
