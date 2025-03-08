import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventDisplay = ({ event }) => {
  const navigate = useNavigate();
  const [thisEvent, setThisEvent] = useState(event);

  function RespondButtonHandler() {
    setThisEvent((prevEvent) => {
      const updatedEvent = {
        ...prevEvent,
        responded: parseInt(prevEvent.responded) + 1,
      };
      return updatedEvent;
    });
  }

  function DetailsButtonHandler() {
    console.log("thisEvent._id", thisEvent._id);
    navigate("/eventview/" + thisEvent._id);
  }

  return (
    <div key={thisEvent.id} className="p-4 bg-white shadow-md rounded-lg w-full">
      <img
        src={thisEvent.image}
        alt={thisEvent.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-medium">{thisEvent.title}</h3>
      <p className="text-sm text-gray-500">By {thisEvent.organizer}</p>
      <p className="text-sm text-gray-600 mt-1">
        {thisEvent.responded} / {thisEvent.needed} volunteers responded
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{
            width: `${
              thisEvent.responded <= thisEvent.needed
                ? (thisEvent.responded / thisEvent.needed) * 100
                : 100
            }%`,
          }}
        ></div>
      </div>

      {/* 🔹 Show District Here */}
      <p className="text-md text-gray-700 mt-2">
        <strong>District:</strong> {thisEvent.district || "Not specified"}
      </p>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2C8.13 2 5 5.13 5 9c0 3.92 5 11 7 13 2-2 7-9.08 7-13 0-3.87-3.13-7-7-7z"
            />
          </svg>
          <p className="text-md text-gray-700">{thisEvent.location}</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            className="px-4 py-2 border-2 rounded-lg hover:border-green-600 hover:text-green-600"
            onClick={DetailsButtonHandler}
          >
            Details
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={RespondButtonHandler}
          >
            Respond
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;
