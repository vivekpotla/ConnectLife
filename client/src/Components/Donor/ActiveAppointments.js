import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';
//import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle,faCheckCircle, faXmark, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
export default function ActiveAppointments() {
  const [donatedAppointments, setDonatedAppointments] = useState([]);
  const [notDonatedAppointments, setNotDonatedAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [appointments,setAppointments]=useState([]);
  useEffect(() => {
    // Define the function to fetch the data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donor/appointments/65daeaaec52903e0cd8bb8b6/"); // Assuming your server API endpoint is '/api/donorAppointments/:donorId'
        console.log(response);
        setDonatedAppointments(response.data.donatedAppointments);
        setNotDonatedAppointments(response.data.notDonatedAppointments);
        setAppointments(donatedAppointments,notDonatedAppointments);
        console.log(appointments)
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch function when the component mounts
    fetchData();

    // Clean-up function to clear any ongoing fetch requests if the component unmounts
    return () => {
      // Any clean-up code here, if necessary
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  // Display loading, error, or data


  return (
    <div className="containerh-screen flex justify-center mt-10">
     <div className="w-1/4">
      <div className="card bg-white shadow-md rounded-lg overflow-hidden">
        <div className="card-header bg-gray-200 text-gray-700 font-semibold uppercase p-3">
          Appointment Details
        </div>
        <div className="card-body flex justify-between p-7">
          <div>
            <div className="mb-2">
              <strong className="font-semibold">Name:</strong> Nss-camp
            </div>
            <div className="mb-2">
              <strong className="font-semibold">Location:</strong> Hyderabad
            </div>
            <div className="mb-2">
              <strong className="font-semibold">Time:</strong> 9:00-10:00
            </div>
          </div>
          <div>
            <div>
              <strong className="font-semibold">Status:</strong> Donated
            </div>
            <div className=" flex justify-center mt-5">
            
            
            
            {appointments.status? <FontAwesomeIcon icon={faCheckCircle} size='2x' className="text-green-500 "/>:<FontAwesomeIcon icon={faCircleXmark} className="text-red-500" size="2x" />}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}
