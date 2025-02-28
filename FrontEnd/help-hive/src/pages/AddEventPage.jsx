import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { GetAllEvents, SetAllEvents } from "../components/events";

const AddEventPage = () => {
  const [events, setEvents] = useState(GetAllEvents());
  const [newEvent, setNewEvent] = useState({
    title: "",
    needed: "",
    responded: "0",
    organizer: "HelpHive",
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

  const handleAddEvent = () => {
    const newId = events.length + 1;
    const newEv = [
      ...events,
      {
        ...newEvent,
        id: newId,
        image: URL.createObjectURL(newEvent.image),
      },
    ];

    setEvents(newEv);
    SetAllEvents(newEv);

    setNewEvent({
      title: "",
      needed: "",
      responded: "0",
      organizer: "HelpHive",
      location: "",
      image: "",
      latitude: null,
      longitude: null,
    });
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setNewEvent({
      ...newEvent,
      latitude: lat,
      longitude: lng,
      location: `Lat: ${lat}, Lng: ${lng}`, // Optional: Set a string or use reverse geocoding to get a location name.
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
              Location
            </label>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              readOnly
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
              onChange={(e) =>
                setNewEvent({ ...newEvent, image: e.target.files[0] })
              }
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>

          {/* Google Map */}
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              id="event-location-map"
              mapContainerStyle={{
                height: "400px",
                width: "100%",
              }}
              center={{ lat: 0, lng: 0 }}
              zoom={2}
              onClick={handleMapClick}
            >
              {newEvent.latitude && newEvent.longitude && (
                <Marker
                  position={{
                    lat: newEvent.latitude,
                    lng: newEvent.longitude,
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>

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
