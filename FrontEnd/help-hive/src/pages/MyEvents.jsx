import React, { useState } from "react";
import { GetAllEvents } from "../components/events";
import EventDisplay from "../components/EventDisplay";

const MyEvents = () => {
  const allEvents = GetAllEvents();
  const [userEvents, setUserEvents] = useState(
    allEvents.filter((event) => event.organizer === "HelpHive")
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          My Events
        </h2>

        {userEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userEvents.map((event) => (
              <EventDisplay key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You haven't added any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
