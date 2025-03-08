import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

// Divisions and their corresponding districts
const bangladeshLocations = {
  Dhaka: [
    "Dhaka",
    "Gazipur",
    "Narayanganj",
    "Tangail",
    "Manikganj",
    "Munshiganj",
  ],
  Chattogram: [
    "Chattogram",
    "Cox's Bazar",
    "Feni",
    "Khagrachhari",
    "Rangamati",
  ],
  Khulna: ["Khulna", "Jessore", "Satkhira", "Bagerhat", "Kushtia"],
  Rajshahi: ["Rajshahi", "Bogra", "Naogaon", "Pabna", "Sirajganj"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Barishal: ["Barishal", "Patuakhali", "Bhola", "Jhalokathi"],
  Rangpur: ["Rangpur", "Dinajpur", "Thakurgaon", "Gaibandha", "Nilphamari"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Sherpur", "Netrokona"],
};

const AddEventPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title: "",
    desc: "",
    needed: "",
    responded: "0",
    organizer: localStorage.getItem("email") || "HelpHive",
    division: "",
    district: "",
    date: "",
    file: null, // Initialize file as null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "division" && { district: "" }), // Reset district when division changes
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
    formData.append("file", newEvent.file);
    formData.append("title", newEvent.title);
    formData.append("desc", newEvent.desc);
    formData.append("needed", newEvent.needed);
    formData.append("responded", newEvent.responded);
    formData.append("organizer", newEvent.organizer);
    formData.append("mapLink", newEvent.mapLink);
    formData.append("division", newEvent.division);
    formData.append("district", newEvent.district);
    formData.append("date", newEvent.date);

    console.log("newEvent.mapLink", newEvent.mapLink);
    console.log("newEvent.title", newEvent.title);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
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

      setNewEvent({
        title: "",
        desc: "",
        needed: "",
        responded: "0",
        organizer: localStorage.getItem("email") || "HelpHive",
        division: "",
        district: "",
        date: "",
        file: null,
      });

      setTimeout(() => {
        navigate("/myevents");
      }, 2000);
    } catch (error) {
      toast.error(
        "Event creation failed! Event with same data may already exist."
      );
      console.error(error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewEvent((prevState) => ({ ...prevState, file }));
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
              Division
            </label>
            <select
              name="division"
              value={newEvent.division}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            >
              <option value="">Select a Division</option>
              {Object.keys(bangladeshLocations).map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              District
            </label>
            <select
              name="district"
              value={newEvent.district}
              onChange={handleChange}
              disabled={!newEvent.division}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            >
              <option value="">Select a District</option>
              {newEvent.division &&
                bangladeshLocations[newEvent.division].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Google Maps Location Link
            </label>
            <input
              type="text"
              name="mapLink"
              value={newEvent.mapLink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              placeholder="Paste Google Maps link here"
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
