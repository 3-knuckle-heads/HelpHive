import React from "react";
import helphiveLogo from "../assets/helphive.png";

function Navbar() {
  return (
    <header class="shadow mb-2">
      <div class="max-w-screen-lg mx-auto py-4">
        <a class="text-2xl flex items-center" href="#">
          <span class="text-4xl">
            <img
              class="object-scale-down h-20"
              src={helphiveLogo}
              className="logo"
            />
          </span>
          <span class="text-black font-extrabold">
            Volunteer Management App
          </span>
        </a>
      </div>
    </header>
  );
}

export default Navbar;
