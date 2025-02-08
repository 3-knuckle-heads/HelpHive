import React, { useState } from "react";

const ProfilePage = ({ user, onLogout }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleEdit = () => setEditMode(true);

  const handleSave = () => {
    setEditMode(false);
    console.log("Updated User:", updatedUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedUser((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6 w-screen h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-6xl relative h-full flex flex-col justify-center">
        <div className="w-48 h-48 mx-auto">
          <img
            src={updatedUser.profilePic || "../assets/flood.jpg"}
            alt=""
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <h2 className="text-4xl font-extrabold text-center text-gray-800 my-6">
          User Profile
        </h2>
        {editMode && (
          <div className="mb-4 mt-16">
            <label
              htmlFor="profilePic"
              className="block text-sm font-medium text-gray-600"
            >
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            ) : (
              <p className="text-lg font-medium">{updatedUser.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <p className="text-lg font-medium">{updatedUser.email}</p>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={updatedUser.dob || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            disabled={!editMode}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600">
            Events Volunteered
          </label>
          <p className="text-lg font-medium">
            {updatedUser.eventsVolunteered || "No events volunteered"}
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600">
            Events Hosted
          </label>
          <p className="text-lg font-medium">
            {updatedUser.eventsHosted || "No events hosted"}
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600">
            Skills
          </label>
          <p className="text-lg font-medium">
            {updatedUser.skills || "No skills listed"}
          </p>
        </div>

        {editMode && (
          <div className="mt-6">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save Changes
            </button>
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={onLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        {!editMode && (
          <div className="mt-4 text-center">
            <button
              onClick={handleEdit}
              className="text-sm text-blue-500 hover:underline"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
