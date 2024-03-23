import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock , faSpinner, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Footer from "../Footer";
export default function ActiveAppointments() {
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [showFullLocation, setShowFullLocation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Active');
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue)
    switch (selectedValue) {
      case 'Active':
        setSelectedOption("Active");
        break;
      case 'Previous':
        setSelectedOption("Previous");
        break;
      case 'Rejected':
        setSelectedOption("Rejected");
        break;
      default:
        setSelectedOption("Active");
        break;
    }
  };
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

        // Separate appointments based on status
        const previous = donatedAppointments;
        const active = notDonatedAppointments.filter(appointment => appointment.quantity !== 999);
        const rejected = notDonatedAppointments.filter(appointment => appointment.quantity === 999);
        setActiveAppointments(active || []);
        setPreviousAppointments(previous || []);
        setRejectedAppointments(rejected || []);
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
    <div className='ml-16 mr-16 pt-3'>

<select value={selectedOption} onChange={handleDropdownChange} className="text-lg  p-2 mt-4 bg-gray-200 border rounded">
        <option value="Active">Active Appointments</option>
        <option value="Previous">Previous Appointments</option>
        <option value="Rejected">Rejected Appointments</option>
      </select>
      { selectedOption==="Active" && 
      <>
      <h1 className="text-3xl font-bold mb-10 mt-5  text-center">Active Appointments</h1>
      <div className="md:flex-row flex-col flex flex-wrap md:mx-auto mt-3 justify-start">
        {/* Active Appointments */}
        {activeAppointments.length > 0 ? (
          activeAppointments.map((appointment, index) => (
            <div key={index} className="w-full md:w-full lg:w-full xl:w-full px-4 mb-4">
              <div className="card bg-white shadow-md rounded-lg overflow-hidden border border-yellow-500">
                <div className="card-header bg-gray-200 text-gray-700 font-semibold uppercase p-3 ">
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
                      <strong className="font-semibold">Time:</strong> {appointment.slot.startTime} - {appointment.slot.endTime} IST
                    </div>
                  </div>
                  <div className="flex  flex-3 gap-2 mb-5">
                    <div className="my-auto font-semibold">
                      Status: Active 
                    </div>
                    <div className=" my-auto py-auto">
                    <FontAwesomeIcon icon={faClock } className="text-yellow-500 mx-auto" size="2x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-center text-gray-500 w-full">
            <h1 className="text-xl text-center font-bold">No active appointments found.</h1>
          </div>
        )}
      </div>
      </>
      }
      { selectedOption==="Previous" && 
      <>
      <h1 className="text-3xl font-bold mb-10 mt-5  text-center ">Previous Appointments</h1>
      <div className="md:flex-row flex-col flex flex-wrap md:mx-auto mt-3 justify-start">
        {/* Previous Appointments */}
        {previousAppointments.length > 0 ? (
          previousAppointments.map((appointment, index) => (
            <div key={index} className="w-full md:w-full lg:w-full xl:w-full px-4 mb-4">
              <div className="card bg-white shadow-md rounded-lg overflow-hidden border  border-green-500">
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
                      <strong className="font-semibold">Time:</strong> {appointment.slot.startTime} - {appointment.slot.endTime} IST
                    </div>
                  </div>
                  <div className="flex  flex-3 gap-2 mb-5">
                    <div className="my-auto font-semibold">
                      Status: Donated 
                    </div>
                    <div className=" my-auto py-auto">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" size="2x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-center text-gray-500 w-full">
            <h1 className="text-xl text-center font-bold">No previous appointments found.</h1>
          </div>
        )}
      </div>
      </>}

      { selectedOption==="Rejected" && 
      <>
      <h1 className="text-3xl font-bold mb-10 mt-5  text-center ">Rejected Appointments</h1>
      <div className="md:flex-row flex-col flex flex-wrap md:mx-auto mt-3 justify-start">
        {/* Rejected Appointments */}
        {rejectedAppointments.length > 0 ? (
          rejectedAppointments.map((appointment, index) => (
            <div key={index} className="w-full md:w-full lg:w-full xl:w-full px-4 mb-4">
              <div className="card bg-white shadow-md rounded-lg overflow-hidden bg-red-100 border border-red-500">
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
                      <strong className="font-semibold">Time:</strong> {appointment.slot.startTime} - {appointment.slot.endTime} IST
                    </div>
                    <div className="mb-2">
                      <strong className="font-semibold">Reason for rejection:</strong> Low haemoglobin level 
                    </div>
                  </div>
                  <div className="flex  flex-3 gap-2 mb-5">
                    <div className="my-auto font-semibold">
                      Status: Rejected 
                    </div>
                    <div className=" my-auto py-auto">
                    <FontAwesomeIcon icon={faXmarkCircle } className="text-red-500 mx-auto" size="2x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-center text-gray-500 w-full">
            <h1 className="text-xl text-center font-bold">No rejected appointments found.</h1>
          </div>
        )}
      </div>
      </>}
    </div>
  );
}
