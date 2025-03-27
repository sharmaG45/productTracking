
const aboutData = [
    {
        title: "India’s Largest Channel Partner Network",
        description: "In 1990, we pioneered the Franchisee Model in the Express Logistics industry in India. DTDC today, has more than 16,000 Channel Partners...",
        image: "img/aboutus/LocalRootsGlobalReach.jpg",
    },
    {
        title: "From Local Roots to Global Reach",
        description: "What began as a humble home-grown courier service has transformed into a globally recognized express logistics leader...",
        image: "img/aboutus/Unmatched_Coverage.jpg",
    },
    {
        title: "Unmatched Coverage and Reach",
        description: "With over 16,000 channel partners, we service more than 14,300 pin codes across India, reaching approximately 96% of the country’s population...",
        image: "img/aboutus/India-LargestChannelPartnerNetwork.jpg",
    },
    {
        title: "A Strong & Trusted Brand",
        description: "Our dedication to maintaining and enhancing our status as a trusted brand is unwavering...",
        image: "img/aboutus/StrongtrustedBrand.jpg",
    },
    {
        title: "Strategic Global Partnerships",
        description: "In 2013, we partnered with GeoPost, the express logistics division of France's well-known La Poste Group, to enhance our global presence...",
        image: "img/aboutus/StrategicGlobalPartnerships.jpg",
    },
    {
        title: "Commitment to Innovation and Excellence",
        description: "Our journey from a local courier service to a global express logistics leader has been driven by our commitment to innovation and customer satisfaction...",
        image: "img/aboutus/Innovation_Excellence.jpg",
    },
];
const AboutUs = () => {
    return (

        <>

            <section className="pt-5 pb-5">
                <div className="container mx-auto px-4">
                    <div className="mb-3 text-left">
                        <h4 className="mb-0 text-2xl font-normal shadow-md animate-fadeInLeft">About us</h4>
                        <div className="border-b-2 border-gray-300 w-20 mb-3"></div>
                        <p className="mb-0 max-w-2xl">
                            DTDC is India’s leading integrated express logistics provider, operating the largest network of customer access points in the country. Our technology-driven logistics solutions cater to a wide range of customers across diverse industry verticals, making us a trusted partner in delivering excellence.
                        </p>
                    </div>

                    {/* About Us Sections */}
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                        {aboutData.map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center md:items-start">
                                <div className="w-1/3 hidden md:block">
                                    <img src={item.image} alt={item.title} className="w-full h-auto" />
                                </div>
                                <div className="w-full md:w-2/3 p-4">
                                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="bg-blue-500">
                <div className="container mx-auto px-4 py-10">
                    <h2 className="text-white text-2xl font-semibold mb-6">Business Verticals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Express Parcels */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-3">
                                <img src="/img/aboutus/Express_Parcels.png" alt="Express Parcels" />
                                <h4 className="text-lg font-bold">Express Parcels</h4>
                            </div>
                            <p className="mt-3 text-gray-700">
                                From time-critical express delivery to cost-effective ground solutions, our Express Parcels Vertical serves both C2C and B2B customers. We handle everything from documents to part-truck-load shipments, offering reliable day-definite and time-definite options for all your shipping needs.
                            </p>
                            <a href="express-parcels.asp" className="flex items-center mt-4 text-blue-600 font-medium hover:underline">
                                Learn More
                                <img src="/img/aboutus/Vector-icon.png" alt="Arrow" className="ml-2" />
                            </a>
                        </div>

                        {/* International Shipping */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-3">
                                <img src="/img/aboutus/International1.png" alt="International Shipping" />
                                <h4 className="text-lg font-bold">International Shipping</h4>
                            </div>
                            <p className="mt-3 text-gray-700">
                                We provide a variety of international shipping options for both individual and business customers. From urgent document delivery to budget-friendly parcel solutions, we meet all international shipping needs with reliable and flexible services.
                            </p>
                            <a href="international-shipments.asp" className="flex items-center mt-4 text-blue-600 font-medium hover:underline">
                                Learn More
                                <img src="/img/aboutus/Vector-icon.png" alt="Arrow" className="ml-2" />
                            </a>
                        </div>

                        {/* Integrated E-Commerce Logistics */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-3">
                                <img src="/img/aboutus/Integrated1.png" alt="Integrated E-Commerce Logistics" />
                                <h4 className="text-lg font-bold">Integrated E-Commerce Logistics</h4>
                            </div>
                            <p className="mt-3 text-gray-700">
                                Tailored for the booming e-commerce sector, our vertical supports aggregators, D2C brands, and B2C customers. We offer solutions for both time-sensitive e-commerce shipments and cost-effective deliveries for lower-value B2C orders.
                            </p>
                            <a href="integrated-e-commerce-logistics.asp" className="flex items-center mt-4 text-blue-600 font-medium hover:underline">
                                Learn More
                                <img src="/img/aboutus/Vector-icon.png" alt="Arrow" className="ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>




    );
};


export default AboutUs;