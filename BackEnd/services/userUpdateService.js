import user from "../models/user.model.js";

async function updateUser_DB(userData, file) {
  try {
    console.log("userData", userData);

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
      }
    );
  } catch (error) {
    console.log("error", error);
  }

  // return await nUser.save();
}

export default updateUser_DB;
