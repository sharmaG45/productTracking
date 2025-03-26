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
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-2xl font-bold text-center mb-4">Track Shipment</h1>
                <div className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        className="border p-2 rounded w-full md:w-3/4"
                        placeholder="Enter Tracking Code"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                    />
                    <button
                        onClick={fetchTrackingData}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Track
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {trackingData && (
                    <div className="tracking-info mt-6">
                        <h3 className="text-lg font-semibold">Tracking Details:</h3>
                        <p>
                            <strong>Status:</strong> {trackingData.status}
                        </p>
                        <p>
                            <strong>Type:</strong> {trackingData.type}
                        </p>
                        <p>
                            <strong>Shipping Date:</strong>{' '}
                            {new Date(trackingData.shipping_date).toLocaleString()}
                        </p>
                        <p>
                            <strong>Shipping Cost:</strong> ${trackingData.shipping_cost}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tracking;
