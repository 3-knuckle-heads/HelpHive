let events = [
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

export function GetAllEvents() {
  return events;
}

export function SetAllEvents(newEvents) {
  events = newEvents;
}

export function UpdateEvent(updatedEvent) {
  for (var e in events) {
    if (events[e].id === updatedEvent.id) {
      events[e] = updatedEvent;
      break;
    }
  }
}

export function GetEventById(id) {
  for (var e in events) {
    if (events[e].id === id) {
      return events[e];
    }
  }
}

//export default events;
