"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { auth, fireStore } from "@/app/_component/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, query, where, collection } from "firebase/firestore";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const Login = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [isClient, setIsClient] = useState(false); // Track if we're on the client side
    const router = useRouter();

    // Ensure that localStorage is only accessed on the client side
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;

        try {
            // Step 1: Query Firestore by the email field
            const usersRef = collection(fireStore, "users");
            const q = query(usersRef, where("email", "==", email)); // Search for a user with this email
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                toast.error("User not found. Please register first.");
                return;
            }

            // Step 2: Extract user data from Firestore document
            const userDoc = querySnapshot.docs[0]; // Get the first document
            const { email: storedEmail, role } = userDoc.data(); // Get the email and role from the document

            // Step 3: Authenticate the user with Firebase Authentication using the retrieved email
            const userCredential = await signInWithEmailAndPassword(auth, storedEmail, password);
            const user = userCredential.user;

            // Step 4: Store user data in localStorage (only on client-side)
            if (isClient) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                localStorage.setItem("role", role); // Store role in localStorage
            }

            console.log("Login successful:", user);

            toast.success("Login successful!");

            // Step 5: Redirect based on user role
            if (role === "admin") {
                router.push("/home/admin"); // Admin dashboard
            } else {
                router.push("/"); // Regular user dashboard
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error(`Error during login: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            {/* 🔥 Show Tracking Component if Authenticated */}
            {isClient && localStorage.getItem("currentUser") && router.push("/")}

            {/* 🔹 Login Box */}
            {isClient && !localStorage.getItem("currentUser") && (
                <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
                    {/* Left Section - Image (Hidden on Small Screens) */}
                    <div className="hidden md:flex md:w-1/2 bg-blue-500">
                        <img
                            src="/assets/images/bg.png" // Replace with your image path
                            alt="Login"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Section - Login Form */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
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
                                    value={loginData.email}
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
                                    value={loginData.password}
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
                </div>
            )}
        </div>
    );
}

export default Login;
