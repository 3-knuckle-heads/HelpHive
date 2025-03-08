import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const bangladeshCities = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
  "Cumilla",
  "Narayanganj",
];

const AddEventPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title: "",
    desc: "",
    needed: "",
    responded: "0",
    organizer: currentUser || "HelpHive",
    location: "",
    image: "",
    date: "",
    file: null, // Initialize file as null
  });
  const [imageUploaded, setImageUploaded] = useState(false); // Track image upload status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!newEvent.file) {
      toast.error("Please select an image!");
      return;
    }

    toast.info("Creating your event");

    const formData = new FormData();
    formData.append("file", newEvent.file); // Append file
    formData.append("title", newEvent.title);
    formData.append("desc", newEvent.desc);
    formData.append("needed", newEvent.needed);
    formData.append("responded", newEvent.responded);
    formData.append("organizer", newEvent.organizer);
    formData.append("location", newEvent.location);
    formData.append("date", newEvent.date);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file upload
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/create_event",
        formData,
        config
      );
      toast.success("Event added successfully!");
      console.log(response.data);

      // Clear the form
      setNewEvent({
        title: "",
        desc: "",
        needed: "",
        responded: "0",
        organizer: currentUser || "HelpHive",
        location: "",
        image: "", // This will be handled by backend
        date: "",
        file: null,
      });

      // Navigate after 2 seconds
      setTimeout(() => {
        navigate("/myevents");
      }, 2000);
    } catch (error) {
      toast.error("Event creation failed! Please try again.");
      console.error(error);
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewEvent((prevState) => ({ ...prevState, file })); // Store file
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="bottom-right" autoClose={2000} />
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
              Event Description
            </label>
            <input
              type="text"
              name="desc"
              value={newEvent.desc}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Event Date
              </label>
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Location
            </label>
            <select
              name="location"
              value={newEvent.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            >
              <option value="">Select a city</option>
              {bangladeshCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Event Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
          <button
            type="button"
            onClick={handleAddEvent}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventPage;
