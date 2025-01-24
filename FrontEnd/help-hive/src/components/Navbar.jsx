import React from "react";
import helphiveLogo from "../assets/helphive.png";

function Navbar() {
  return (
    <header className="shadow mb-2 px-4">
      <div className="relative max-w-screen-lg mx-auto py-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <a className="text-2xl flex items-center" href="#">
          <span className="size-20">
            <img src={helphiveLogo} className="logo" />
          </span>
          <span className="text-black font-bold px-2 mb-1 lg:mb-2 text-xl md:text-2xl lg:text-3xl">
            Volunteer Network
          </span>
        </a>
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
          <ul className="flex flex-col gap-y-4 md:flex-row gap-x-2 lg:gap-x-6">
            <li className="">
              <a href="#" className="text-gray-600 hover:text-orange-400">
                Contact
              </a>
            </li>
            <li className="">
              <a href="#" className="text-gray-600 hover:text-orange-400">
                About
              </a>
            </li>
            <li className="mt-2 md:mt-0">
              <a
                href="#"
                className="border-2 px-4 py-2 rounded-2xl border-orange-500 font-semibold text-orange-500 hover:text-blue-500 hover:border-blue-500"
              >
                Log in
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
