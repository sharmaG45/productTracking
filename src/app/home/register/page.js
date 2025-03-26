"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Register</h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="border p-2"
                    onChange={handleChange}
                    required
                />
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
                <button type="submit" className="bg-green-600 text-white px-4 py-2">Register</button>
            </form>
            {message && <p className="mt-2 text-red-500">{message}</p>}
            <p className="mt-4">
                Already have an account?{" "}
                <span className="text-blue-500 cursor-pointer" onClick={() => router.push('/home')}>
                    Login here
                </span>
            </p>
        </div>
    );
}
