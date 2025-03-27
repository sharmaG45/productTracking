"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"; // Profile Icon
import { MdLogout, MdSettings } from "react-icons/md"; // Icons

const Navbar = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("token");
                setIsAuthenticated(!!token);
            }
        };

        checkAuth();
        window.addEventListener("authChange", checkAuth);

        return () => window.removeEventListener("authChange", checkAuth);
    }, []);

    const handleLogout = useCallback(() => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            window.dispatchEvent(new Event("authChange"));
        }
        router.push("/");
    }, [router]);

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left: Brand Logo */}
                <h1 className="text-xl font-semibold cursor-pointer" onClick={() => router.push("/")}>
                    Dashboard
                </h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:text-gray-300">Home</Link>
                    <Link href="/home/about" className="hover:text-gray-300">About</Link>
                    <Link href="/home/contact" className="hover:text-gray-300">Contact</Link>
                </div>

                {/* Right: Auth Buttons (Desktop) */}
                <div className="hidden md:flex space-x-4 items-center">
                    {isAuthenticated ? (
                        <div className="relative">
                            {/* Profile Icon */}
                            <button
                                className="flex items-center space-x-2"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <FaUserCircle size={28} className="text-gray-300 hover:text-white" />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
                                    <Link
                                        href="/profile"
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <FaUserCircle className="mr-2" /> Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <MdSettings className="mr-2" /> Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <MdLogout className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => router.push("/home")}
                                    className="flex items-center gap-2 bg-blue-500 px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:bg-blue-600 shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                    Login
                                </button>

                                <button
                                    onClick={() => router.push("/home/register")}
                                    className="flex items-center gap-2 bg-green-500 px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:bg-green-600 shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Account
                                </button>
                            </div>

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
                    <Link href="/" className="block text-white hover:text-gray-300">Home</Link>
                    <Link href="/home/about" className="block text-white hover:text-gray-300">About</Link>
                    <Link href="/home/contact" className="block text-white hover:text-gray-300">Contact</Link>

                    <div className="border-t border-gray-600 my-2"></div>

                    {isAuthenticated ? (
                        <div className="space-y-2">
                            <Link href="/profile" className="block text-white hover:text-gray-300">Profile</Link>
                            <Link href="/settings" className="block text-white hover:text-gray-300">Settings</Link>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => router.push("/home")}
                                className="w-full bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.push("/home/register")}
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
