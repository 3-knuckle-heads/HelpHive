import React from "react";

const EventDisplay = ({ event }) => {
  return (
    <div key={event.id} className="p-4 bg-white shadow-md rounded-lg w-full">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-medium">{event.title}</h3>
      <p className="text-sm text-gray-500">By {event.organizer}</p>
      <p className="text-sm text-gray-600 mt-1">
        {event.responded} / {event.needed} volunteers responded
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{
            width: `${(event.responded / event.needed) * 100}%`,
          }}
        ></div>
      </div>
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
          <p className="text-md text-gray-700">{event.location}</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="px-4 py-2 border-2 rounded-lg hover:border-green-600 hover:text-green-600">
            Details
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Respond
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;
