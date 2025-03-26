"use client"; // Needed for Next.js App Router

import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Change to 4000

export default function Tracking() {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);

  const fetchTrackingData = async () => {
    setError(null);
    try {
      const res = await fetch(`/api/tracking?trackingCode=${trackingCode}`);
      const data = await res.json();
      if (res.ok) {
        setTrackingData(data);
        socket.emit("track", trackingCode); // Listen for real-time updates
      } else {
        setTrackingData(null);
        setError(data.error);
      }
    } catch (err) {
      setError("Error fetching tracking details");
    }
  };

  useEffect(() => {
    socket.on("trackingUpdate", (updatedData) => {
      if (updatedData.tracking_code === trackingCode) {
        setTrackingData(updatedData);
      }
    });

    return () => socket.off("trackingUpdate");
  }, [trackingCode]);

  return (
    <div className="container">
      <h1>Track Your Order</h1>
      <input
        type="text"
        placeholder="Enter Tracking Code"
        value={trackingCode}
        onChange={(e) => setTrackingCode(e.target.value)}
      />
      <button onClick={fetchTrackingData}>Track</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {trackingData && (
        <div className="tracking-info">
          <h3>Tracking Details:</h3>
          <p><strong>Status:</strong> {trackingData.status}</p>
          <p><strong>Type:</strong> {trackingData.type}</p>
          <p><strong>Shipping Date:</strong> {new Date(trackingData.shipping_date).toLocaleString()}</p>
          <p><strong>Shipping Cost:</strong> ${trackingData.shipping_cost}</p>
        </div>
      )}
    </div>
  );
}
