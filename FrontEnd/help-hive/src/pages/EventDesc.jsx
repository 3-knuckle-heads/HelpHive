import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Certificate from "./Certificate";
import axios from "axios";

function EventDesc() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responders, setResponders] = useState([]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        const res = await axios.get(
          "http://localhost:4000/api/v1/get_users",
          config
        );
        setAllUsers(res.data);
      } catch (err) {
        console.error("User fetch failed!", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (event && allUsers.length > 0) {
      const eventResponders = allUsers.filter((user) =>
        event.responders.includes(user._id)
      );
      setResponders(eventResponders);
    }
  }, [event, allUsers]);

  const handleRespond = async () => {
    if (!event) return;

    const data = { eventId: event._id };
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      await axios.patch(
        "http://localhost:4000/api/v1/respond_event",
        data,
        config
      );
      toast.success("Response recorded!");

      setEvent((prevEvent) => ({
        ...prevEvent,
        responded: prevEvent.responded + 1,
        responders: [...prevEvent.responders, localStorage.getItem("userId")],
      }));
    } catch (e) {
      console.error("Error responding to event: ", e);
    }
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

  const userEmail = localStorage.getItem("email"); // Get logged-in user's email
  const hasResponded = responders.some(
    (responder) => responder.email === userEmail
  );

  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => setIsCollapsed((prevState) => !prevState);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found!</p>;

  return (
    <div className="min-h-screen">
      <ToastContainer position="bottom-right" autoClose={2000} />
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
            style={{ width: `${(event.responded / event.needed) * 100}%` }}
          ></div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            About This Event
          </h2>
          <p className="text-gray-700 mt-2">
            {event.desc || "No description available."}
          </p>
        </div>

        <div className="flex space-x-4 mt-6 mb-4">
          <button
            className={`px-6 py-3 rounded-lg transition ${
              hasResponded
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            onClick={handleRespond}
            disabled={hasResponded}
          >
            {hasResponded ? "Responded" : "Respond"}
          </button>
          <button
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-600 hover:text-green-600 transition"
            onClick={handleShare}
          >
            Share
          </button>
        </div>
        {/* Responders List */}
        <div className="mt-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Responders</h2>
          {responders.length > 0 ? (
            <div className="max-h-60 overflow-y-auto border p-4 rounded-md mt-4">
              {responders.map((responder) => (
                <div
                  key={responder._id}
                  className="flex items-center p-2 border-b"
                >
                  <img
                    src={
                      responder.profilePic || "https://via.placeholder.com/40"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">
                      {responder.firstName + " " + responder.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{responder.email}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-2">No responders yet.</p>
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={toggleCollapse}
            className="w-full text-left bg-blue-400 text-white font-bold py-2 px-5 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            {isCollapsed ? "Show Certificate" : "Hide Certificate"}
          </button>

          {!isCollapsed && (
            <div className="mt-4">
              <Certificate name="Pabak Dev" course="HelpHive" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDesc;
