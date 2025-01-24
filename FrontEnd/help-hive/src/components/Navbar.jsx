import React from "react";
import helphiveLogo from "../assets/helphive.png";

function Navbar() {
  return (
    <header className="shadow mb-2">
      <div className="max-w-screen-xl mx-auto py-4 flex justify-between items-center">
        <a className="text-2xl flex items-center" href="#">
          <span className="size-20">
            <img src={helphiveLogo} className="logo" />
          </span>
          <span class="text-black font-extrabold px-2 mb-3">
            Volunteer Management Application
          </span>
        </a>
        <nav className="">
          <ul className="flex xl:gap-x-8">
            <li className="">
              <a href="#" className="hover:text-orange-300">
                Contact
              </a>
            </li>
            <li className="">
              <a href="#" className="hover:text-orange-300">
                About
              </a>
            </li>
            <li className="">
              <a
                href="#"
                className="border-2 px-4 py-2 rounded-2xl border-orange-400 font-semibold text-orange-400 hover:text-blue-400 hover:border-blue-400"
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
