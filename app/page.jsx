"use client";

import { useEffect, useState, useRef } from "react";
import EntryAnimation from "@/components/EntryAnimation";
import BalloonsGallery from "@/components/BalloonsGallery";
import BirthdayCake from "@/components/BirthdayCake";
import TodoList from "@/components/ToDoList";
import MainWish from "@/components/MainWish";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const todoListRef = useRef(null);

  // Initialize tasks with only the first task enabled
  const [tasks, setTasks] = useState([
    { text: "Wish Yourself A Happy Birthday!", completed: false, disabled: false },
    { text: "Blow Candles On The Cake!", completed: false, disabled: true },
    { text: "Now Smile Cause You Look Better With It", completed: false, disabled: true },
    { text: "Find The Cake, And Eat It!", completed: false, disabled: true },
    { text: "Close Eyes Before The Surprise", completed: false, disabled: true },
  ]);

  // Track if Task 2 is completed
  const task2Completed = tasks[1]?.completed;

  const handleGifClick = () => {
    const newTasks = [...tasks];
    newTasks[3].disabled = false; // Enable Task 4
    setTasks(newTasks);
  };

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
    }));

    const poppers = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      stars.forEach((star) => {
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          star.x += dx * 0.02;
          star.y += dy * 0.02;
        } else {
          star.x += star.speedX;
          star.y += star.speedY;
        }

        if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
        if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      poppers.forEach((popper, index) => {
        ctx.fillStyle = popper.color;
        ctx.beginPath();
        ctx.arc(popper.x, popper.y, popper.radius, 0, Math.PI * 2);
        ctx.fill();

        popper.x += popper.vx;
        popper.y += popper.vy;
        popper.vy += 0.1;

        if (popper.y > canvas.height || popper.x < 0 || popper.x > canvas.width) {
          poppers.splice(index, 1);
        }
      });

      requestAnimationFrame(draw);
    };

    const handleClick = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest("button") ||
        e.target.closest("a") ||
        (todoListRef.current && todoListRef.current.contains(e.target)) // Ignore clicks inside To-Do List
      ) {
        return;
      }

      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        poppers.push({
          x: e.clientX,
          y: e.clientY,
          radius: Math.random() * 3 + 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white">
      {!showContent && <EntryAnimation onComplete={() => setShowContent(true)} />}
      {showContent && (
        <>
          <div className="fixed top-4 right-4 z-50" ref={todoListRef}>
            <TodoList tasks={tasks} setTasks={setTasks} />
          </div>

          <div className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-8 text-center">
            <MainWish />
          </div>
          <div className="w-full max-w-md sm:max-w-lg">
            <BirthdayCake tasks={tasks} task2Completed={task2Completed} />
          </div>
          <div className="w-full max-w-md sm:max-w-lg">
          <BalloonsGallery onGifClick={handleGifClick} />
          </div>
        </>
      )}
    </main>
  );
}