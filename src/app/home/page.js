'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Tracking = () => {
    const [trackingCode, setTrackingCode] = useState('');
    const [trackingData, setTrackingData] = useState(null);
    const [error, setError] = useState(null);

    const fetchTrackingData = async () => {
        setError(null);
        try {
            const res = await fetch(`/api/tracking?trackingCode=${trackingCode}`);
            const data = await res.json();
            if (res.ok) {
                setTrackingData(data);
                socket.emit('track', trackingCode);
            } else {
                setTrackingData(null);
                setError(data.error);
            }
        } catch (err) {
            setError('Error fetching tracking details');
        }
    };

    useEffect(() => {
        socket.on('trackingUpdate', (updatedData) => {
            if (updatedData.tracking_code === trackingCode) {
                setTrackingData(updatedData);
            }
        });

        return () => socket.off('trackingUpdate');
    }, [trackingCode]);

    return (




        <>

            <div className="container">
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
                                                To track your consignment please enter DTDC tracking number
                                                (Reference Number)
                                            </h4>
                                            <div className="row pt-2">
                                                <div className="form-group col">
                                                    {/* <div className="form-check form-check-inline">
                                                        <label className="form-check-label ">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="trackingType"
                                                                data-msg-required="Please select at least one option."
                                                                id="trackingType"
                                                                defaultValue="consignmentNo"
                                                                defaultChecked="checked"
                                                                required=""
                                                            />
                                                            AWB/ CONSIGNMENT NUMBER
                                                        </label>
                                                    </div> */}
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label ">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="trackingType"
                                                                data-msg-required="Please select at least one option."
                                                                id="trackingType"
                                                                defaultValue="referenceNo"
                                                                required=""
                                                            />
                                                            REFERENCE NUMBER
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
                                                        value={trackingCode}
                                                        onChange={(e) => setTrackingCode(e.target.value)}
                                                    />
                                                    {/*<input type="text"  data-msg-required="" class="form-control" name="trackingNumber" id="trackingNumber" onkeyup="limitCnNumbers()" maxlength="400" required="" value="">*/}
                                                </div>
                                                <p className="m-0" style={{ color: "#2F4F4F" }}>
                                                    To track multiple consignment please enter any combination
                                                    of up to 25 DTDC tracking numbers, separated by comma.
                                                </p>
                                            </div>
                                            <div className="row pt-2 justify-content-between">
                                                <div className="checkbox mb-3 w-75">
                                                    {/*<label class="col-md-4 control-label" for="button1id"></label>*/}
                                                    <div className="col-md-12 d-md-flex gap-2">
                                                        {/* <div id="captcha-container" className="d-md-flex gap-2">
                                                            <img
                                                                id="captchaImage"
                                                                src="data:image/png;base64,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"
                                                                alt="CAPTCHA Image"
                                                                width={200}
                                                                height={50}
                                                            />
                                                            <button
                                                                style={{
                                                                    border: "none",
                                                                    background: "transparent",
                                                                    cursor: "pointer",
                                                                    fontSize: 20,
                                                                    marginLeft: 10
                                                                }}
                                                            >
                                                                🔄
                                                            </button>
                                                        </div> */}
                                                        {/* <div
                                                            id="error-message"
                                                            style={{ color: "red", display: "block" }}
                                                        />
                                                        <br />
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="captchaInput"
                                                            name="captchaInput"
                                                            placeholder="Enter CAPTCHA"
                                                            style={{ width: "auto !important" }}
                                                        /> */}
                                                        <div className="form-group m-0">
                                                            <input
                                                                type="button"
                                                                defaultValue="Track"
                                                                className="btn btn-primary px-4 py-3 text-center text-uppercase font-weight-light "
                                                                data-loading-text="Loading..."
                                                                onClick={fetchTrackingData}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4 mb-lg-0 carousel-display-max">
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* Input and Button */}
            {/* <div className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        className="border p-3 rounded-lg w-full md:w-3/4 bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter Tracking Code"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                    />
                    <button
                        onClick={fetchTrackingData}
                        className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Track
                    </button>
                </div> */}





            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Tracking Details */}
            {trackingData && (
                <>

                    <div className="container">

                        <div className="container-fluid p-0" id="printdiv">
                            <div
                                className="header_content d-md-flex justify-content-between align-items-center p-2"
                                style={{ backgroundColor: "#0E2C53" }}
                            >
                                <div className="tracking_details d-flex gap-2">
                                    <h5 className="text-white m-0">
                                        Tracking Details : <span className="h6">{trackingData.tracking_code}</span>
                                    </h5>
                                    {/*<p class="text-white m-0">I14566497</p>*/}
                                </div>
                                <div className="tracking_icons">
                                    <ul className="list-unstyled m-0 d-flex gap-3 ">
                                        {/*<li><a href="#" class="text-decoration-none text-white" data-bs-toggle="modal" data-bs-target="#exampleModal"> 
                <img src="img/mail_me_1.svg">Mail me</a>
             </li>*/}
                                        <li>
                                            <a
                                                href="raise_a_service_query.asp"
                                                className="text-decoration-none text-white"
                                            >
                                                {" "}
                                                Raise your Query
                                            </a>
                                            <img src="/assets/images/edit_icon.svg" style={{ width: "16%" }} />
                                        </li>
                                        {/*<li><a href="javascript:window.print()"  class="text-decoration-none text-white">
                <img src="img/print_1.svg">Print</a>
             </li>*/}
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
                                <div className="col-lg-9 col-md-9 col-sm-12">
                                    {/* Header summary */}
                                    <div className="row my-4 mb-2">
                                        <div className="header_summary_main d-md-flex d-sm-flex text-break">
                                            <div className="reference_no w-sm-50 float-start mb-2 w-25">
                                                <div className="reference_no">
                                                    <p className="h6 text-muted mb-1 mb-lg-3">Reference No</p>
                                                    <p className="h6 milestone_title text-dark">{trackingData.reference_no}</p>
                                                </div>
                                            </div>
                                            <div className="origin w-sm-50 float-start mb-2 w-25">
                                                <div className="reference_no">
                                                    <p className="h6 text-muted mb-1 mb-lg-3">Origin</p>
                                                    <p className="h6 milestone_title text-dark">{trackingData.origin}</p>
                                                </div>
                                            </div>
                                            <div className="destination w-sm-50 float-start mb-2 w-25">
                                                <div className="reference_no">
                                                    <p className="h6 text-muted mb-1 mb-lg-3">Destination</p>
                                                    <p className="h6 milestone_title text-dark">
                                                        {trackingData.destination}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="booked_on w-sm-50 float-start mb-2 w-25">
                                                <div className="reference_no">
                                                    <p className="h6 text-muted mb-1 mb-lg-3">Booked On</p>
                                                    <p className="h6 milestone_title text-dark">
                                                        {new Date(trackingData.booked_on).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Header summary */}
                                    <div className="timeline-steps d-md-flex justify-content-md-between justify-content-lg-between milestone-tracker-XS">
                                        <div
                                            className="timeline-step text-sm-center text-md-start"
                                            id="Softdata Upload"
                                        >
                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                <div className="inner-circle">
                                                    <img src="/assets/images/Check.svg" className="position-absolute" />
                                                </div>
                                                <div>
                                                    <p className="h6 milestone_title text-dark">Softdata Upload</p>
                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                        <br />
                                                        {trackingData.shipping_date}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="timeline-step text-sm-center text-md-start"
                                            id="Picked Up"
                                        >
                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                <div className="inner-circle">
                                                    <img src="/assets/images/Check.svg" className="position-absolute" />
                                                </div>
                                                <div>
                                                    <p className="h6 milestone_title text-dark">Picked Up</p>
                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                        <br />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="timeline-step text-sm-center text-md-start"
                                            id="Accepted"
                                        >
                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                <div className="inner-circle">
                                                    <img src="/assets/images/Check.svg" className="position-absolute" />
                                                </div>
                                                <div>
                                                    <p className="h6 milestone_title text-dark">Accepted</p>
                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                        {trackingData.origin}
                                                        <br />
                                                        Tue, 4th Mar'25 @10:14 PM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="timeline-step text-sm-center text-md-start"
                                            id="In Transit"
                                        >
                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                <div className="inner-circle">
                                                    <img src="/assets/images/Check.svg" className="position-absolute" />
                                                </div>
                                                <div>
                                                    <p className="h6 milestone_title text-dark">In Transit</p>
                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                        {trackingData.destination}
                                                        <br />
                                                        Wed, 5th Mar'25 @6:37 AM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="timeline-step text-sm-center text-md-start"
                                            id="At Destination"
                                        >
                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                <div className="inner-circle">
                                                    <img src="/assets/images/Check.svg" className="position-absolute" />
                                                </div>
                                                <div>
                                                    <p className="h6 milestone_title text-dark">At Destination</p>
                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                        GHAZIABAD
                                                        <br />
                                                        Wed, 5th Mar'25 @5:33 PM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="timeline-step text-sm-center text-md-start"
                                            id="RTO Accepted"
                                        >
                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                <div className="inner-circle">
                                                    <img src="/assets/images/Check.svg" className="position-absolute" />
                                                </div>
                                                <div>
                                                    <p className="h6 milestone_title text-dark">RTO Accepted</p>
                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                        GHAZIABAD
                                                        <br />
                                                        Thu, 6th Mar'25 @2:38 PM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12">
                                    <div
                                        className="timeline-content my-3"
                                        data-toggle="popover"
                                        data-trigger="hover"
                                        data-placement="top"
                                        title=""
                                        data-content="And here's some amazing content. It's very engaging. Right?"
                                        data-original-title={2020}
                                    >
                                        <p className="h6 fst-normal color-muted m-0">Status</p>
                                        <p className="h4 fw-bold text-dark">Return - Inititaited</p>
                                        <p className="h6 milestone_title" style={{ color: "red" }}>
                                            {" "}
                                            [Address Incomplete On Package]{" "}
                                        </p>
                                        <p className="h6 milestone_title">Thu, 6th Mar'25 @2:38 PM</p>
                                        <p className="h6 text-muted mb-1 mb-lg-3"></p>
                                        <p className="h6 milestone_title"></p>
                                        <p className="h6 text-muted mb-1 mb-lg-3"></p>
                                        <p className="h6 milestone_title">GHAZIABAD APEX, GHAZIABAD</p>
                                    </div>
                                    {/* Milestone for XS */}
                                    <div
                                        className="accordion accordion-flush milestone-tracker-LG"
                                        id="accordionFlushExample"
                                    >
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="flush-headingOne">
                                                <button
                                                    className="accordion-button collapsed px-2 py-0"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#flush-collapseOne"
                                                    aria-expanded="false"
                                                    aria-controls="flush-collapseOne"
                                                >
                                                    See all Updates
                                                </button>
                                            </h2>
                                            <div
                                                id="flush-collapseOne"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="flush-headingOne"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div className="accordion-body p-0">
                                                    <div className="timeline-steps d-md-flex justify-content-md-between justify-content-lg-between">
                                                        <div
                                                            className="timeline-step text-sm-center text-md-start"
                                                            id="Softdata Upload2"
                                                        >
                                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                                <div className="inner-circle">
                                                                    <img
                                                                        src="/assets/images/Check.svg"
                                                                        className="position-absolute"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="h6 milestone_title text-dark">
                                                                        Softdata Upload
                                                                    </p>
                                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                                        <br />
                                                                        Tue, 4th Mar'25 @7:51 PM
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="timeline-step text-sm-center text-md-start"
                                                            id="Picked Up2"
                                                        >
                                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                                <div className="inner-circle">
                                                                    <img
                                                                        src="/assets/images/Check.svg"
                                                                        className="position-absolute"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="h6 milestone_title text-dark">
                                                                        Picked Up
                                                                    </p>
                                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                                        <br />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="timeline-step text-sm-center text-md-start"
                                                            id="Accepted2"
                                                        >
                                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                                <div className="inner-circle">
                                                                    <img
                                                                        src="/assets/images/Check.svg"
                                                                        className="position-absolute"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="h6 milestone_title text-dark">Accepted</p>
                                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                                        DELHI
                                                                        <br />
                                                                        Tue, 4th Mar'25 @10:14 PM
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="timeline-step text-sm-center text-md-start"
                                                            id="In Transit2"
                                                        >
                                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                                <div className="inner-circle">
                                                                    <img
                                                                        src="/assets/images/Check.svg"
                                                                        className="position-absolute"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="h6 milestone_title text-dark">
                                                                        In Transit
                                                                    </p>
                                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                                        SAHIBABAD
                                                                        <br />
                                                                        Wed, 5th Mar'25 @6:37 AM
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="timeline-step text-sm-center text-md-start"
                                                            id="At Destination2"
                                                        >
                                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                                <div className="inner-circle">
                                                                    <img
                                                                        src="/assets/images/Check.svg"
                                                                        className="position-absolute"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="h6 milestone_title text-dark">
                                                                        At Destination
                                                                    </p>
                                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                                        GHAZIABAD
                                                                        <br />
                                                                        Wed, 5th Mar'25 @5:33 PM
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="timeline-step text-sm-center text-md-start"
                                                            id="RTO Accepted2"
                                                        >
                                                            <div className="timeline-content text-sm-center text-md-start XS-d-flex">
                                                                <div className="inner-circle">
                                                                    <img
                                                                        src="/assets/images/Check.svg"
                                                                        className="position-absolute"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="h6 milestone_title text-dark">
                                                                        RTO Accepted
                                                                    </p>
                                                                    <p className="h6 text-muted mb-1 mb-lg-3">
                                                                        GHAZIABAD
                                                                        <br />
                                                                        Thu, 6th Mar'25 @2:38 PM
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Milestone for XS */}
                                </div>
                            </div>
                        </div>
                        <div className="rowpb-5" data-id="f3779eb">
                            {/* <div class="col-lg-12 pb-sm-4 pb-lg-0">
  
</div>*/}
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
                                                src="img/TrackingSlides/edd_redd_banner.jpg"
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
                                <span style={{ color: "#dc0032" }}>BEWARE OF FRAUD CALLS.</span> DTDC{" "}
                                <span style={{ color: "#dc0032" }}>won't </span>ask for any payment
                                through <span style={{ color: "#dc0032" }}>OTP/UPI</span>
                            </p>
                        </div>
                    </div>


                    {/* 
        <div className="tracking-info mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tracking Details:</h3>
            <p className="text-gray-700 dark:text-gray-300">
                <strong>Status:</strong> {trackingData.status}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <strong>Type:</strong> {trackingData.type}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <strong>Shipping Date:</strong> {new Date(trackingData.shipping_date).toLocaleString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <strong>Shipping Cost:</strong> ${trackingData.shipping_cost}
            </p>
        </div> */}

                </>


            )}

        </>
    );
};

export default Tracking;
