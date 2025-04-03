"use client";

import { useRouter } from "next/navigation";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    const router = useRouter();

    return (
        <footer id="footer" className="m-0 ">
            <div className="container">
                <div className="row py-5">
                    <div className="col-sm-12 pb-4 pb-lg-0 col-lg-4   footer-column-opening-hours">
                        <div
                            className="mb-4 appear-animation animated fadeInUpShorter appear-animation-visible"
                            data-appear-animation="fadeInUpShorter"
                            data-appear-animation-delay={500}
                            style={{ animationDelay: "500ms" }}
                        >
                            <a href="index.asp">
                                {" "}
                                <img
                                    src="img/logos/logo-footer.png"
                                    alt="DTDC Logo Footer"
                                    width={150}
                                />
                            </a>
                        </div>
                        <div className="info custom-info pt-0">
                            <span>Email : </span>
                            <span>customersupport@dtdc.com</span>
                        </div>
                        <div className="info custom-info ">
                            <span>Phone :</span>
                            <span> + 91 - 9606 911 811</span>
                        </div>
                        <div className="pt-2">
                            <span style={{ padding: "10px 0", color: "#bcbaba", fontSize: 15 }}>
                                Follow us on :
                            </span>{" "}
                        </div>
                        <ul className="social-icons social-icons-clean social-icons-clean-with-border social-icons-medium social-icons-icon-light">
                            <li className="social-icons-facebook">
                                <a
                                    href="https://www.facebook.com/DTDC.Official"
                                    target="_blank"
                                    title="Facebook"
                                    data-cursor-effect-hover="fit"
                                >
                                    <i className="fab fa-facebook-f" />
                                </a>
                            </li>
                            <li className="social-icons-linkedin">
                                <a
                                    href="https://www.linkedin.com/company/3259215"
                                    target="_blank"
                                    title="Linkedin"
                                    data-cursor-effect-hover="fit"
                                >
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </li>
                            <li className="social-icons-youtube">
                                <a
                                    href="https://www.youtube.com/DTDCIndia"
                                    target="_blank"
                                    title="Youtube"
                                    data-cursor-effect-hover="fit"
                                >
                                    <i className="fab fa-youtube" />
                                </a>
                            </li>
                            <li className="social-icons-instagram">
                                <a
                                    href="https://www.instagram.com/dtdc.official/"
                                    target="_blank"
                                    title="Instagram"
                                    data-cursor-effect-hover="fit"
                                >
                                    <i className="fab fa-instagram" />
                                </a>
                            </li>
                            <li className="social-icons-twitter ">
                                <a
                                    href="https://twitter.com/DTDCIndia"
                                    target="_blank"
                                    title="Twitter"
                                    data-cursor-effect-hover="fit"
                                >
                                    <i className="fab fa-twitter" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-12  pt-4  pt-md-0 col-lg-2 footer-column footer-column-get-in-touch">
                        <h4
                            className="text-uppercase"
                            style={{ fontSize: "1.1em", fontWeight: 600 }}
                        >
                            Company
                        </h4>
                        <div className="heading-bottom-border mb-4 " />
                        <div className="nav-footer d-flex">
                            <ul>
                                <li>
                                    <a href="about-us.asp" title="About Us">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="awards-and-recognition.asp"
                                        title=" Awards & Recognition"
                                    >
                                        Awards &amp; Recognition
                                    </a>
                                </li>
                                <li>
                                    <a href="csr.asp" title="Corp. Social Responsibility">
                                        Corp. Social Responsibility
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-12 pt-4 pt-lg-0 col-lg-2 text-start ms-lg-auto footer-column ">
                        <h4
                            className=" text-uppercase"
                            style={{ fontSize: "1.1em", fontWeight: 600 }}
                        >
                            Ship with us
                        </h4>
                        <div className="heading-bottom-border mb-4 " />
                        <div className="" />
                        <div className="nav-footer d-flex">
                            <ul>
                                <li>
                                    <a
                                        href="https://mydtdc.in/"
                                        title="Book a Shipment"
                                        target="_blank"
                                    >
                                        Book a Shipment
                                    </a>
                                </li>
                                <li>
                                    <a href="trace.asp" title="Track a Shipment">
                                        Track a Shipment{" "}
                                    </a>
                                </li>
                                <li>
                                    <a href="sales-inquiry.asp" title="Business Inquiry">
                                        Business Inquiry
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-12 pt-4 pt-md-0 col-lg-2">
                        <div className="nav-footer-container">
                            <h4
                                className="text-uppercase "
                                style={{ fontSize: "1.1em", fontWeight: 600 }}
                            >
                                Help &amp; Support
                            </h4>
                            <div className="heading-bottom-border mb-4 " />
                            <div className="nav-footer d-flex">
                                <ul>
                                    <li>
                                        <a href="mailto:customersupport@dtdc.com" title="Email Us">
                                            Email Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="location-finder.asp" title="Locate us">
                                            Locate Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="customer-care.asp" title="Customer Care">
                                            Customer Care
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 pt-4 pt-lg-0 col-lg-2 text-start ms-lg-auto footer-column ">
                        <h4
                            className=" text-uppercase"
                            style={{ fontSize: "1.1em", fontWeight: 600 }}
                        >
                            Self Service Portals
                        </h4>
                        <div className="heading-bottom-border mb-4 " />
                        <div className="" />
                        <div className="nav-footer d-flex">
                            <ul>
                                <li>
                                    <a
                                        href="https://myaccount.dtdc.com/"
                                        title="Customer Login"
                                        target="_blank"
                                    >
                                        Customer Login
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="http://frplus.dtdc.com/"
                                        title="Channel Partner Login"
                                        target="_blank"
                                    >
                                        Channel Partner Login
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="http://intra.dtdc.co.in/"
                                        title="Employee Login"
                                        target="_blank"
                                    >
                                        Employee Login
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://myaccount.dtdc.com/DPPODDownload"
                                        title="Download your PODs"
                                        target="_blank"
                                    >
                                        Download your PODs
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container py-2">
                    <div className="row py-2">
                        <div className="col-lg-8 d-flex align-items-center justify-content-center justify-content-lg-start mb-4 mb-lg-0">
                            <p>© DTDC Express Limited, All Rights Reserved.</p>
                        </div>
                        <div className="col-lg-4 d-flex align-items-center justify-content-center justify-content-lg-end mb-2">
                            <nav id="sub-menu">
                                <ul>
                                    <li>
                                        <a href="terms.asp" className="ms-1 text-decoration-none">
                                            Terms of Use
                                        </a>
                                    </li>
                                    <li>
                                        <i className="fas fa-angle-right" />
                                        <a href="privacy.asp" className="ms-1 text-decoration-none">
                                            {" "}
                                            Privacy Policy
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
