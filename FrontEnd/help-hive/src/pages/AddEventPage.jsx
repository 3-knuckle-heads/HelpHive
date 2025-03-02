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

  const handleImageChange = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "main_preset"); // Replace with your preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzi8td0tj/image/upload",
        formData
      );

      if (response.data.secure_url) {
        return response.data.secure_url; // Return image URL after upload
      } else {
        console.error("Upload failed:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!newEvent.image && newEvent.file) {
      toast.info("Uploading image, please wait...");

      // Wait for image upload
      const uploadedImageUrl = await handleImageChange(newEvent.file);
      console.log("uploadedImageUrl", uploadedImageUrl);

      if (!uploadedImageUrl) {
        toast.error("Image upload failed!");
        return;
      }

      // Update event with uploaded image URL
      setNewEvent((prevState) => ({
        ...prevState,
        image: uploadedImageUrl,
        file: null, // Remove file after uploading
      }));
    }
  };

  // useEffect will trigger once the image is uploaded and the state is updated
  useEffect(() => {
    if (newEvent.image && newEvent.file === null) {
      // Now send the event data after the image URL has been updated
      const updatedEvent = { ...newEvent, file: undefined }; // Remove file before sending
      console.log("Final Event Data:", updatedEvent);

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .post("http://localhost:4000/api/v1/create_event", updatedEvent, config)
        .then((res) => {
          toast.success("Event added successfully!");
          console.log(res.data);

          // Clear the form
          setNewEvent({
            title: "",
            desc: "",
            needed: "",
            responded: "0",
            organizer: currentUser || "HelpHive",
            location: "",
            image: "",
            date: "",
            file: null, // Clear file input
          });

          // Navigate after 2 seconds
          setTimeout(() => {
            navigate("/myevents");
          }, 2000);
        })
        .catch((err) => {
          toast.error("Event creation failed! Please try again.");
          console.log(err);
        });
    }
  }, [newEvent, navigate]);

  // Handle file selection & upload
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
