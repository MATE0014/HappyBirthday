"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function BalloonsGallery({ onGifClick }) {
  const photos = [
    "./sample.jfif",
    "./sample.jfif",
    "./sample.jfif",
    "./sample.jfif",
    "./sample.jfif",
    "./sample.jfif",
    "./sample.jfif",
    "./sample.jfif",
    "./sample.jfif",
    "./sample.jfif",
    "/hidden.gif",
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [borderColors, setBorderColors] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup

  // Generate random colors only once when the component mounts
  useEffect(() => {
    const colors = photos.map(() => getRandomColor());
    setBorderColors(colors);
  }, []); // Empty dependency array ensures this runs only once

  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "pink", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const photosToShow = 4; // Number of photos to show at a time on larger screens
  const photosToShowMobile = 2; // Number of photos to show at a time on smaller screens

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % photos.length); // Move one photo to the right
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length); // Move one photo to the left
  };

  // Handle GIF click
  const handleGifClick = () => {
    setShowPopup(true); // Show the popup
    onGifClick(); // Enable Task 4 in the checklist
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-center tracking-wider">
        Wanted: Alive & Smiling
      </h2>

      {/* Gallery */}
      <div className="flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="p-2 text-white bg-accent rounded-full hover:bg-accent-dark transition-colors"
        >
          <FaArrowLeft />
        </button>
        <div className="flex space-x-2 sm:space-x-4 mx-2 sm:mx-4 overflow-hidden">
          {Array.from({ length: window.innerWidth < 768 ? photosToShowMobile : photosToShow }).map(
            (_, index) => {
              const photoIndex = (startIndex + index) % photos.length;
              const isGif = photos[photoIndex].endsWith(".gif");

              // Ensure the GIF doesn't appear in the first 4 (or 2 for smaller screens) images
              if (photoIndex === photos.length - 1 && startIndex <= photosToShow) {
                return null;
              }

              return (
                <div
                  key={photoIndex}
                  className="w-24 h-36 sm:w-40 sm:h-56 rounded-full flex items-center justify-center overflow-hidden border-4 cursor-pointer"
                  style={{ borderColor: borderColors[photoIndex] }}
                  onClick={isGif ? handleGifClick : undefined} // Handle GIF click
                >
                  <img
                    src={photos[photoIndex]}
                    alt="photos"
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            }
          )}
        </div>
        <button
          onClick={handleNext}
          className="p-2 text-white bg-accent rounded-full hover:bg-accent-dark transition-colors"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Popup Menu */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="bg-[#27272c] p-4 sm:p-6 rounded-xl text-center shadow-lg w-[90%] sm:w-[60%]">
            <FaCheckCircle className="text-accent text-4xl sm:text-5xl mx-auto mb-4" />
            <h2 className="text-white text-xl sm:text-2xl mb-2">🎂 Yumm! 🎂</h2>
            <p className="text-white text-sm sm:text-base mb-4">
              The cake was tasty! Now you can proceed to Task 4.
            </p>
            <button
              className={`
                inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-colors
                border border-accent bg-transparent text-accent
                h-[48px] px-6
                hover:bg-accent hover:text-primary cursor-pointer
              `}
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}