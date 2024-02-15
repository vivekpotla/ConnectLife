import React, { useState } from 'react'

export const RegisterCamp = ({addData}) => {
    const [campName, setCampName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [donorsPerHour, setDonorsPerHour] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g., submit the data to a server
        const formData = {
            campName,
            description,
            location,
            startDate,
            startTime,
            endDate,
            endTime,
            donorsPerHour
        };
        console.log(formData);
        addData(formData);
        // Reset form fields after submission
        setCampName('');
        setDescription('');
        setLocation('');
        setStartDate('');
        setStartTime('');
        setEndDate('');
        setEndTime('');
        setDonorsPerHour('');
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 p-4 bg-gray-100 rounded-lg shadow-lg">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Camp Name:</label>
                <input
                    type="text"
                    value={campName}
                    onChange={(e) => setCampName(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Location :</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className='mb-4 cursor-pointer'>
                select from map
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    required
                />
                <label className="block text-gray-700 font-bold mb-2 mt-2">Start Time:</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    required
                />
                <label className="block text-gray-700 font-bold mb-2 mt-2">End Time:</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">No. of Donors per Hour Slot:</label>
                <input
                    type="number"
                    value={donorsPerHour}
                    onChange={(e) => setDonorsPerHour(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className='flex justify-end'>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register Camp
                </button>
            </div>
        </form>
    )
}
