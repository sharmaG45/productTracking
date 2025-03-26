"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Check authentication on component mount & listen for auth changes
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token);
        };

        checkAuth(); // Initial check
        window.addEventListener("authChange", checkAuth); // Listen for auth updates

        return () => window.removeEventListener("authChange", checkAuth); // Cleanup
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("authChange")); // 🔥 Notify Login page & others
        router.push("/"); // Redirect to login page
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left: Brand Logo */}
                <h1 className="text-xl font-semibold cursor-pointer" onClick={() => router.push("/")}>
                    Dashboard
                </h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <a href="/" className="hover:text-gray-300">Home</a>
                    <a href="/about" className="hover:text-gray-300">About</a>
                    <a href="/contact" className="hover:text-gray-300">Contact</a>
                </div>

                {/* Right: Auth Buttons (Desktop) */}
                <div className="hidden md:flex space-x-4">
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => router.push("/login")}
                                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.push("/register")}
                                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                            >
                                Create Account
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden flex flex-col space-y-2 mt-4 bg-gray-700 p-4 rounded-lg">
                    <a href="/" className="block text-white hover:text-gray-300">Home</a>
                    <a href="/about" className="block text-white hover:text-gray-300">About</a>
                    <a href="/contact" className="block text-white hover:text-gray-300">Contact</a>

                    <div className="border-t border-gray-600 my-2"></div>

                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => router.push("/login")}
                                className="w-full bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.push("/register")}
                                className="w-full bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
                            >
                                Create Account
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
