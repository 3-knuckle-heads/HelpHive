import React from "react";

const Button = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-left space-y-4 sm:space-y-0 sm:space-x-4">
      <button className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition">
        Explore
      </button>
      <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition">
        Join us
      </button>
    </div>
  );
};

export default Button;
