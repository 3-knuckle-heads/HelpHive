import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEventPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title: "",
    needed: "",
    responded: "0",
    organizer: currentUser || "HelpHive",
    location: "",
    image: "",
    latitude: null,
    longitude: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent((prevState) => ({ ...prevState, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = () => {
    const existingEvents = JSON.parse(localStorage.getItem("myEvents")) || [];
    const newId = existingEvents.length + 1;

    const updatedEvents = [...existingEvents, { ...newEvent, id: newId }];

    localStorage.setItem("myEvents", JSON.stringify(updatedEvents));

    alert("Event added successfully!");
    navigate("/myevents"); // Redirect to My Events page

    setNewEvent({
      title: "",
      needed: "",
      responded: "0",
      organizer: currentUser || "HelpHive",
      location: "",
      image: "",
      latitude: null,
      longitude: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          Add New Event
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Needed Volunteers
            </label>
            <input
              type="number"
              name="needed"
              value={newEvent.needed}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={newEvent.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Event Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>

          <button
            type="button"
            onClick={handleAddEvent}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventPage;
