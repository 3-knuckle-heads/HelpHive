import React from "react";
import Search_bar from "../components/search_bar";
import EventDisplay from "../components/EventDisplay";
import { GetAllEvents } from "../components/events";

const Explore = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center">
        <Search_bar />
      </div>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GetAllEvents().map((e) => (
          <EventDisplay event={e}></EventDisplay>
        ))}
      </div>
    </div>
  );
};

export default Explore;
