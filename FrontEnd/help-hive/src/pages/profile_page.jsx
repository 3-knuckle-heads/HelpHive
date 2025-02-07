import React, { useState } from 'react';

const ProfilePage = ({ user, onLogout }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleEdit = () => setEditMode(true);

  const handleSave = () => {
    setEditMode(false);
    // Here you could make an API call to save the updated user data
    console.log('Updated User:', updatedUser);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">User Profile</h2>

        <div className="mb-4 flex justify-center">
          <img
            src={updatedUser.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {editMode && (
          <div className="mb-4">
            <label htmlFor="profilePic" className="block text-sm font-medium text-gray-600">Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          ) : (
            <p>{updatedUser.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <p>{updatedUser.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={updatedUser.dob || ''}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            disabled={!editMode}
          />
        </div>

        {editMode && (
          <div className="mb-4">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={onLogout}
            className="text-sm text-blue-500 hover:underline"
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
