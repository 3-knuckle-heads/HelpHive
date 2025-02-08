import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact Details Box */}
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-start border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">ADDRESS</h2>
          <p className="text-gray-700 mb-4">Flat-A2, House-9, Road-18, Sector-07, Uttara, Dhaka-1230, Bangladesh.</p>
          <p className="text-sm text-gray-500 mb-6">Note: Please schedule an appointment before dropping by.</p>
          
          <h2 className="text-2xl font-bold mb-4">EMAIL US</h2>
          <p className="text-blue-500 mb-6">
            <a href="mailto:info@givebangladesh.com">helphive@gmail.com</a>
          </p>
          
          <h2 className="text-2xl font-bold mb-4">PHONE NUMBER</h2>
          <p className="text-blue-500">
            <a href="tel:+8801892775247">+880-16012-03999</a>
          </p>
        </div>

        {/* Contact Form Box */}
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Have a Question?</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Comment or Message
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;