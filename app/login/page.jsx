"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "anuxkaa is the best") {
      localStorage.setItem("authenticated", "true");
      document.cookie = "authenticated=true; path=/; max-age=86400";
      router.push("/");
    } else {
      setError("Incorrect password!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-96"> {/* Increased size */}
        <h2 className="text-2xl font-bold mb-4 text-center">Enter Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 w-full bg-gray-700 rounded pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
            </button>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
}
