"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      // On successful signup
      console.log("Signup success:", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: unknown) {
      // Check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Something went wrong!";
        console.error("Axios error:", message);
        toast.error(message);
      } else {
        // Handle unknown error types
        console.error("Unknown error:", error);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable button if all fields are filled
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-2xl mb-4">{loading ? "Processing..." : "Signup"}</h1>
      <hr className="w-1/2 mb-4" />

      <label htmlFor="username" className="mb-2">Username</label>
      <input
        type="text"
        className="p-2 border rounded-lg text-black w-64 mb-4"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter username"
      />

      <label htmlFor="email" className="mb-2">Email</label>
      <input
        type="email"
        className="p-2 border rounded-lg text-black w-64 mb-4"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter email"
      />

      <label htmlFor="password" className="mb-2">Password</label>
      <input
        type="password"
        className="p-2 border rounded-lg text-black w-64 mb-4"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter password"
      />

      <button
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className={`p-2 border rounded-lg w-64 mb-4 ${
          buttonDisabled || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>

      <Link href="/login" className="text-blue-500 underline">
        Visit login page
      </Link>
    </div>
  );
}
