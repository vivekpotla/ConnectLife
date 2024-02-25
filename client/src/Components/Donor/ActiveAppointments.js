import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';

export default function ActiveAppointments() {
  const [donatedAppointments, setDonatedAppointments] = useState([]);
  const [notDonatedAppointments, setNotDonatedAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the function to fetch the data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donor/appointments/65daeaaec52903e0cd8bb8b6/"); // Assuming your server API endpoint is '/api/donorAppointments/:donorId'
        console.log(response);
        setDonatedAppointments(response.data.donatedAppointments);
        setNotDonatedAppointments(response.data.notDonatedAppointments);
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
    <div>
      {error && <div>Error: {error}</div>}
      {/* Render your appointments */}
      <div>
        <h2>Donated Appointments</h2>
        <ul>
          {/* {donatedAppointments.map(appointment => (
            <li key={appointment._id}>{appointment.name} - {appointment.location}</li>
          ))} */}
          <li>Nss-camp</li>
          <li>Hyderabad</li>
          <li>9:00-10:00</li>
        </ul>
      </div>
      <div>
        <h2>Not Donated Appointments</h2>
        <ul>
          {notDonatedAppointments.map(appointment => (
            <li key={appointment._id}>{appointment.name} - {appointment.location}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}