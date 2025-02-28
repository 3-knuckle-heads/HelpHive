import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import helphiveLogo from "../assets/helphive.png";

const Navbar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Manage dropdown state
  const location = useLocation(); // Get current route location

  // Close dropdown when the route changes
  useEffect(() => {
    setIsDropdownOpen(false); // Close dropdown on route change
  }, [location]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="shadow mb-0.5 px-4">
      <div className="relative max-w-screen-lg mx-auto py-4 flex flex-col md:flex-row md:justify-between md:items-center md:h-20">
        <Link
          className="text-2xl flex flex-col sm:flex-row sm:items-center"
          to="./"
        >
          <span className="size-20 md:pt-1.5">
            <img src={helphiveLogo} className="logo" />
          </span>
        </Link>
        <input className="peer hidden" type="checkbox" id="nav-open" />
        <label className="absolute right-2 mt-6 md:hidden" htmlFor="nav-open">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="peer-checked:block md:block hidden"
        >
          <ul className="flex flex-col md:flex-row gap-y-4 gap-x-4 lg:gap-x-6">
            
            {/* Explore dropdown menu */}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-400 text-lg"
              >
                <span>{user ? "Events" : "Explore"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <li>
                    <Link
                      to="/myevents"
                      className="block px-4 py-2 text-gray-600 hover:bg-orange-100"
                    >
                      My Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/eventcreate"
                      className="block px-4 py-2 text-gray-600 hover:bg-orange-100"
                    >
                      Add Event
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/explore"
                      className="block px-4 py-2 text-gray-600 hover:bg-orange-100"
                    >
                      Events
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-orange-400 text-lg"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-600 hover:text-orange-400 text-lg"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-gray-600 hover:text-orange-400 text-lg"
              >
                Faq
              </Link>
            </li>
            <li className="mt-2 md:mt-0">
              <Link
                to="/login"
                className="border-2 px-4 py-2 rounded-2xl border-orange-500 font-semibold text-orange-500 hover:text-blue-500 hover:border-blue-500 text-lg"
              >
                {user ? "Profile" : "Log in"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
