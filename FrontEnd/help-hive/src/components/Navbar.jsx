import React from "react";
import { Outlet, Link } from "react-router-dom";
import helphiveLogo from "../assets/helphive.png";

function Navbar() {
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
          {/* <span className="text-gray-600 font-medium px-2 text-3xl mb-5 sm:mb-3">
            Volunteer Network
          </span> */}
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
            <li className="">
              <Link
                to="/Explore"
                className="text-gray-600 hover:text-orange-400 text-lg"
              >
                Explore
              </Link>
            </li>
            {/* <ul className="flex flex-col md:flex-row gap-y-4 gap-x-4 lg:gap-x-6"> */}
            <li className="">
              <Link
                to="/contact"
                className="text-gray-600 hover:text-orange-400 text-lg"
              >
                Contact
              </Link>
            </li>
            <li className="">
              <Link
                to="/about"
                className="text-gray-600 hover:text-orange-400 text-lg"
              >
                About
              </Link>
            </li>
            <li className="mt-2 md:mt-0">
              <Link
                to="/login"
                className="border-2 px-4 py-2 rounded-2xl border-orange-500 font-semibold text-orange-500 hover:text-blue-500 hover:border-blue-500 text-lg"
              >
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
