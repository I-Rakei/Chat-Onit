import React, { useState } from "react";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center bg-cover bg-center">
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">
            Simple App
          </h1>
          <p className="text-white mt-1">The simplest app to use</p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
}
