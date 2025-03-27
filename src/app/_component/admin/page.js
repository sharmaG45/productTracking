"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Admin = () => {
    const [shipments, setShipments] = useState([]);
    const [newShipment, setNewShipment] = useState({
        trackingCode: "",
        status: "Pending",
        type: "",
        shippingDate: "",
        shippingCost: ""
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingShipment, setEditingShipment] = useState(null);

    useEffect(() => {
        fetchShipments();
    }, []);

    const fetchShipments = async () => {
        const response = await fetch("/api/admin");
        const data = await response.json();
        setShipments(data);
    };

    const handleAddShipment = async () => {
        await fetch("/api/admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newShipment),
        });
        setIsAddModalOpen(false);
        fetchShipments();
    };

    const handleEditShipment = async () => {
        await fetch("/api/admin", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingShipment),
        });
        setIsEditModalOpen(false);
        fetchShipments();
    };

    const handleDeleteShipment = async (id) => {
        await fetch(`/api/admin?id=${id}`, { method: "DELETE" });
        fetchShipments();
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-blue-900 text-white p-5 md:h-full">
                <h2 className="text-xl font-semibold mb-6">Admin Dashboard</h2>
                <ul>
                    <li className="p-3 hover:bg-blue-700 rounded cursor-pointer">Dashboard</li>
                    <li className="p-3 hover:bg-blue-700 rounded cursor-pointer">Shipments</li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 overflow-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-xl md:text-2xl font-semibold">Manage Shipments</h1>
                    <button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded flex items-center mt-3 md:mt-0">
                        <FaPlus className="mr-2" /> Add Shipment
                    </button>
                </div>

                {/* Shipment Table */}
                <div className="bg-white shadow-md rounded-lg overflow-x-auto p-4">
                    <table className="w-full min-w-max border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left">Tracking Code</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-left">Shipping Date</th>
                                <th className="p-3 text-left">Cost ($)</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((shipment) => (
                                <tr key={shipment.id} className="border-b">
                                    <td className="p-3">{shipment.tracking_code}</td>
                                    <td className="p-3">{shipment.status}</td>
                                    <td className="p-3">{shipment.type}</td>
                                    <td className="p-3">{shipment.shipping_date}</td>
                                    <td className="p-3">${shipment.shipping_cost}</td>
                                    <td className="p-3 flex space-x-2">
                                        <button
                                            onClick={() => { setEditingShipment(shipment); setIsEditModalOpen(true); }}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded">
                                            <FaEdit className="mr-1" /> Edit
                                        </button>
                                        <button onClick={() => handleDeleteShipment(shipment.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                                            <FaTrash className="mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add/Edit Shipment Modal */}
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 px-4">
                        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">{isEditModalOpen ? "Edit Shipment" : "Add Shipment"}</h2>
                            <label className="block mb-2">Tracking Code</label>
                            <input type="text" className="w-full p-2 border rounded" value={isEditModalOpen ? editingShipment.tracking_code : newShipment.trackingCode} onChange={(e) => {
                                if (isEditModalOpen) setEditingShipment({ ...editingShipment, tracking_code: e.target.value });
                                else setNewShipment({ ...newShipment, trackingCode: e.target.value });
                            }} />
                            <label className="block mt-3 mb-2">Status</label>
                            <select className="w-full p-2 border rounded" value={isEditModalOpen ? editingShipment.status : newShipment.status} onChange={(e) => {
                                if (isEditModalOpen) setEditingShipment({ ...editingShipment, status: e.target.value });
                                else setNewShipment({ ...newShipment, status: e.target.value });
                            }}>
                                <option value="In Transit">In Transit</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Pending">Pending</option>
                            </select>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                                <button onClick={isEditModalOpen ? handleEditShipment : handleAddShipment} className="bg-blue-600 text-white px-4 py-2 rounded">{isEditModalOpen ? "Update" : "Add"}</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin;