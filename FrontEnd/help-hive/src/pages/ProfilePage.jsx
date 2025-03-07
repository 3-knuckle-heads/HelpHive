import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const ProfilePage = ({ user, onLogout }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [hasChanges, setHasChanges] = useState(false);

  // States for editing
  const [isEditingName, setIsEditingName] = useState(false);
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newLastName, setNewLastName] = useState(user.lastName);

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [newContact, setNewContact] = useState(user.contactNumber || "");

  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(
    user.skills?.map((skill) => ({ value: skill, label: skill })) || []
  );

  // Skill options
  const skillOptions = [
    { value: "Event Planning", label: "Event Planning" },
    { value: "First Aid", label: "First Aid" },
    { value: "Cooking", label: "Cooking" },
    { value: "Teaching", label: "Teaching" },
    { value: "Fundraising", label: "Fundraising" },
  ];

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        const res = await axios.get(
          "http://localhost:4000/api/v1/get_users",
          config
        );

        setAllUsers(res.data);
      } catch (err) {
        console.error("Fetch failed!", err);

        try {
          const data = {
            refreshToken: localStorage.getItem("refreshToken"),
          };

          const rres = await axios.post(
            "http://localhost:4000/api/v1/refresh_tokens",
            data
          );

          console.log("refreshed data: ", rres.data);
          localStorage.setItem("token", rres.data.token);
          localStorage.setItem("refreshToken", rres.data.refreshToken);
        } catch (error) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      const thisUser = allUsers.find(
        (e) => e.email === localStorage.getItem("email")
      );

      if (thisUser) {
        setUpdatedUser({ ...thisUser, profilePic: "" });
      } else {
        setUpdatedUser(null);
      }
    }
  }, [allUsers]);

  useEffect(() => {
    setUpdatedUser(user);
    setNewFirstName(user.firstName);
    setNewLastName(user.lastName);
    setNewContact(user.contactNumber || "");
    setSelectedSkills(
      user.skills?.map((skill) => ({ value: skill, label: skill })) || []
    );
    setHasChanges(false);
  }, [user]);

  // Track if there are any changes
  useEffect(() => {
    const isChanged =
      newFirstName !== user.firstName ||
      newLastName !== user.lastName ||
      newContact !== (user.contactNumber || "") ||
      JSON.stringify(selectedSkills.map((s) => s.value)) !==
        JSON.stringify(user.skills || []);

    setHasChanges(isChanged);
  }, [newFirstName, newLastName, newContact, selectedSkills, user]);

  // Handle Name Change
  const saveName = () => {
    setUpdatedUser((prev) => ({
      ...prev,
      firstName: newFirstName,
      lastName: newLastName,
    }));
    setIsEditingName(false);
  };

  // Handle Contact Change
  const saveContactNumber = () => {
    setUpdatedUser((prev) => ({ ...prev, contactNumber: newContact }));
    setIsEditingContact(false);
  };

  // Handle Skills Change
  const saveSkills = () => {
    const selectedSkillValues = selectedSkills.map((skill) => skill.value);
    setUpdatedUser((prev) => ({
      ...prev,
      skills: selectedSkillValues,
    }));
    setIsEditingSkills(false);
  };

  // Function to Save All Changes (send to backend)
  const saveProfileChanges = () => {
    if (hasChanges) {
      //updateUser(updatedUser);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-center items-center bg-gray-50 p-6 flex-1 w-full">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-6xl relative flex flex-col justify-center">
          {/* Profile Picture */}
          <div className="relative w-48 h-48 mx-auto">
            <img
              src={updatedUser.profilePic || "../assets/flood.jpg"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* Full Name */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            {!isEditingName ? (
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">
                  {(updatedUser.firstName || "Please") +
                    " " +
                    (updatedUser.lastName || "Wait")}
                </p>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Last Name"
                />
                <button
                  onClick={saveName}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Contact Number */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">
              Contact Number
            </label>
            {!isEditingContact ? (
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">
                  {updatedUser.contactNumber || "No contact number provided"}
                </p>
                <button
                  onClick={() => setIsEditingContact(true)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <input
                  type="tel"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter contact number"
                />
                <button
                  onClick={saveContactNumber}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Skills Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">
              Skills
            </label>
            {!isEditingSkills ? (
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">
                  {updatedUser.skills?.join(", ") || "No skills listed"}
                </p>
                <button
                  onClick={() => setIsEditingSkills(true)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Select
                  options={skillOptions}
                  value={selectedSkills}
                  onChange={setSelectedSkills}
                  isMulti
                />
                <button
                  onClick={saveSkills}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Save Changes Button (only appears if changes are made) */}
          {hasChanges && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={saveProfileChanges}
                className="px-6 py-2 bg-green-600 text-white rounded-md"
              >
                Save Profile
              </button>
            </div>
          )}

          {/* Logout Button */}
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
