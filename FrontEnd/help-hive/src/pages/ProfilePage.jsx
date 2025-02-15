import React, { useState, useEffect } from "react";

const ProfilePage = ({ user, onLogout }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6 w-screen h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-6xl relative h-full flex flex-col justify-center">
        <div className="w-48 h-48 mx-auto">
          <img
            src={updatedUser.profilePic || "../assets/flood.jpg"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <h2 className="text-4xl font-extrabold text-center text-gray-800 my-6">
          {updatedUser.firstName + " " + updatedUser.lastName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>

            <p className="text-lg font-medium">
              {updatedUser.firstName + " " + updatedUser.lastName}
            </p>
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
          <p className="text-lg font-medium">
            {updatedUser.dateOfBirth || "-"}
          </p>
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

        <div className="mt-4 flex justify-end">
          <button
            onClick={onLogout}
            className="py-2 px-4 text-red-600 border-2 border-red-600 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
