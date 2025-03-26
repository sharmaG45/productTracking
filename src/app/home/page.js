"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Tracking from "@/app/_component/Tracking/page"; // Import Tracking component

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
        <div className="flex flex-col items-center justify-center min-h-screen">
            {isAuthenticated ? (
                <Tracking /> // Show Tracking component if logged in
            ) : (
                <>
                    <h1 className="text-2xl font-bold">Login</h1>
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="border p-2"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="border p-2"
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="bg-green-500 text-white px-4 py-2">Login</button>
                    </form>
                    {message && <p className="mt-2 text-red-500">{message}</p>}
                    <p className="mt-4">
                        Don't have an account?
                        <button
                            onClick={() => router.push("/home/register")}
                            className="text-blue-500 underline ml-1"
                        >
                            Register here
                        </button>
                    </p>
                </>
            )}
        </div>
    );
}
