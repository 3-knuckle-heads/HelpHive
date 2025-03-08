import React, { useState, useEffect } from "react";
import EventDisplay from "../components/EventDisplay";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const MyEvents = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        const res = await axios.get(
          "http://localhost:4000/api/v1/events",
          config
        );
        setAllEvents(res.data);
      } catch (err) {
        toast.error("Fetch failed! Please try again.");
        console.error("Fetch failed!", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          My Events
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : allEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allEvents.map((event) =>
              event.organizer === localStorage.getItem("email") ? (
                <EventDisplay key={event.id} event={event} />
              ) : null
            )}
          </div>
        ) : (
          <p className="text-gray-600">You haven't added any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
