'use client';

import { useState } from "react";
import { fireStore } from "@/app/_component/firebase/config";
import { collection, addDoc } from "firebase/firestore";

const contact = () => {

    const [formStatus, setFormStatus] = useState(null); // success | error | null
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus(null);

        try {
            // 1. Save to Firebase
            await addDoc(collection(fireStore, "contacts"), {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                createdAt: new Date(),
            });

            // 2. Send email to you (via any email provider key and password)
            // await emailjs.send(
            //     "your_service_id",
            //     "your_template_id",
            //     {
            //         name: formData.name,
            //         email: formData.email,
            //         message: formData.message,
            //     },
            //     "your_public_key"
            // );

            setFormStatus("success");
            // alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setFormStatus("error");
            // alert("Failed to send message.");
        }
    };

    return <>

        <section
            className="page-header page-header-modern page-header-background page-header-background-md overlay overlay-color-dark overlay-show overlay-op-2"
            style={{ backgroundImage: "none", backgroundColor: "#0E2C53" }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-12 align-self-center p-static order-2 text-left">
                        <h1
                            className="text-9 abox-shadow-1 fadeInLeft appear-animation animated fadeInleft appear-animation-visible"
                            data-appear-animation="fadeInleft"
                            data-appear-animation-delay={500}
                            style={{ animationDelay: "500ms" }}
                        >
                            Contact Us
                        </h1>
                        <div className="heading-bottom-border " />
                    </div>
                </div>
            </div>
        </section>

        <div className="container">
            <div className="row pt-5 pb-5">
                <div className="col">
                    <div className="row">
                        <div
                            className="col-lg-12 pb-sm-4 pb-lg-0 abox-shadow-1 appear-animation animated fadeInUpShorter appear-animation-visible"
                            data-appear-animation="fadeInUpShorter"
                            data-appear-animation-delay={500}
                            style={{ animationDelay: "500ms" }}
                        >
                            <h5>
                                Contact Us – We'd love to hear from you. Please fill out the form below with your query.
                            </h5>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2 pb-sm-4 pb-lg-0 "></div>

                        <div className="col-lg-8 pb-sm-4 pb-lg-0 ">
                            <form
                                className="contact-form custom-form-style-1 appear-animation animated fadeIn appear-animation-visible"
                                data-appear-animation="fadeIn"
                                data-appear-animation-delay={100}
                                name="contactForm"
                                id="contactForm"
                                method="post"
                                onSubmit={handleSubmit}
                                autoComplete="off"
                                noValidate="novalidate"
                                style={{ animationDelay: "100ms" }}
                            >
                                {formStatus === "success" && (
                                    <div className="contact-form-success alert alert-success mt-4">
                                        <strong>Success!</strong> Your message has been sent to us.
                                    </div>
                                )}
                                {formStatus === "error" && (
                                    <div className="contact-form-error alert alert-danger mt-4">
                                        <strong>Error!</strong> There was an error sending your message.
                                        <span className="mail-error-message text-1 d-block" />
                                    </div>
                                )}

                                <div className="row">
                                    <div className="form-group col">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="form-control"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col">
                                        <input
                                            type="email"
                                            placeholder="Email ID"
                                            className="form-control"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col">
                                        <textarea
                                            placeholder="Message"
                                            className="form-control"
                                            name="message"
                                            id="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col">
                                        <input
                                            type="submit"
                                            defaultValue="Send Message"
                                            className="btn btn-primary px-4 py-3 text-center text-uppercase font-weight-light"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-2 pb-sm-4 pb-lg-0 "></div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default contact;