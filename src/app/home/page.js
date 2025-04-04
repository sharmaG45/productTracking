'use client';

import { useState, useEffect } from 'react';
import { fireStore } from "@/app/_component/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import io from 'socket.io-client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const socket = io('http://localhost:4000');

const Tracking = () => {
    const [referenceNo, setReferenceNo] = useState("");
    const [shipmentDetails, setShipmentDetails] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [trackingType, setTrackingType] = useState("referenceNo");
    const [error, setError] = useState("");


    const fetchShipmentByReference = async () => {
        setLoading(true);
        setError("");
        setShipmentDetails(null);

        try {
            // Determine field to query based on selected radio button
            let fieldToQuery = trackingType === "awb" ? "reference_no" : "order_no";

            const shipmentQuery = query(
                collection(fireStore, "shipments"),
                where(fieldToQuery, "==", referenceNo.trim())
            );

            const querySnapshot = await getDocs(shipmentQuery);

            if (!querySnapshot.empty) {
                const shipmentData = querySnapshot.docs[0].data();
                setShipmentDetails(shipmentData);
            } else {
                setError(
                    "No shipment found with this " +
                    (trackingType === "awb" ? "AWB" : "Order Number") +
                    "."
                );
            }
        } catch (error) {
            setError("Error fetching shipment details.");
            console.error("Error:", error);
        }

        setLoading(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };


    // const fetchShipmentByReference = async () => {
    //     setLoading(true);
    //     setError("");
    //     setShipmentDetails(null);

    //     try {
    //         const shipmentQuery = query(
    //             collection(fireStore, "shipments"),
    //             where("reference_no", "==", referenceNo)
    //         );
    //         const querySnapshot = await getDocs(shipmentQuery);

    //         if (!querySnapshot.empty) {
    //             const shipmentData = querySnapshot.docs[0].data();
    //             setShipmentDetails(shipmentData);
    //         } else {
    //             setError("No shipment found with this reference number.");
    //         }
    //     } catch (error) {
    //         setError("Error fetching shipment details.");
    //         console.error("Error:", error);
    //     }
    //     setLoading(false);
    // };

    return (
        <>
            <div className=" container mx-auto px-4 py-6 ">
                <div className="row pt-5 ">
                    <div className="col">
                        <div className="row">
                            <div className="col-lg-12 pb-sm-4 pb-lg-0 ">
                                <h1
                                    className="text-color-dark font-weight-normal mb-2 text-7 abox-shadow-1 appear-animation animated fadeInUpShorter appear-animation-visible"
                                    data-appear-animation="fadeInUpShorter"
                                    data-appear-animation-delay={500}
                                    style={{ animationDelay: "500ms" }}
                                >
                                    <strong>Track Shipment</strong>
                                </h1>
                                <div className="heading-bottom-border mb-4 " />
                                <form
                                    role="form "
                                    className="needs-validation pt-3"
                                    name="trackingHomeForm"
                                    id="trackingHomeForm"
                                    method="post"
                                    action="trace.asp"
                                    noValidate="novalidate"
                                >
                                    <input type="hidden" name="formDtdc" defaultValue="CSRFdtdc" />
                                    <input type="hidden" name="action" defaultValue="track" />
                                    <input
                                        type="hidden"
                                        name="captchaKeyval"
                                        id="captchaKeyval"
                                        defaultValue="1743070489671-db747678-acf5-418e-aebd-bb5bf98cfc34"
                                    />
                                    <input type="hidden" name="sec" defaultValue="tr" />
                                    <input type="hidden" name="ctlActiveVal" defaultValue={1} />
                                    <input type="hidden" name="Ttype" />
                                    <input type="hidden" name="GES" />
                                    <input type="hidden" name="flag" defaultValue={1} />
                                    {/*<div class="row mb-5">*/}
                                    <div className="row">
                                        <div className="col-lg-6 mb-4 mb-lg-0">
                                            <h4 className="form-label text-4">
                                                To track your consignment, please enter your tracking number (AWB/ CONSIGNMENT NUMBER).
                                            </h4>
                                            <div className="row pt-2">
                                                <div className="form-group col">

                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label ">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="trackingType"
                                                                data-msg-required="Please select at least one option."
                                                                value="awb"
                                                                id="awb"
                                                                checked={trackingType === "awb"}
                                                                onChange={(e) => setTrackingType(e.target.value)}
                                                            />
                                                            AWB
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label ">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="trackingType"
                                                                data-msg-required="Please select at least one option."
                                                                value="order"
                                                                id="order"
                                                                checked={trackingType === "order"}
                                                                onChange={(e) => setTrackingType(e.target.value)}
                                                            />
                                                            ORDER NUMBER
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row pt-2">
                                                <div className="form-group col">
                                                    <textarea
                                                        data-msg-required=""
                                                        rows={1}
                                                        className="form-control"
                                                        name="trackingNumber"
                                                        id="trackingNumber"
                                                        required=""
                                                        value={referenceNo}
                                                        onChange={(e) => setReferenceNo(e.target.value)}
                                                    />
                                                    {/*<input type="text"  data-msg-required="" class="form-control" name="trackingNumber" id="trackingNumber" onkeyup="limitCnNumbers()" maxlength="400" required="" value="">*/}
                                                </div>
                                                <p className="m-0" style={{ color: "#2F4F4F", fontSize:'1.1rem' }}>
                                                    To track multiple consignments, please enter any combination of up to 25 tracking numbers, separated by commas
                                                </p>
                                            </div>
                                            <div className="row pt-2 justify-content-between">
                                                <div className="checkbox mb-3 w-75">
                                                    {/*<label class="col-md-4 control-label" for="button1id"></label>*/}
                                                    <div className="col-md-12 d-md-flex gap-2">

                                                        <div className="form-group m-0">
                                                            <input
                                                                type="button"
                                                                defaultValue="Track"
                                                                className="btn btn-primary px-4 py-3 text-center text-uppercase font-weight-light "
                                                                data-loading-text="Loading..."
                                                                onClick={fetchShipmentByReference}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Slider */}

                                        <div className="col-lg-6 mb-4 mb-lg-0 carousel-display-max">
                                            <Slider {...settings}>
                                                <div>
                                                    <img
                                                        src="/assets/images/edd_redd_banner.jpg"
                                                        className="d-block w-100 rounded-3xl border-none"
                                                        alt="Slide 1"
                                                    />
                                                </div>
                                                <div>
                                                    <img
                                                        src="/assets/images/EDDnewBanner.jpeg"
                                                        className="d-block w-100 rounded-3xl border-none"
                                                        alt="Slide 2"
                                                    />
                                                </div>
                                            </Slider>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}

                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Tracking Details */}
                {shipmentDetails && (
                    <>
                        <div className="container">

                            <div className="container-fluid p-0" id="printdiv">
                                <div
                                    className="header_content d-md-flex justify-content-between align-items-center p-2"
                                    style={{ backgroundColor: "#0E2C53" }}
                                >
                                    <div className="tracking_details d-flex gap-2">
                                        <h5 className="text-white m-0">
                                            Tracking Details : <span className="h6">{shipmentDetails.reference_no}</span>
                                        </h5>
                                        {/*<p class="text-white m-0">I14566497</p>*/}
                                    </div>
                                    <div className="tracking_icons">
                                        <ul className="list-unstyled m-0 d-flex gap-3 ">

                                            <li>
                                                <a
                                                    href="/home/contact-us"
                                                    className="text-decoration-none text-white"
                                                >
                                                    {" "}
                                                    Raise your Query
                                                </a>
                                                <img src="/assets/images/edit_icon.svg" style={{ width: "16%" }} />
                                            </li>

                                        </ul>
                                        {/* Modal */}
                                        <div
                                            className="modal fade"
                                            id="exampleModal"
                                            tabIndex={-1}
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog modal-dialog-centered justify-content-center">
                                                <div className="modal-content w-75">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">
                                                            Mail Me
                                                        </h5>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        />
                                                    </div>
                                                    <div className="modal-body">
                                                        <form className="row g-3">
                                                            <div className="col-auto">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="exampleFormControlInput1"
                                                                        placeholder="Enter Email Id"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <button type="submit" className="btn btn-primary mb-3">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End Modal */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        {/* Header summary */}
                                        <div className="row my-4 mb-2">
                                            <div className="header_summary_main d-md-flex d-sm-flex text-break d-flex justify-evenly">
                                                <div className="reference_no w-sm-50 float-start mb-2 w-25">
                                                    <div className="reference_no">
                                                        <p className="h6 text-muted mb-1 mb-lg-3">Reference No</p>
                                                        <p className="h6 milestone_title text-dark">{shipmentDetails.reference_no}</p>
                                                    </div>
                                                </div>
                                                <div className="origin w-sm-50 float-start mb-2 w-25">
                                                    <div className="reference_no">
                                                        <p className="h6 text-muted mb-1 mb-lg-3">Origin</p>
                                                        <p className="h6 milestone_title text-dark">{shipmentDetails.origin}</p>
                                                    </div>
                                                </div>
                                                <div className="destination w-sm-50 float-start mb-2 w-25">
                                                    <div className="reference_no">
                                                        <p className="h6 text-muted mb-1 mb-lg-3">Destination</p>
                                                        <p className="h6 milestone_title text-dark">
                                                            {shipmentDetails.destination}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="booked_on w-sm-50 float-start mb-2 w-25">
                                                    <div className="reference_no">
                                                        <p className="h6 text-muted mb-1 mb-lg-3">Booked On</p>
                                                        <p className="h6 milestone_title text-dark">
                                                            {new Date(shipmentDetails.booked_on).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End Header summary */}
                                        <div className="timeline-steps d-md-flex justify-content-md-between justify-content-lg-between milestone-tracker-XS">
                                            {shipmentDetails.status && shipmentDetails.status.length > 0 ? (
                                                shipmentDetails.status.map((status, index) => (
                                                    <div
                                                        className="timeline-step text-sm-center text-md-start"
                                                        key={index}
                                                    >
                                                        <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                            <div className="inner-circle">
                                                                {status.completed && (
                                                                    <img
                                                                        src="/assets/images/Check.svg"
                                                                        className="position-absolute" alt="Completed"
                                                                    />
                                                                )}

                                                            </div>
                                                            <div>
                                                                <p className="h6 milestone_title text-dark">
                                                                    {status.stage}
                                                                </p>
                                                                <p className="h6 text-muted mb-1 mb-lg-3">
                                                                    {status.location}
                                                                    <br />
                                                                    {new Date(status.timestamp).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No status updates available.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">

                                        {/* Milestone for XS */}
                                        <div
                                            className="accordion accordion-flush milestone-tracker-LG"
                                            id="accordionFlushExample"
                                        >
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="flush-headingOne">
                                                    <button
                                                        className={`accordion-button px-2 py-0 ${isMenuOpen ? "" : "collapsed"}`}
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#flush-collapseOne"
                                                        aria-expanded={isMenuOpen ? "true" : "false"}
                                                        aria-controls="flush-collapseOne"
                                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                                    >

                                                        See all Updates
                                                    </button>
                                                </h2>

                                                {isMenuOpen &&

                                                    <div
                                                        id="flush-collapseOne"

                                                        aria-labelledby="flush-headingOne"
                                                        data-bs-parent="#accordionFlushExample"
                                                    >
                                                        <div className="accordion-body p-0">
                                                            <div className="timeline-steps d-md-flex justify-content-md-between justify-content-lg-between">
                                                                {shipmentDetails.status && shipmentDetails.status.length > 0 ? (
                                                                    shipmentDetails.status.map((status, index) => (
                                                                        <div
                                                                            className="timeline-step text-sm-center text-md-start"
                                                                            key={index}
                                                                        >
                                                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                                                <div className="inner-circle">
                                                                                    {status.completed && (
                                                                                        <img
                                                                                            src="/assets/images/Check.svg"
                                                                                            className="position-absolute" alt="Completed"
                                                                                        />
                                                                                    )}

                                                                                </div>
                                                                                <div>
                                                                                    <p className="h6 milestone_title text-dark">
                                                                                        {status.stage}
                                                                                    </p>
                                                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                                                        {status.location}
                                                                                        <br />
                                                                                        {new Date(status.timestamp).toLocaleString()}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <p>No status updates available.</p>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                        {/* End Milestone for XS */}
                                    </div>
                                </div>
                            </div>
                            <div className="rowpb-5" data-id="f3779eb">
                                <div
                                    className="col-lg-6 mb-4 mb-lg-0 order-sm-first order-md-last d-block d-sm-none"
                                    style={{ marginTop: "12px !important" }}
                                >
                                    <div
                                        id="carouselExampleIndicators"
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-indicators">
                                            <button
                                                type="button"
                                                data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to={0}
                                                className="active"
                                                aria-label="Slide 0"
                                            />
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img
                                                    src="/assets/images/edd_redd_banner.jpg"
                                                    className="d-block w-100 radius-20"
                                                    alt="..."
                                                />
                                            </div>{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pb-lg-0 pt-3 pb-5" data-id="d24928e">
                                <p className="text-4">
                                    <span style={{ color: "#dc0032" }}>BEWARE OF FRAUD CALLS.</span> We{" "}
                                    <span style={{ color: "#dc0032" }}>will naver </span>ask for any payment
                                    through <span style={{ color: "#dc0032" }}>OTP/UPI</span>
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Tracking;
