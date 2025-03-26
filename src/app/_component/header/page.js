"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>

            <div>
                {isAuthenticated ? (
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                ) : (
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => router.push("/login")}
                            className="bg-blue-500 px-4 py-2 rounded"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => router.push("/register")}
                            className="bg-green-500 px-4 py-2 rounded"
                        >
                            Create Account
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
