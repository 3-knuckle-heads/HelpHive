import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function EventDesc() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
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
        console.error("Fetch failed!", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (allEvents.length > 0) {
      const selectedEvent = allEvents.find((e) => e._id === id);
      setEvent(selectedEvent || null);
    }
  }, [allEvents, id]);

  const handleRespond = () => {
    if (!event) return;

    const data = {
      eventId: event._id,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    // console.log("data", data);

    try {
      axios.patch("http://localhost:4000/api/v1/respond_event", data, config);
    } catch (e) {
      console.log("e: ", e);
    }

    // setEvent((prevEvent) => ({
    //   ...prevEvent,
    //   responded: prevEvent.responded + 1,
    // }));
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.info("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying URL:", err);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found!</p>;

  return (
    <div className="min-h-screen">
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
      <img
        className="w-200 h-70 object-cover bg-center relative mx-auto rounded-2xl mt-2"
        src={event.image || ""}
        alt="Event"
      />
      <h2 className="text-2xl md:text-4xl font-bold text-black text-center">
        {event.title}
      </h2>
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <p className="text-lg text-gray-600">
          Organized by: <span className="font-semibold">{event.organizer}</span>
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Division: <span className="font-semibold">{event.division}</span>
        </p>
        <p className="text-lg text-gray-700 mt-2">
          District: <span className="font-semibold">{event.district}</span>
        </p>
        {event.mapLink && (
          <p className="text-lg text-blue-600 mt-2">
            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View on Google Maps
            </a>
          </p>
        )}
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
            {event.desc ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={handleRespond}
          >
            Respond
          </button>
          <button
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-600 hover:text-green-600 transition"
            onClick={handleShare}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDesc;
