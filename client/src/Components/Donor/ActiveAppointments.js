import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
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

    <div class="container">
      <div class="row">

         {donatedAppointments.map((appointment, index) => (
          <div className="col-md-6 mx-auto mt-5" key={index}>
            <Card>
              <Card.Header>Appointment Details</Card.Header>
              <Card.Body className="col-md">
                <div>
                  <strong>Name:</strong> {appointment.name}
                </div>
                <div>
                  <strong>Location:</strong> {appointment.location}
                </div>
                <div>
                  <strong>Time:</strong> {appointment.time}
                </div>
                <div>
                  <strong>Status:</strong> Donated
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
        {notDonatedAppointments.map((appointment, index) => (
          <div className="col-md-6 mx-auto mt-5" key={index}>
            <Card>
              <Card.Header>Appointment Details</Card.Header>
              <Card.Body className="col-md">
                <div>
                  <strong>Name:</strong> {appointment.name}
                </div>
                <div>
                  <strong>Location:</strong> {appointment.location}
                </div>
                <div>
                  <strong>Time:</strong> {appointment.time}
                </div>
                <div>
                  <strong>Status:</strong> Not Donated
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}