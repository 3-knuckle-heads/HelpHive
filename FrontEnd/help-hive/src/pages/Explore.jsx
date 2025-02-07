import React from "react";
import Search_bar from "../components/search_bar";

const events = [
  {
    id: 1,
    title: "Flood relief for Feni",
    needed: 50,
    responded: 30,
    organizer: "Students & Teachers of AUST CSE",
    location: "Feni",
    image: "../assets/flood.jpg",
  },
  {
    id: 2,
    title: "Street cleanup - Mirpur",
    needed: 100,
    responded: 75,
    organizer: "Helping Hands",
    location: "Mirpur",
    image: "../assets/street_cleanup.webp",
  },
  {
    id: 4,
    title: "Food distribution program",
    needed: 15,
    responded: 7,
    organizer: "Relief BD",
    location: "Mugda",
    image: "../assets/food.jpg",
  },
  {
    id: 3,
    title: "Tree Plantation project 2025",
    needed: 80,
    responded: 45,
    organizer: "Go Green Initiative",
    location: "Uttara",
    image: "../assets/trees.jpg",
  },
];

const Explore = () => {
  return (
    <div className="p-6 max-w-auto mx-60">
      <div className="text-center">
        <Search_bar />
      </div>
      <h2 className="text-xl font-semibold mb-4">Featured Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-white shadow-md rounded-lg w-md"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-75 object-cover rounded-lg mb-3"
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
            <div className="flex justify-between">
              <div className="flex justify-start space-x-2 mt-5.5 ml-0.5">
                {/* <span className="text-purple-500">📍</span>*/}
                <p className="text-md">{event.location}</p>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button className="px-4 py-2 border-2 rounded-lg hover:border-green-600 hover:text-green-600">
                  Details
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Respond
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
