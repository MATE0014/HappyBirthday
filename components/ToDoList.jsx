"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const TodoList = ({ tasks, setTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [surpriseEnabled, setSurpriseEnabled] = useState(false);
  const [showFinalSurprise, setShowFinalSurprise] = useState(false); // State for final surprise pop-up

  // Handle task checkbox click
  const handleTaskCheck = (index, event) => {
    const newTasks = [...tasks];
    const checked = event.target.checked;

    // If the task is disabled, prevent checking it
    if (newTasks[index].disabled) {
      console.log("Task is disabled, cannot check:", newTasks[index].text); // Debugging
      return;
    }

    newTasks[index].completed = checked;

    if (checked) {
      // Enable the next task after checking the current task, except for Task 4
      if (index + 1 < newTasks.length && index + 1 !== 3) { // Skip enabling Task 4 (index 3)
        newTasks[index + 1].disabled = false;
      }
    } else {
      // If a task is unchecked, disable all subsequent tasks
      for (let i = index + 1; i < newTasks.length; i++) {
        newTasks[i].completed = false;
        newTasks[i].disabled = true;
      }
    }

    setTasks(newTasks);
    setSurpriseEnabled(newTasks.every((task) => task.completed));
  };

  // Handle final surprise button click
  const handleFinalSurprise = () => {
    setShowFinalSurprise(true); // Show the final surprise pop-up
    setIsOpen(false); // Close the checklist
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        onClick={() => setIsOpen(true)}
        className="flex justify-center items-center"
      >
        <CiMenuFries className="text-[28px] sm:text-[38px] text-accent" />
      </SheetTrigger>

      <AnimatePresence>
        {isOpen && (
          <SheetContent
            as={motion.div}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="flex flex-col p-4 sm:p-6 w-full sm:w-2/3 lg:w-1/2 bg-[#1e1e1e] shadow-lg rounded-lg"
          >
            <SheetTitle className="sr-only">Check List</SheetTitle>
            <SheetDescription className="sr-only">A Check List Is Here</SheetDescription>

            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-white tracking-wider">
              Check List
            </h2>
            <p className="text-center text-gray-400 text-sm sm:text-base mb-4 tracking-wider">
              Complete all tasks for a surprise!
            </p>

            <ul className="flex flex-col gap-3 sm:gap-4">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 transition-all ${
                    task.disabled
                      ? "text-gray-500"
                      : task.completed
                      ? "text-gray-400 line-through"
                      : "text-white font-semibold"
                  }`}
                >
                  <input
                    type="checkbox"
                    className={`w-5 h-5 sm:w-6 sm:h-6 appearance-none border-2 border-white rounded-md checked:bg-accent checked:border-transparent transition-all cursor-pointer ${
                      task.disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                    }`}
                    disabled={task.disabled}
                    checked={task.completed}
                    onChange={(e) => handleTaskCheck(index, e)}
                  />
                  <span className="text-sm sm:text-base tracking-wider">{task.text}</span>
                </li>
              ))}
            </ul>

            {/* Surprise Button with custom CSS */}
            <button
              className={`
                inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-colors
                border border-accent bg-transparent text-accent
                h-[48px] px-6 tracking-widest
                ${
                  surpriseEnabled
                    ? "hover:bg-accent hover:text-primary cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }
              `}
              disabled={!surpriseEnabled}
              onClick={handleFinalSurprise}
            >
              Surprise!
            </button>
          </SheetContent>
        )}
      </AnimatePresence>

      {/* Final Surprise Pop-up */}
      {showFinalSurprise && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="bg-[#27272c] p-4 sm:p-6 rounded-xl text-center shadow-lg w-[90%] sm:w-[60%]">
            <FaCheckCircle className="text-accent text-4xl sm:text-5xl mx-auto mb-4" />
            <h2 className="text-white text-xl sm:text-2xl mb-2 tracking-wider">🎆Final Surprise Message?!🎆</h2>
            <p className="text-white text-sm/10 sm:text-base mb-4 tracking-wider">
              Congratulations! You've completed all the tasks. Here's your final surprise message:
              <br />
              "You are amazing! Keep shining and achieving your goals. 🎉✨"
            </p>

            {/* Close Button with custom CSS */}
            <button
              className={`
                inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-colors
                border border-accent bg-transparent text-accent
                h-[48px] px-6
                hover:bg-accent hover:text-primary cursor-pointer
              `}
              onClick={() => setShowFinalSurprise(false)}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </Sheet>
  );
};

export default TodoList;