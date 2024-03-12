import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock , faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function ActiveAppointments() {
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [showFullLocation, setShowFullLocation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  const toggleLocation = () => {
    setShowFullLocation(!showFullLocation);
  };

  useEffect(() => {
    const fetchDonorAppointments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const donorId = user._id;
        const response = await axios.get(`http://localhost:5000/api/donor/appointments/${donorId}`);
        const { notDonatedAppointments, donatedAppointments } = response.data;
        
        setActiveAppointments(notDonatedAppointments || []);
        setPreviousAppointments(donatedAppointments || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donor appointments:', error);
        setError('Error fetching donor appointments');
      }
    };

    fetchDonorAppointments();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" /> {/* Display spinner icon */}
      </div>
    );
  }

  return (
    <div className='ml-16 mr-16'>
      <h1 className="text-2xl font-bold mb-10 mt-4 text-center">Active Appointments</h1>
      <div className="md:flex-row flex-col flex flex-wrap md:mx-auto mt-3 justify-start">
        {activeAppointments.length > 0 ? (
          activeAppointments.map((appointment, index) => (
            appointment.donated === false && (
              <div key={index} className="w-full md:w-full lg:w-full xl:w-full px-4 mb-4">
                <div className="card bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="card-header bg-gray-200 text-gray-700 font-semibold uppercase p-3">
                    Appointment Details
                  </div>
                  <div className="flex card-body flex justify-between p-5">
                    <div className="flex-1">
                      <div className="mb-2">
                        <strong className="font-semibold">Name:</strong> {appointment.camp.name}
                      </div>
                      <div className="mb-2">
                        <strong className="font-semibold">Location:</strong> {appointment.camp.location}
                      </div>
                      <div className="mb-2">
                        <strong className="font-semibold">Date:</strong> {formatDate(appointment.date)}
                      </div>
                      <div className="mb-2">
                        <strong className="font-semibold">Time:</strong> {appointment.slot.startTime} - {appointment.slot.endTime}
                      </div>
                    </div>
                    <div className="ml-6 flex-3">
                      <div>
                        <strong className="font-semibold">Status:</strong><br></br> Not Donated
                      </div>
                      <div className="mt-2 ">
                        <FontAwesomeIcon icon={faClock } className="text-yellow-500 mx-auto" size="2x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))
        ) : (
          <div className="flex justify-center items-center text-center text-gray-500 w-full">
            <h1 className="text-xl text-center font-bold">No active appointments found.</h1>
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold m-10 text-center">Previous Appointments</h1>
      <div className="md:flex-row flex-col flex flex-wrap md:mx-auto mt-3 justify-start">
        {previousAppointments.length > 0 ? (
          previousAppointments.map((appointment, index) => (
            appointment.donated === true && (
              <div key={index} className="w-full md:w-full lg:w-full xl:w-full px-4 mb-4">
                <div className="card bg-white shadow-md rounded-lg overflow-hidden bg-green-100 border border-green-500">
                  <div className="card-header bg-gray-200 text-gray-700 font-semibold uppercase p-3">
                    Appointment Details
                  </div>
                  <div className="card-body flex justify-between p-5">
                    <div>
                      <div className="mb-2">
                        <strong className="font-semibold">Name:</strong> {appointment.camp.name}
                      </div>
                      <div className="mb-2">
                        <strong className="font-semibold">Location:</strong> {appointment.camp.location}
                      </div>
                      <div className="mb-2">
                        <strong className="font-semibold">Date:</strong> {formatDate(appointment.date)}
                      </div>
                      <div className="mb-2">
                        <strong className="font-semibold">Units Donated:</strong> {appointment.quantity}
                      </div>
                    </div>
                    <div className="ml-6">
                      <div>
                        <strong className="font-semibold">Status:</strong> Active
                      </div>
                      <div className="mt-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" size="2x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))
        ) : (
          <div className="flex justify-center items-center text-center text-gray-500 w-full">
            <h1 className="text-xl text-center font-bold">No Previous appointments found.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
