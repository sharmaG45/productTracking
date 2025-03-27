"use client";

import { useRouter } from "next/navigation";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    const router = useRouter();

    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">

                    {/* 🔹 Logo & Company Info */}
                    <div>
                        <h2 className="text-2xl font-bold" onClick={() => router.push("/")}>Product Tracking </h2>
                        {/* <p className="text-gray-400 mt-2">Your trusted flight booking platform.</p> */}
                    </div>

                    {/* 🔹 Navigation Links */}
                    <div>
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li><button onClick={() => router.push("/home/about")} className="hover:text-gray-400">About Us</button></li>
                            <li><button onClick={() => router.push("/home/contact")} className="hover:text-gray-400">Contact</button></li>
                            {/* <li><button onClick={() => router.push("/faq")} className="hover:text-gray-400">FAQ</button></li> */}
                            <li><button onClick={() => router.push("/home/privacy")} className="hover:text-gray-400">Privacy Policy</button></li>
                        </ul>
                    </div>

                    {/* 🔹 Social Media Links */}
                    <div>
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4 mt-2">
                            <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-white">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-white">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-white">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-white">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* 🔹 Copyright */}
                <div className="mt-6 text-center text-gray-500 border-t border-gray-700 pt-4">
                    &copy; {new Date().getFullYear()} Tracking-App. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
