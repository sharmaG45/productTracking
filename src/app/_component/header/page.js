"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FaUserCircle, FaChevronDown } from "react-icons/fa"; // Profile Icon
import { MdLogout, MdSettings } from "react-icons/md"; // Icons

const Navbar = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [openDropdown, setOpenDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const menuItems = [
        {
            title: "Company",
            submenu: [
                { title: "About Us", link: "/home/about" },
                { title: "Awards and Recognition", link: "#" },

            ],
        },
        {
            title: "Solutions",
            submenu: [
                { title: "Industry Solutions", link: "#" },
                { title: "Technology Solutions", link: "#" },
            ],
        },
        {
            title: "Careers",
            submenu: [
                { title: "Life at DTDC", link: "#" },
                { title: "Join us", link: "#" },
            ],
        },
        {
            title: "Contact Us",
            submenu: [
                { title: "Track your Shipment", link: "/" },
                { title: "Locate Us", link: "#" },
                { title: "Customer Care", link: "#" },
            ],
        },
    ];


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <nav className={`p-4 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900 text-white shadow-lg" : "bg-white shadow-md"}`}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold cursor-pointer text-gray-800" onClick={() => router.push("/")}>LOGO</h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    {menuItems.map((item, index) => (
                        <div key={index} className="relative">
                            <button
                                className={`flex items-center space-x-2 transition-all duration-300 ${isScrolled ? "text-white hover:text-gray-300" : "text-gray-700 hover:text-blue-500"}`}
                                onClick={() => toggleDropdown(index)}
                            >
                                {item.title} <FaChevronDown />
                            </button>
                            {openDropdown === index && (
                                <ul className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg">
                                    {item.submenu.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <a href={subItem.link} className="block px-4 py-2 hover:bg-gray-100">
                                                {subItem.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    {isAuthenticated ? (
                        <div className="relative">
                            <button className={`transition-all duration-300 ${isScrolled ? "text-white hover:text-gray-300" : "text-gray-700 hover:text-blue-500"}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <FaUserCircle size={28} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                    <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                        <FaUserCircle className="mr-2" /> Profile
                                    </Link>
                                    <Link href="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                        <MdSettings className="mr-2" /> Settings
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100">
                                        <MdLogout className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <button onClick={() => router.push("/home/login")} className={`px-4 py-1 text-sm rounded shadow-md transition-all duration-300 ${isScrolled ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-blue-500 text-white hover:bg-blue-600"}`}>Login</button>
                            <button onClick={() => router.push("/home/register")} className={`px-4 py-1 text-sm rounded shadow-md transition-all duration-300 ${isScrolled ? "bg-green-700 text-white hover:bg-green-800" : "bg-green-500 text-white hover:bg-green-600"}`}>Sign Up</button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden flex flex-col space-y-2 mt-4 bg-gray-50 p-4 rounded-lg shadow-md">
                    <Link href="/" className="block text-gray-700 hover:text-blue-500">Home</Link>
                    <Link href="/home/about" className="block text-gray-700 hover:text-blue-500">About</Link>
                    <Link href="/home/contact" className="block text-gray-700 hover:text-blue-500">Contact</Link>
                    <div className="border-t border-gray-300 my-2"></div>
                    {isAuthenticated ? (
                        <>
                            <Link href="/profile" className="block text-gray-700 hover:text-blue-500">Profile</Link>
                            <Link href="/settings" className="block text-gray-700 hover:text-blue-500">Settings</Link>
                            <button onClick={handleLogout} className="w-full bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => router.push("/home/login")} className="w-full bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">Login</button>
                            <button onClick={() => router.push("/home/register")} className={`px-4 py-1 text-sm rounded shadow-md transition-all duration-300 ${isScrolled ? "bg-green-700 text-white hover:bg-green-800" : "bg-green-500 text-white hover:bg-green-600"}`}>Sign Up</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
