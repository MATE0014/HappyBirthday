"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function BirthdayCake({ tasks, task2Completed }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <img src="/cake.webp" alt="Birthday Cake" className="w-64 h-64 sm:w-[350px] sm:h-64 mb-4" />

      {/* Surprise Message Button */}
      <Button variant="outline" size="md" className="mt-4" onClick={() => setShowPopup(true)}>
        🎁 Surprise Message
      </Button>

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
            <h2 className="text-white text-xl sm:text-2xl mb-2">🎉 Surprise! 🎉</h2>

            {/* Conditional Message */}
            {!task2Completed ? (
              <p className="text-white/60 text-sm sm:text-base mb-4">
                No No No No, Not So Easy, Firstly, Complete The Task 2 From The CheckList At The Top Right 
                To Reveal This Super Duper Surprise Message!!!!! Let's Gooooo!!!
              </p>
            ) : (
              <p className="text-white text-sm sm:text-base mb-4">
                Welll..the message gonna be changed according to who the "user" is, but for now, here's a message from chatgpt <br />
                Wishing you a birthday as special as you are! May this year be
                filled with endless laughter, unforgettable moments, and all the
                happiness you deserve. Here's to new adventures, dreams coming
                true, and a future as bright as your smile! 🎂✨
              </p>
            )}

            <Button variant="outline" size="md" className="mt-4" onClick={() => setShowPopup(false)}>
              Close
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}