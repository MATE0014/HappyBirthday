"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function EntryAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [balloons, setBalloons] = useState([]);

  const colors = [
    "#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1",
    "#955251", "#B565A7", "#009B77", "#DD4124", "#D65076"
  ];

  useEffect(() => {
    // Function to add a new balloon
    const addBalloon = () => {
      setBalloons((prevBalloons) => [
        ...prevBalloons,
        {
          id: prevBalloons.length,
          x: Math.random() * 100, // Random X position
          color: colors[Math.floor(Math.random() * colors.length)], // Random color
          delay: Math.random() * 2, // Random delay
        },
      ]);
    };

    // Add initial balloons
    for (let i = 0; i < 69; i++) {
      addBalloon();
    }

    // Add more balloons over time
    const balloonInterval = setInterval(() => {
      if (balloons.length < 50) addBalloon(); // Max 30 balloons
    }, 500); // Add a new balloon every second

    // Stop animation after 5 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      clearInterval(balloonInterval); // Stop adding balloons
      setTimeout(onComplete, 1000);
    }, 5000);

    return () => {
      clearInterval(balloonInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 flex items-center justify-center"
        >
          {/* Balloons */}
          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              initial={{ y: "100vh" }}
              animate={{ y: "-100vh" }}
              transition={{
                delay: balloon.delay,
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-16 h-20 rounded-full absolute"
              style={{
                left: `${balloon.x}%`,
                backgroundColor: balloon.color,
              }}
            />
          ))}

          {/* Birthday Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="text-6xl/[3.5rem] font-bold tracking-wider"
          >
            Happy Birthday, Anushkaa!
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
