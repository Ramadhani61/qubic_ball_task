"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#dce4f1]">
      <div className="p-4 bg-white shadow-xl rounded-xl w-80">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">
            Login
          </h1>
          {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
          <label className="text-sm text-gray-500 font-medium">Username</label>
          <div className="flex mb-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
             
            <FaUserCircle color="gray" size={18}/>
            </span>
            <input
             onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="website-admin"
              className="p-3 rounded-none rounded-e-lg text-gray-700  block flex-1 min-w-0 w-full text-sm border border-blue-200 focus:border-sky-500 focus:outline focus:outline-sky-500"
              placeholder="input username"
            />
          </div>
          <label className="text-sm text-gray-500 font-medium">Password</label>
          <div className="flex mb-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
            <FaLock color="gray" size={18}/>
            </span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="website-admin" 
              className="p-3 rounded-none rounded-e-lg text-gray-700  block flex-1 min-w-0 w-full text-sm border border-blue-200 focus:border-sky-500 focus:outline focus:outline-sky-500"
              placeholder="input password"
            />
          </div>
          <button
            type="submit"
            className="cursor pointer mt-4 w-full bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
