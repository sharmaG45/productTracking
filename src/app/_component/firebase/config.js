const staticTrackingData = {
    reference_no: "TRK123456789",
    origin: "New Delhi",
    destination: "Mumbai",
    booked_on: "2025-03-01T10:00:00Z",
    shipping_date: "2025-03-02T08:30:00Z",
    status: [
        { stage: "Softdata Upload", location: "New Delhi", timestamp: "2025-03-02T08:30:00Z", completed: true },
        { stage: "Picked Up", location: "New Delhi", timestamp: "2025-03-02T12:00:00Z", completed: true },
        { stage: "Accepted", location: "New Delhi", timestamp: "2025-03-03T10:14:00Z", completed: true },
        { stage: "In Transit", location: "Mumbai", timestamp: "2025-03-04T06:37:00Z", completed: false },
        { stage: "At Destination", location: "Mumbai", timestamp: "2025-03-05T17:33:00Z", completed: false },
        { stage: "RTO Accepted", location: "Mumbai", timestamp: "2025-03-06T14:38:00Z", completed: false },
    ]
};