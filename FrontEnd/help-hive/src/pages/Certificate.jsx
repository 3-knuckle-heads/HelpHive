import React, { useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import certificateTemplate from "../assets/Certificateimage.png";

const Certificate = ({ name, course }) => {
  const ref = useRef(null);

  // Customize text position and font size
  const nameStyle = {
    top: "13rem",
    left: "0",
    fontSize: "5rem",
  };

  const courseStyle = {
    top: "22rem",
    left: "0",
    fontSize: "2rem",
  };

  const onButtonClick = useCallback(() => {
    if (ref.current === null) return;

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "HelpHive_Certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  }, [ref]);

  return (
    <div className="flex flex-col items-center justify-center min-h-100 bg-gray-100 p-4">
      <div
        ref={ref}
        className="relative w-full max-w-3xl h-auto bg-red-500 rounded-lg shadow-lg overflow-hidden"
      >
        <img
          src={certificateTemplate}
          alt="Certificate"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 text-black">
          <h1
            className="font-bold italic absolute text-center w-full"
            style={nameStyle}
          >
            {name || "Pabak Dev"}
          </h1>
          <p className="italic absolute text-center w-full" style={courseStyle}>
            {course || "HelpHive"}
          </p>
        </div>
      </div>
      <button
        onClick={onButtonClick}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
