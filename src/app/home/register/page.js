"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";
import { auth, fireStore } from "@/app/_component/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/");
        }
    }, [router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = form; // Use 'form' state variable here

        try {
            // Register user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Determine role based on email (default 'user', manual for admin)
            const role = email === "admin@gmail.com" ? "admin" : "user";

            // Store additional user info in Firestore, including role
            await setDoc(doc(fireStore, "users", user.uid), {
                username: name, // Store the 'name' as 'username'
                email,
                uid: user.uid,
                role, // Store the user's role
                createdAt: new Date(),
            });

            // Show success message (you can add a toast library for this)
            setMessage("Registration Successful!");
            localStorage.setItem("token", user.accessToken); // Set token in localStorage
            router.push("/"); // Redirect after successful registration
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
                {/* Left side - Image */}
                <div className="hidden md:flex md:w-1/2 bg-blue-500">
                    <img
                        src="/assets/images/bg.png" // Replace with your image path
                        alt="Register"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right side - Form */}
                <div className="w-full md:w-1/2 p-8">
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
                                value={form.name}
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
                                value={form.email}
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
                                value={form.password}
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
                            onClick={() => router.push("/home/login")}
                            className="text-blue-500 font-semibold hover:underline"
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
