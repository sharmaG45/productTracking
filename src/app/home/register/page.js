"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/_component/tracking");
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setMessage(data.message || data.error);

        if (res.status === 201) {
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => router.push("/"), 2000);
        } else if (data.error === "User already exists") {
            setMessage("User already registered. Please log in.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
                <div className="text-center mb-6">
                    <FaUserPlus className="text-6xl text-gray-600 dark:text-gray-300 mx-auto" />
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mt-2">Create an Account</h1>
                    <p className="text-gray-500 dark:text-gray-400">Join us today!</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                            placeholder="Create a password"
                            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
                    >
                        Register
                    </button>
                </form>

                {message && <p className="mt-2 text-red-500 text-center">{message}</p>}

                <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <button
                        onClick={() => router.push("/home")}
                        className="text-blue-500 font-semibold hover:underline"
                    >
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
}
