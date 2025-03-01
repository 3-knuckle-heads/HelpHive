import React, { useState } from "react";
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
    needed: "",
    responded: "0",
    organizer: currentUser || "HelpHive",
    location: "",
    image: "",
    date: "",
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
    setNewEvent((prevState) => ({
      ...prevState,
      image: "",
    }));
    const data = newEvent;

    console.log("data", data);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .post("http://localhost:4000/api/v1/create_event", data, config)
      .then(function (res) {
        toast.info("Event added successfully!");
        console.log(res.data);

        setNewEvent({
          title: "",
          needed: "",
          responded: "0",
          organizer: currentUser || "HelpHive",
          location: "",
          image: "",
          date: "",
        });

        setTimeout(() => {
          navigate("/myevents");
        }, 2000);
      })
      .catch(function (err) {
        toast.error("Event creation failed! Please try again.");
        console.log(err);
      });
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
              onChange={handleImageChange}
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
