import React, { useState } from "react";
import EventDisplay from "../components/EventDisplay";
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
      responded: "",
      organizer: "",
      location: "",
      image: "",
    });
    // console.log(GetAllEvents());
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

          <button
            type="button"
            onClick={handleAddEvent}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          >
            Add Event
          </button>
        </form>
      </div>

      <div className="container mx-auto max-w-4xl mt-12">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          Event List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((e) => (
            <EventDisplay event={e}></EventDisplay>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddEventPage;
