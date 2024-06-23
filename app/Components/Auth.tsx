"use client";

import React from "react";
import LogoButton from "./Buttons/LogoButtons";

const LoginAuth = () => {
  return (
    <div className="flex items-center justify-center mt-8 mb-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700 "
          >
            Login
          </button>

          <span className="flex justify-center py-2 text-sm">
            or continue with
          </span>
          <LogoButton
            logoSrc="/assets/google-logo.jpg"
            altText="Google Logo"
            buttonText="Google"
          />
          <div className="py-2"></div>
          <LogoButton
            logoSrc="/assets/github-logo.webp"
            altText="GitHub Logo"
            buttonText="GitHub"
          />
          <span className="flex justify-center text-sm py-2">
            Don't have an account ?
          </span>
          <span className="text-sm flex - justify-center cursor-pointer">
            Sign Up!
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginAuth;
