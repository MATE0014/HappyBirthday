"use client";

import { useEffect, useState } from "react";

export default function MainWish() {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setHue((prevHue) => (prevHue + 2) % 360);
    }, 50); // Smooth RGB transition

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <h1 className="text-4xl/[3.5rem] sm:text-6xl font-bold mb-8 tracking-widest mt-5">
      Happy{" "}
      <span
        className="inline-block font-bold animate-glow"
        style={{ color: `hsl(${hue}, 100%, 50%)` }}
      >
        18th
      </span>{" "}
      Birthday, Anushkaa!
    </h1>
  );
}