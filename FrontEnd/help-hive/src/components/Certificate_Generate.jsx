import React, { useState, useEffect } from "react";

const CertificatePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Adding a dummy event to localStorage if none exist
    let storedEvents = JSON.parse(localStorage.getItem("myEvents")) || [];
    if (storedEvents.length === 0) {
      storedEvents = [
        { id: 1, title: "Tree Plantation", responded: true, completed: false }
      ];
      localStorage.setItem("myEvents", JSON.stringify(storedEvents));
    }
    setEvents(storedEvents);
  }, []);

  const handleDownload = (event) => {
    alert(`Downloading certificate for ${event.title}`);
  };

  const handleApplyForCertificate = (event) => {
    alert(`Applied for a certificate for ${event.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Certificates</h2>
        <p className="text-gray-600 mb-4">Here are your event participations:</p>

        {events.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li
                key={event.id}
                className="p-4 mb-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-gray-600">
                    Status: {event.completed ? "Completed" : "Ongoing"}
                  </p>
                </div>
                {event.completed ? (
                  <button
                    onClick={() => handleDownload(event)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Download Certificate
                  </button>
                ) : event.responded ? (
                  <button
                    onClick={() => handleApplyForCertificate(event)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Apply for Certificate
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CertificatePage;
