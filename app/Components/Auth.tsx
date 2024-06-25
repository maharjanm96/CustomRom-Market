"use client";

import React, { useState } from "react";
import LogoButton from "./Buttons/LogoButtons";
import Link from "next/link";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export function LoginAuth() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      setErrors({ email: "", password: "" });
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        formData
      );
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        // Handle server-side validation errors
        setErrors({
          email: err.response.data.email,
          password: err.response.data.password,
        });
      } else if (err.formErrors) {
        // Handle client-side validation errors
        const formErrors = err.formErrors.fieldErrors;
        setErrors({
          email: formErrors.email ? formErrors.email[0] : "",
          password: formErrors.password ? formErrors.password[0] : "",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-24 mb-16">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <span className="flex justify-center text-sm mt-4">
            Don't have an account ?
          </span>
          <Link href="/auth/signup">
            <span className="text-sm flex justify-center cursor-pointer">
              Sign Up!
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export function SignupAuth() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      signupSchema.parse(formData);
      setErrors({ email: "", password: "" });
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        formData
      );
      setLoading(false);
      toast.success("Signup successful!");
      router.push("/auth/login");
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        setErrors({
          email: err.response.data.email,
          password: err.response.data.password,
        });
      } else if (err.formErrors) {
        const formErrors = err.formErrors.fieldErrors;
        setErrors({
          email: formErrors.email ? formErrors.email[0] : "",
          password: formErrors.password ? formErrors.password[0] : "",
        });
      }
    }
  };
  return (
    <div className="flex items-center justify-center mt-24 mb-16">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <span className="flex justify-center py-4 text-sm text-gray-500">
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
          <span className="flex justify-center text-sm mt-4">
            Already have an account ?
          </span>
          <Link href="/auth/login">
            <span className="text-sm flex justify-center cursor-pointer">
              Login!
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}
