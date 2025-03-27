"use client";

import { useRouter } from "next/navigation";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    const router = useRouter();

    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container">
                <div className="row text-center text-md-start">

                    {/* 🔹 Logo & Company Info */}
                    <div className="col-md-4 mb-3">
                        <h2 
                            className="h4 fw-bold cursor-pointer" 
                            onClick={() => router.push("/")}
                        >
                            Product Tracking
                        </h2>
                    </div>

                    {/* 🔹 Navigation Links */}
                    <div className="col-md-4 mb-3">
                        <h3 className="h5 fw-semibold">Quick Links</h3>
                        <ul className="list-unstyled mt-2">
                            <li>
                                <button 
                                    onClick={() => router.push("/home/about")} 
                                    className="btn btn-link text-white text-decoration-none"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => router.push("/home/contact")} 
                                    className="btn btn-link text-white text-decoration-none"
                                >
                                    Contact
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => router.push("/home/privacy")} 
                                    className="btn btn-link text-white text-decoration-none"
                                >
                                    Privacy Policy
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* 🔹 Social Media Links */}
                    <div className="col-md-4 mb-3">
                        <h3 className="h5 fw-semibold">Follow Us</h3>
                        <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">
                            <a href="https://facebook.com" target="_blank" className="text-white">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" className="text-white">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" className="text-white">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" className="text-white">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* 🔹 Copyright */}
                <div className="text-center text-muted border-top pt-3 mt-4">
                    &copy; {new Date().getFullYear()} Tracking-App. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
