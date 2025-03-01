import React, { useState, useEffect } from "react";

const ProfilePage = ({ user, onLogout }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [newContact, setNewContact] = useState("");

  // const [isEditingSkills, setIsEditingSkills] = useState(false);
  // const [selectedSkills, setSelectedSkills] = useState(user.skills || []);

  const skillOptions = [
    { value: "Event Planning", label: "Event Planning" },
    { value: "First Aid", label: "First Aid" },
    { value: "Cooking", label: "Cooking" },
    { value: "Teaching", label: "Teaching" },
    { value: "Fundraising", label: "Fundraising" },
  ];
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePic(reader.result);
        setUpdatedUser((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
    setIsEditingProfilePic(false);
  };

  const handleCancelProfilePicEdit = () => {
    setIsEditingProfilePic(false);
    setNewProfilePic(null);
  };

  const saveContactNumber = () => {
    setUpdatedUser((prev) => ({ ...prev, contactNumber: newContact }));
    setIsEditingContact(false);
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill) ? prevSkills.filter((s) => s !== skill) : [...prevSkills, skill]
    );
  };

  const saveSkills = () => {
    setUpdatedUser((prev) => ({ ...prev, skills: selectedSkills }));
    setIsEditingSkills(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      <div className="flex justify-center items-center bg-gray-50 p-6 flex-1 w-full">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-6xl relative flex flex-col justify-center">
          
          <div className="relative w-48 h-48 mx-auto">
            <img
              src={
                newProfilePic || updatedUser.profilePic || "../assets/flood.jpg"
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
              onClick={() => setIsEditingProfilePic(true)}
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            {isEditingProfilePic && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-semibold mb-4">
                    Edit Profile Picture
                  </h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="mb-4"
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={handleCancelProfilePicEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCancelProfilePicEdit}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
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
              <p className="text-lg font-medium pl-2 sm:pl-4">
                {updatedUser.email}
              </p>
            </div>
          </div>

          {/* Display Contact Number (No editable input here) */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">
              Contact Number
            </label>
            <p className="text-lg font-medium">
              {updatedUser.contactNumber || "No contact number provided"}
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
    </div>
  );
};

export default ProfilePage;
