import React from "react";
import Nayempic from "../assets/Nayem.jpeg";
import Pabakpic from "../assets/Pabak.jpeg";
import Durjoypic from "../assets/Durjoy.jpg";

function About_Us() {
  return (
    <>
      <div className="our-mission text-center p-8">
        <h1 className="text-4xl font-bold mb-6">About HelpHive</h1>
        <div className="content max-w-2xl mx-auto leading-relaxed">
          <p className="mb-4">
            HelpHive established in 2025 to provide a unique pathway for the
            people of Bangladesh, to get involved in the development of the
            country through philanthropy and volunteering.
          </p>
          <p className="mb-4">
            Founded on the principle of inclusivity, we work tirelessly to
            ensure that everyone, regardless of their background, has an
            opportunity to contribute and make a difference. From grassroots
            initiatives to large-scale projects, our platform is designed to
            make volunteering easy, accessible, and impactful.
          </p>
          <p>
            Join us in our journey to empower communities and create lasting
            change. Whether you're looking to volunteer or seeking dedicated
            individuals to support your cause, HelpHive is here to connect,
            support, and inspire.
          </p>
        </div>

        <div>
          <h1 className="text-2xl mt-10 font-bold">Creators</h1>
        </div>

        <div className="flex justify-center mt-8 space-x-8">
          
          <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-x-10">
            
            {/*Nayem er chobi*/ }
          <div className="text-center">
            <img
              src={Nayempic}
              className="rounded-full size-70 mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">Jannatul Nayem</h2>
            <p className="text-sm text-gray-600">Creator</p>
          </div> 

          {/*Durjoy er chobi*/ }
          <div className="text-center">
            <img
              src={Durjoypic}
              className="rounded-full size-70 mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">Ashfaq Hossain Bhuiyan</h2>
            <p className="text-sm text-gray-600">Creator</p>
          </div>

            {/*Pabak er chobi*/ }
            <div className="text-center">
            <img
              src={Pabakpic}
              className="rounded-full size-70 mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">Pabak Dev</h2>
            <p className="text-sm text-gray-600">Creator</p>
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default About_Us;
