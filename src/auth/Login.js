import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const emailPrefix = email.split("@")[0]; // Get the prefix before the @
      navigate(`/hello/${emailPrefix}`); // Redirect to the "Hello" page
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
      <div className="w-full px-8 md:px-32 lg:px-24">
        <form
          className="bg-white rounded-md shadow-2xl p-5"
          onSubmit={handleLogin}
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
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
          <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
            <input
              className="pl-2 w-full outline-none border-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
