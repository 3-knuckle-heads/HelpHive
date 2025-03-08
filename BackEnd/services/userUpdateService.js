import user from "../models/user.model.js";
import { cloudinary } from "../cloudinaryConfig.js";

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

async function updateUser_DB(userData, file) {
  try {
    console.log("userData", userData);

    let imageUrl = null;

    if (file) {
      console.log("Uploading image...");
      imageUrl = await uploadToCloudinary(file);
    }

    const {
      firstName,
      lastName,
      email,
      password,
      role,
      skills,
      contactNumber,
    } = userData;

    return await user.findOneAndUpdate(
      { email },
      {
        firstName: firstName,
        lastName: lastName,
        password: password,
        role: role,
        skills: skills,
        contactNumber: contactNumber,
        profilePic: imageUrl,
      }
    );
  } catch (error) {
    console.log("error", error);
  }

  // return await nUser.save();
}

export default updateUser_DB;
