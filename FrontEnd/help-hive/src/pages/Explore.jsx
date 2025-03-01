import React, { useState, useEffect } from "react";
import Search_bar from "../components/search_bar";
import EventDisplay from "../components/EventDisplay";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);

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
    <div className="p-6 max-w-7xl mx-auto">
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
      <div className="text-center">
        <Search_bar />
      </div>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allEvents.map((e) => (
          <EventDisplay event={e}></EventDisplay>
        ))}
      </div>
    </div>
  );
};

export default Explore;
