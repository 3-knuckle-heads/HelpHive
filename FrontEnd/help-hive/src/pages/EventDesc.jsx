import React from "react";
import { useState } from "react";
import { GetEventById, UpdateEvent } from "../components/events";
import { useParams } from "react-router-dom";

function EventDesc() {
  const { id } = useParams();

  const [event, setEvent] = useState(GetEventById(parseInt(id)));

  function handleRespond() {
    setEvent((prevEvent) => {
      const updatedEvent = {
        ...prevEvent,
        responded: parseInt(prevEvent.responded) + 1,
      };

      UpdateEvent(updatedEvent);
      return updatedEvent;
    });
  }

  return (
    <div className="min-h-screen">
      <img
        className="w-200 h-70 object-cover bg-center relative mx-auto rounded-2xl mt-2"
        src={event.image}
      ></img>
      <br />
      <h2 className="text-2xl md:text-4xl font-bold text-black text-center">
        {event.title}
      </h2>
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <p className="text-lg text-gray-600">
          Organized by: <span className="font-semibold">{event.organizer}</span>
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Location: <span className="font-semibold">{event.location}</span>
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Volunteers:{" "}
          <span className="font-semibold">
            {event.responded} / {event.needed}
          </span>
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div
            className="bg-green-600 h-3 rounded-full"
            style={{
              width: `${
                event.responded <= event.needed
                  ? (event.responded / event.needed) * 100
                  : 100
              }%`,
            }}
          ></div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            About This Event
          </h2>
          <p className="text-gray-700 mt-2">
            {event.description ||
              "loreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            Skills needed
          </h2>
          <p className="text-gray-700 mt-2">Strong communication, Leadership</p>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={handleRespond}
          >
            Respond
          </button>
          <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-600 hover:text-green-600 transition">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDesc;
