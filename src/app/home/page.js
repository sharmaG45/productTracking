"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Tracking from "@/app/_component/Tracking/page"; // Import Tracking component
import { FaUserCircle } from "react-icons/fa";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setMessage(data.message || data.error);

        if (data.token) {
            localStorage.setItem("token", data.token);
            setIsAuthenticated(true);
            window.dispatchEvent(new Event("authChange")); // 🔥 Notify Navbar
        } else if (data.error === "User not found") {
            setMessage("User not found. Please register first.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        {/* 🔥 Show Tracking Component if Authenticated */}
        {isAuthenticated && <Tracking />}

        {/* 🔹 Login Box */}
        {!isAuthenticated && (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
                <div className="text-center mb-6">
                    <FaUserCircle className="text-6xl text-gray-600 dark:text-gray-300 mx-auto" />
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mt-2">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to continue</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>

                {message && <p className="mt-2 text-red-500 text-center">{message}</p>}

                <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <button
                        onClick={() => router.push("/home/register")}
                        className="text-blue-500 font-semibold hover:underline"
                    >
                        Register here
                    </button>
                </p>
            </div>
        )}
    </div>




    );
}
