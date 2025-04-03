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
        const checkAuth = () => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("currentUser");
                setIsAuthenticated(!!token);
            }
        };

        checkAuth();

        // Listen for auth changes
        const handleAuthChange = () => checkAuth();
        window.addEventListener("authChange", handleAuthChange);

        return () => window.removeEventListener("authChange", handleAuthChange);
    }, []);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("currentUser");
            setIsAuthenticated(false);
            router.push('/');
            window.dispatchEvent(new Event("authChange")); // Notify other components
        }
    };

    return <>
        <header
            id="header"
            className="header-light header-effect-shrink "
            style={{ height: "100.833px" }}
            data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': true, 'stickyChangeLogo': true, 'stickyStartAt': 120, 'stickyHeaderContainerHeight': 70}"
        >
            <div
                className="header-body border-top-0 "
                style={{ position: "fixed", top: 0 }}
            >
                <div
                    className="header-container container"
                    style={{ height: 100, minHeight: 0 }}
                >
                    <div className="header-row">
                        <div className="header-column">
                            <div className="header-row">
                                <div
                                    className="header-logo header-logo-sticky-change"
                                    style={{ width: "175.99px", height: 40 }}
                                >
                                    <a href="index.asp">
                                        <img
                                            className="header-logo-non-sticky opacity-0"
                                            alt="DTDC"
                                            src="img/logos/logo.png"
                                            height={40}
                                            style={{ top: 0, height: 40 }}
                                        />
                                        <img
                                            className="header-logo-sticky opacity-0"
                                            alt="DTDC"
                                            src="img/logos/logo-footer.png"
                                            height={40}
                                            style={{ top: 0, height: 40 }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/*<div class="header-column header-column-logo">
          <div class="header-row">
              <div class="header-logo">
                  <a href="index.html">
                      <img alt="DTDC" height="45" src="img/demos/medical-2/logos/logo.png">
                  </a>
              </div>
          </div>
      </div>*/}
                        <div className="header-column  justify-content-end">
                            <div className="header-row ">
                                <div className=" header-nav header-nav-links justify-content-start">
                                    <div className="header-nav-main header-nav-main-square header-nav-main-effect-1 header-nav-main-sub-effect-1  header-nav-main-arrows ">
                                        {isMenuOpen &&
                                            <nav className={`collapse ${isMenuOpen ? "show" : "closed"}`} onClick={()=>setIsMenuOpen(false)}>
                                                <ul className="nav nav-pills" id="mainNav">
                                                    <li className="dropdown dropdown-secondary">
                                                        <a className="nav-link dropdown-toggle dropdown-toggle">
                                                            Company
                                                            <i className="fas fa-chevron-down" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="about-us.asp"
                                                                    title="About Us"
                                                                >
                                                                    About Us
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="leadership.asp"
                                                                    title="Board of Directors"
                                                                >
                                                                    Board of Directors
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="awards-and-recognition.asp"
                                                                    title="Awards and Recognition"
                                                                >
                                                                    Awards and Recognition
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="csr.asp"
                                                                    title="Corporate Social Responsibility "
                                                                >
                                                                    Corporate Social Responsibility
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="investor-relations.asp"
                                                                    title="Investor Relations"
                                                                >
                                                                    Investor Relations
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown dropdown-secondary">
                                                        <a className="nav-link dropdown-toggle">
                                                            Service Verticals
                                                            <i className="fas fa-chevron-down" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="express-parcels.asp"
                                                                    title="Express Parcels"
                                                                >
                                                                    Express Parcels
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="international-shipments.asp"
                                                                    title="International"
                                                                >
                                                                    International
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="integrated-e-commerce-logistics.asp"
                                                                    title="Integrated E-Commerce Logistics"
                                                                >
                                                                    Integrated E-Commerce Logistics
                                                                </a>
                                                            </li>
                                                            <li className="dropdown-submenu">
                                                                <a className="dropdown-item font-weight-normal">
                                                                    Service Guide
                                                                    <i className="fas fa-chevron-down" />
                                                                    <i className="fas fa-chevron-down" />
                                                                </a>
                                                                <ul className="dropdown-menu">
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="conditions-of-carriage.asp"
                                                                            title="Conditions of Carriage"
                                                                        >
                                                                            Conditions of Carriage
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="pincode-serviceability.asp"
                                                                            title="Pincode Serviceability"
                                                                        >
                                                                            Pincode Serviceability
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="risk-surcharge.asp"
                                                                            title="Risk Surcharge"
                                                                        >
                                                                            Risk Surcharge
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="fuel-surcharge.asp"
                                                                            title="Fuel Surcharge"
                                                                        >
                                                                            Fuel Surcharge
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="volumetric-weight.asp"
                                                                            title="Volumetric Weight"
                                                                        >
                                                                            Volumetric Weight
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="restricted-and-banned-Items.asp"
                                                                            title="Restricted and Banned Items"
                                                                        >
                                                                            Restricted and Banned Items
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="KYC.asp"
                                                                            title="KYC"
                                                                        >
                                                                            KYC
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="paperwork-index.asp"
                                                                            title="International Paperworks"
                                                                        >
                                                                            International Paperworks
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="terms-and-conditions.asp"
                                                                            title="T&C Digital CN"
                                                                        >
                                                                            T&amp;C Digital CN
                                                                        </a>
                                                                    </li>
                                                                    <li className="dropdown-submenu">
                                                                        <a className="dropdown-item font-weight-normal">
                                                                            GST
                                                                            <i className="fas fa-chevron-down" />
                                                                            <i className="fas fa-chevron-down" />
                                                                        </a>
                                                                        <ul className="dropdown-menu">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item"
                                                                                    href="gst_customerfaq.asp"
                                                                                    title="Customer FAQ"
                                                                                >
                                                                                    Customer FAQ
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item"
                                                                                    href="gst_vendorfaq.asp"
                                                                                    title="Vendor FAQ"
                                                                                >
                                                                                    Vendor FAQ
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item"
                                                                                    href="gst_reg_dtdc_express.asp"
                                                                                    title="Registration Info  DTDC EXPRESS LTD"
                                                                                >
                                                                                    Registration Info - DTDC EXPRESS LTD
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item"
                                                                                    href="hsn_sac_nos.asp"
                                                                                    title="HSN/SAC Numbers"
                                                                                >
                                                                                    HSN/SAC&nbsp;Numbers
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown dropdown-secondary">
                                                        <a className="nav-link dropdown-toggle">
                                                            Solutions
                                                            <i className="fas fa-chevron-down" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="industry-solutions.asp"
                                                                    title="Industry Solutions"
                                                                >
                                                                    Industry Solutions
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="temperature_controlled_logistics.asp"
                                                                    title="Temperature Controlled Logistics"
                                                                >
                                                                    Temperature Controlled Logistics
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    href="technology-solutions.asp"
                                                                    title="Technology Solutions"
                                                                >
                                                                    Technology Solutions
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown dropdown-secondary">
                                                        <a className="nav-link dropdown-toggle">
                                                            Grow With Us
                                                            <i className="fas fa-chevron-down" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    title="Become a Partner"
                                                                    href="become-a-partner.asp"
                                                                >
                                                                    Become a Partner
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    title="Ship with MyDTDC "
                                                                    href="https://mydtdc.in/"
                                                                    target="_blank"
                                                                >
                                                                    Ship with MyDTDC
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    title="Business Inquiry"
                                                                    href="sales-inquiry.asp"
                                                                >
                                                                    Business Inquiry
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown dropdown-secondary">
                                                        <a className="nav-link dropdown-toggle">
                                                            Careers
                                                            <i className="fas fa-chevron-down" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    title="Life at DTDC"
                                                                    href="life-at-dtdc.asp"
                                                                >
                                                                    Life at DTDC
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    title="Join us"
                                                                    href="join-us.asp"
                                                                >
                                                                    Join us
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown dropdown-secondary">
                                                        <a className="nav-link dropdown-toggle">
                                                            Contact Us
                                                            <i className="fas fa-chevron-down" />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    title="Track your Shipment"
                                                                    href="trace.asp"
                                                                >
                                                                    Track your Shipment
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal "
                                                                    title="Locate Us"
                                                                    href="location-finder.asp"
                                                                >
                                                                    Locate Us
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="dropdown-item font-weight-normal"
                                                                    title="Customer Care"
                                                                    href="customer-care.asp"
                                                                >
                                                                    Customer Care
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </nav>
                                        }
                                    </div>



                                    <button
                                        className={`btn header-btn-collapse-nav ${isMenuOpen ? '' : "collapsed"}`}
                                        data-bs-toggle="collapse"
                                        data-bs-target=".header-nav-main nav"
                                        aria-expanded={`${isMenuOpen ? 'true' : "false"}`}
                                        onClick={() => setIsMenuOpen(true)}
                                    >
                                        <i className="fas fa-bars" />
                                    </button>
                                </div>
                                <div className=" header-logo-sticky-change mobile-none">
                                    {/* <a
                                        href="https://web.mydtdc.in/"
                                        title="SHIP WITH My DTDC"
                                        className=" header-logo-sticky btn btn-modern btn-light  border-0 btn-arrow-effect-1"
                                        style={{
                                            textTransform: "initial",
                                            textDecoration: "none",
                                            height: 42
                                        }}
                                        target="_blank"
                                    >
                                        SHIP WITH MyDTDC
                                    </a> */}
                                    <a
                                        href="https://web.mydtdc.in/"
                                        title="SHIP WITH My DTDC"
                                        className="header-logo-non-sticky btn btn-modern btn-primary  border-0 btn-arrow-effect-1"
                                        style={{
                                            textTransform: "initial",
                                            textDecoration: "none",
                                            height: 42
                                        }}
                                        target="_blank"
                                    >
                                        SHIP WITH MyDTDC
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    </>
};

export default Navbar;
