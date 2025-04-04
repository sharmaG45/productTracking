"use client";

import React, { useState, useEffect } from 'react';
import { fireStore } from "@/app/_component/firebase/config";
import { doc, getDocs, collection, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

const AdminPanel = () => {
    const [shipments, setShipments] = useState([]);
    const generateReferenceID = () => {
        const prefix = "UPM";
        const randomDigits = Math.floor(100000000000 + Math.random() * 900000000000); // 12-digit number
        return `${prefix}${randomDigits}`;
    };
    const [newShipment, setNewShipment] = useState({
        reference_no: generateReferenceID(),
        origin: '',
        destination: '',
        booked_on: '',
        shipping_date: '',
        status: []  // Status will now store an array of status objects
    });
    const [editingShipment, setEditingShipment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        fetchShipments();
    }, []);

    const fetchShipments = async () => {
        try {
            const querySnapshot = await getDocs(collection(fireStore, 'shipments'));
            const shipmentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setShipments(shipmentList);
        } catch (error) {
            console.error("Error fetching shipments: ", error);
        }
    };

    const handleAddShipment = async () => {
        try {
            // Add shipment to Firestore
            await addDoc(collection(fireStore, 'shipments'), newShipment);
            fetchShipments();  // Refresh shipment list
            setNewShipment({
                reference_no: '',
                origin: '',
                destination: '',
                booked_on: '',
                shipping_date: '',
                status: []  // Reset status field
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding shipment: ", error);
        }
    };

    const handleEditShipment = async () => {
        try {
            const shipmentRef = doc(fireStore, 'shipments', editingShipment.id);
            await updateDoc(shipmentRef, editingShipment);  // Update the shipment
            fetchShipments();  // Refresh shipment list
            setEditingShipment(null);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error editing shipment: ", error);
        }
    };

    const handleDeleteShipment = async (id) => {
        try {
            await deleteDoc(doc(fireStore, 'shipments', id));
            fetchShipments();  // Refresh shipment list
        } catch (error) {
            console.error("Error deleting shipment: ", error);
        }
    };

    const handleAddNewStatus = () => {
        if (editingShipment) {
            setEditingShipment({
                ...editingShipment,
                status: [...(editingShipment.status || []), { stage: "", location: "", timestamp: "", completed: false }]
            });
        } else {
            setNewShipment({
                ...newShipment,
                status: [...(newShipment.status || []), { stage: "", location: "", timestamp: "", completed: false }]
            });
        }
    };

    const handleRemoveStatus = (index) => {
        if (editingShipment) {
            let updatedStatus = [...editingShipment.status];
            updatedStatus.splice(index, 1);
            setEditingShipment({ ...editingShipment, status: updatedStatus });
        } else {
            let updatedStatus = [...newShipment.status];
            updatedStatus.splice(index, 1);
            setNewShipment({ ...newShipment, status: updatedStatus });
        }
    };

    // useEffect(() => {
    //     if (isModalOpen) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "auto";
    //     }
    // }, [isModalOpen]);
    




    return (

        <>

            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-full sm:w-1/7 bg-gray-800 text-white p-4 sm:block hidden">
                    <h2 className="text-lg font-semibold mb-4 text-white">Admin Panel</h2>
                    <ul className="space-y-4">
                        <li><button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded w-full transition">Add Shipment</button></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 overflow-auto">
                    {/* Topbar */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Shipment Management</h1>
                        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded sm:hidden">Add Shipment</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md text-sm sm:text-base">
                            <thead>
                                <tr className="bg-blue-600 text-white text-left">
                                    <th className="p-3">Tracking Code</th>
                                    <th className="p-3">Origin</th>
                                    <th className="p-3">Destination</th>
                                    <th className="p-3">Booked On</th>
                                    <th className="p-3">Shipping Date</th>
                                    <th className="p-3">Status</th> {/* Display the status */}
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shipments.map((shipment, idx) => (
                                    <tr key={shipment.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition`}>
                                        <td className="p-3 font-semibold text-gray-700">{shipment.reference_no}</td>
                                        <td className="p-3 text-gray-600">{shipment.origin}</td>
                                        <td className="p-3 text-gray-600">{shipment.destination}</td>
                                        <td className="p-3 text-gray-600">{shipment.booked_on}</td>
                                        <td className="p-3 text-gray-600">{shipment.shipping_date}</td>
                                        <td className="p-3 text-gray-600">
                                            {/* Display status as an array of stages */}
                                            {shipment.status.map((status, index) => (
                                                <div key={index} className={`p-2 rounded text-xs sm:text-sm ${status.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    <strong>{status.stage}</strong> — {status.location}
                                                    <div className="text-[11px] text-gray-500">({status.timestamp})</div>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="p-3">
                                            <button onClick={() => { setEditingShipment(shipment); setIsModalOpen(true); }} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">Edit</button>
                                            <button onClick={() => handleDeleteShipment(shipment.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal for Add/Edit Shipment */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-auto">
                            <h2 className="text-lg font-bold mb-4">{editingShipment ? 'Edit Shipment' : 'Add Shipment'}</h2>

                            {/* Basic Shipment Fields */}
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Reference No</label>
                                <input
                                    type="text"
                                    placeholder="Reference No"
                                    value={editingShipment ? editingShipment.reference_no : newShipment.reference_no || 'Generating...'}
                                    readOnly
                                    className="border p-2 w-full mb-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Origin</label>
                                <input
                                    type="text"
                                    placeholder="Origin"
                                    value={editingShipment ? editingShipment.origin : newShipment.origin}
                                    onChange={(e) => editingShipment ? setEditingShipment({ ...editingShipment, origin: e.target.value }) : setNewShipment({ ...newShipment, origin: e.target.value })}
                                    className="border p-2 w-full mb-2"
                                />
                            </div>


                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Destination</label>
                                <input
                                    type="text"
                                    placeholder="Destination"
                                    value={editingShipment ? editingShipment.destination : newShipment.destination}
                                    onChange={(e) => editingShipment ? setEditingShipment({ ...editingShipment, destination: e.target.value }) : setNewShipment({ ...newShipment, destination: e.target.value })}
                                    className="border p-2 w-full mb-2"
                                />
                            </div>


                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Booked On</label>
                                <input
                                    type="date"
                                    placeholder="Booked On"
                                    value={editingShipment ? editingShipment.booked_on : newShipment.booked_on}
                                    onChange={(e) => editingShipment ? setEditingShipment({ ...editingShipment, booked_on: e.target.value }) : setNewShipment({ ...newShipment, booked_on: e.target.value })}
                                    className="border p-2 w-full mb-2"
                                />

                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Shipping Date</label>
                                <input
                                    type="date"
                                    placeholder="Shipping Date"
                                    value={editingShipment ? editingShipment.shipping_date : newShipment.shipping_date}
                                    onChange={(e) => editingShipment ? setEditingShipment({ ...editingShipment, shipping_date: e.target.value }) : setNewShipment({ ...newShipment, shipping_date: e.target.value })}
                                    className="border p-2 w-full mb-2"
                                />
                            </div>


                            {/* Add/Edit Shipment Status */}
                            <h3 className="text-lg font-semibold mt-4 mb-2">Add/Edit Shipment Status</h3>
                            <div className="space-y-4">
                                {(editingShipment ? editingShipment.status : newShipment.status || []).map((status, index) => (
                                    <div key={index} className="relative border p-4 mb-4">
                                        <button
                                            onClick={() => handleRemoveStatus(index)}
                                            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Remove
                                        </button>

                                        <div className="mb-2">

                                            <input
                                                type="text"
                                                placeholder="Stage"
                                                value={status.stage}
                                                onChange={(e) => {
                                                    let updatedStatus = [...(editingShipment ? editingShipment.status : newShipment.status)];
                                                    updatedStatus[index].stage = e.target.value;
                                                    editingShipment ? setEditingShipment({ ...editingShipment, status: updatedStatus }) : setNewShipment({ ...newShipment, status: updatedStatus });
                                                }}
                                                className="border p-3 w-full md:w-[90%] mx-auto mb-4 text-sm"
                                            />
                                        </div>




                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                placeholder="Location"
                                                value={status.location}
                                                onChange={(e) => {
                                                    let updatedStatus = [...(editingShipment ? editingShipment.status : newShipment.status)];
                                                    updatedStatus[index].location = e.target.value;
                                                    editingShipment ? setEditingShipment({ ...editingShipment, status: updatedStatus }) : setNewShipment({ ...newShipment, status: updatedStatus });
                                                }}
                                                className="border p-3 w-full md:w-[90%] mx-auto mb-4 text-sm"
                                            />
                                        </div>


                                        <div className="mb-2">
                                            <input
                                                type="datetime-local"
                                                placeholder="Timestamp"
                                                value={status.timestamp}
                                                onChange={(e) => {
                                                    let updatedStatus = [...(editingShipment ? editingShipment.status : newShipment.status)];
                                                    updatedStatus[index].timestamp = e.target.value;
                                                    editingShipment ? setEditingShipment({ ...editingShipment, status: updatedStatus }) : setNewShipment({ ...newShipment, status: updatedStatus });
                                                }}
                                                className="border p-3 w-full md:w-[90%] mx-auto mb-4 text-sm"
                                            />
                                        </div>

                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={status.completed}
                                                className='mr-2'
                                                onChange={(e) => {
                                                    let updatedStatus = [...(editingShipment ? editingShipment.status : newShipment.status)];
                                                    updatedStatus[index].completed = e.target.checked;
                                                    editingShipment ? setEditingShipment({ ...editingShipment, status: updatedStatus }) : setNewShipment({ ...newShipment, status: updatedStatus });
                                                }}
                                            />
                                            Completed
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Add New Status Button */}
                            <button
                                onClick={handleAddNewStatus}
                                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
                            >
                                Add Status
                            </button>

                            {/* Modal Action Buttons */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                                <button
                                    onClick={editingShipment ? handleEditShipment : handleAddShipment}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    {editingShipment ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminPanel;
