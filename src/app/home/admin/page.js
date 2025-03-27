"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Admin = () => {
    const [shipments, setShipments] = useState([]);
    const [newShipment, setNewShipment] = useState({
        tracking_code: "",
        status: "Pending",
        type: "",
        shipping_date: "",
        shipping_cost: "",
        reference_no: "",
        origin: "",
        destination: "",
        booked_on: ""
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingShipment, setEditingShipment] = useState(null);

    useEffect(() => {
        fetchShipments();
    }, []);

    const fetchShipments = async () => {
        try {
            const response = await fetch("/api/admin");
            const data = await response.json();
            setShipments(data);
        } catch (error) {
            console.error("Error fetching shipments:", error);
        }
    };

    const handleAddShipment = async () => {
        try {
            const response = await fetch("/api/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newShipment),
            });

            if (response.ok) {
                setNewShipment({
                    tracking_code: "",
                    status: "Pending",
                    type: "",
                    shipping_date: "",
                    shipping_cost: "",
                    reference_no: "",
                    origin: "",
                    destination: "",
                    booked_on: ""
                });
                setIsAddModalOpen(false);
                fetchShipments();
            } else {
                console.error("Failed to add shipment");
            }
        } catch (error) {
            console.error("Error adding shipment:", error);
        }
    };

    const handleEditShipment = async () => {
        if (!editingShipment.id) {
            console.error("Error: Missing shipment ID");
            return;
        }

        try {
            const response = await fetch("/api/admin", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingShipment),
            });

            const result = await response.json();

            if (response.ok) {
                setIsEditModalOpen(false);
                fetchShipments();
            } else {
                console.error("Failed to update shipment:", result.error);
            }
        } catch (error) {
            console.error("Error updating shipment:", error);
        }
    };


    const handleDeleteShipment = async (id) => {
        try {
            const response = await fetch(`/api/admin?id=${id}`, { method: "DELETE" });

            if (response.ok) {
                fetchShipments();
            } else {
                console.error("Failed to delete shipment");
            }
        } catch (error) {
            console.error("Error deleting shipment:", error);
        }
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
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                {["Tracking Code", "Reference No", "Origin", "Destination", "Status", "Type", "Shipping Date", "Cost ($)", "Actions"].map((header) => (
                                    <th key={header} className="p-3 text-left border-b">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {shipments.length > 0 ? (
                                shipments.map((shipment, index) => (
                                    <tr key={shipment.id} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                                        <td className="p-3">{shipment.tracking_code}</td>
                                        <td className="p-3">{shipment.reference_no}</td>
                                        <td className="p-3">{shipment.origin}</td>
                                        <td className="p-3">{shipment.destination}</td>
                                        <td className={`p-3 font-semibold ${shipment.status === "Delivered" ? "text-green-600" : shipment.status === "In Transit" ? "text-blue-600" : "text-orange-600"}`}>
                                            {shipment.status}
                                        </td>
                                        <td className="p-3">{shipment.type}</td>
                                        <td className="p-3">{shipment.shipping_date}</td>
                                        <td className="p-3 font-medium">${shipment.shipping_cost}</td>
                                        <td className="p-3 flex space-x-2">
                                            <button
                                                onClick={() => { setEditingShipment(shipment); setIsEditModalOpen(true); }}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-yellow-600 transition">
                                                <FaEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteShipment(shipment.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-700 transition">
                                                <FaTrash /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-5 text-gray-500">No shipments found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Add/Edit Shipment Modal */}
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 z-50">
                        <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg w-[90%] max-w-xs sm:max-w-md md:max-w-lg animate-fadeIn overflow-y-auto max-h-[90vh]">
                            <h2 className="text-lg sm:text-xl font-bold text-center mb-4">
                                {isEditModalOpen ? "Edit Shipment" : "Add Shipment"}
                            </h2>
                            <form>
                                {["tracking_code", "type", "shipping_date", "shipping_cost"].map((field) => (
                                    <div key={field} className="mb-4">
                                        <label className="block capitalize text-sm font-semibold">{field.replace("_", " ")}</label>
                                        <input
                                            type={field === "shipping_date" ? "date" : "text"}
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                            value={isEditModalOpen ? editingShipment[field] : newShipment[field]}
                                            onChange={(e) => {
                                                if (isEditModalOpen) setEditingShipment({ ...editingShipment, [field]: e.target.value });
                                                else setNewShipment({ ...newShipment, [field]: e.target.value });
                                            }}
                                        />
                                    </div>
                                ))}

                                <label className="block mt-3 mb-2 text-sm font-semibold">Status</label>
                                <select
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    value={isEditModalOpen ? editingShipment.status : newShipment.status}
                                    onChange={(e) => {
                                        if (isEditModalOpen) setEditingShipment({ ...editingShipment, status: e.target.value });
                                        else setNewShipment({ ...newShipment, status: e.target.value });
                                    }}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Transit">In Transit</option>
                                    <option value="Delivered">Delivered</option>
                                </select>

                                {["origin", "destination", "reference_no", "booked_on"].map((field) => (
                                    <div key={field} className="mt-3">
                                        <label className="block mb-2 text-sm font-semibold capitalize">{field.replace("_", " ")}</label>
                                        <input
                                            type={field === "booked_on" ? "date" : "text"}
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                            value={isEditModalOpen ? editingShipment[field] : newShipment[field]}
                                            onChange={(e) => {
                                                if (isEditModalOpen) setEditingShipment({ ...editingShipment, [field]: e.target.value });
                                                else setNewShipment({ ...newShipment, [field]: e.target.value });
                                            }}
                                        />
                                    </div>
                                ))}

                                <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAddModalOpen(false);
                                            setIsEditModalOpen(false);
                                        }}
                                        className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition w-full sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={isEditModalOpen ? handleEditShipment : handleAddShipment}
                                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                                    >
                                        {isEditModalOpen ? "Update" : "Add"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Admin;
