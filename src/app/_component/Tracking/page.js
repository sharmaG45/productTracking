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
        <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                    Track Shipment
                </h1>

                {/* Input and Button */}
                <div className="flex flex-col md:flex-row gap-2">
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
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Tracking Details */}
                {trackingData && (
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tracking;
