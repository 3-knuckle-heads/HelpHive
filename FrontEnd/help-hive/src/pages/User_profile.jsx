import React from 'react'

const UserProfile = () => {
  const user = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-01-01",
    profilePic: "https://via.placeholder.com/150", // Placeholder image
    skills: ["JavaScript", "React", "Node.js", "CSS", "Tailwind CSS"],
    events: [
      { title: "Tech Conference 2023", role: "Event Manager" },
      { title: "Hackathon 2022", role: "Volunteer" },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex items-center space-x-4">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={user.profilePic}
            alt={user.fullName}
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{user.fullName}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">Date of Birth: {user.dob}</p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Events</h2>
          <ul className="mt-2">
            {user.events.map((event, index) => (
              <li key={index} className="flex justify-between py-2 border-b">
                <span className="font-semibold">{event.title}</span>
                <span className="text-gray-600">{event.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

  



