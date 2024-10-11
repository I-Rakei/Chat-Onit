import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
      <div className="w-full px-8 md:px-32 lg:px-24">
        <form
          className="bg-white rounded-md shadow-2xl p-5"
          onSubmit={handleSignup}
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Create Account
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-8">
            Sign up to get started
          </p>
          <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <input
              className="pl-2 w-full outline-none border-none"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <input
              className="pl-2 w-full outline-none border-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <input
              className="pl-2 w-full outline-none border-none"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
