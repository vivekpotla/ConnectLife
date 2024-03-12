import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
export default function ActiveAppointments() {
  const [appointments] = useState([
    { name: "Active Appointment 1", location: "Hyderabad", date: "2024-03-15", time: "9:00-10:00", status: "not donated" },
    { name: "Previous 1", location: "Bangalore", date: "2024-03-10", unitsDonated: 2, status: "donated" },
    { name: "Active Appointment 1", location: "Hyderabad", date: "2024-03-15", time: "9:00-10:00", status: "not donated" },
    { name: "Previous 1", location: "Bangalore", date: "2024-03-10", unitsDonated: 2, status: "donated" },
    { name: "Active Appointment 1", location: "Hyderabad", date: "2024-03-15", time: "9:00-10:00", status: "not donated" },
    { name: "Previous 1", location: "Bangalore", date: "2024-03-10", unitsDonated: 2, status: "donated" },
    { name: "Active Appointment 1", location: "Hyderabad", date: "2024-03-15", time: "9:00-10:00", status: "not donated" },
    { name: "Previous 1", location: "Bangalore", date: "2024-03-10", unitsDonated: 2, status: "donated" },
    { name: "Active Appointment 1", location: "Hyderabad", date: "2024-03-15", time: "9:00-10:00", status: "not donated" },
    { name: "Previous 1", location: "Bangalore", date: "2024-03-10", unitsDonated: 2, status: "donated" },
    // Add more appointments here
  ]);
  const [activeAppointments,setActiveAppointments]=useState([]);
  const [previousAppointments,setPreviousAppointments]=useState([]);
  const [error,setError]=useState([]);
  useEffect(() => {
    const fetchDonorAppointments = async () => {
      try {
  
        const user = JSON.parse(localStorage.getItem("user"));
        const donorId = user._id;

        
        const response = await axios.get(`http://localhost:5000/api/donor/appointments/${donorId}`);
        console.log("Appointmerns", response.data)
        
        const { activeAppointments, previousAppointments } = response.data;

        if (activeAppointments !== undefined) {
          setActiveAppointments(activeAppointments);
        }
        if (previousAppointments !== undefined) {
          setPreviousAppointments(previousAppointments);
        }
        
      } catch (error) {
        
        console.error('Error fetching donor appointments:', error);
        setError('Error fetching donor appointments');
      }
    };

    fetchDonorAppointments();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-10 mt-4 text-center">Active Appointments</h1>
      <div className="md:flex-row flex-col flex flex-wrap md:mx-auto mt-3 justify-start">
      {activeAppointments.length > 0 ? (
  activeAppointments.map((appointment, index) => (
    appointment.status === "not donated" && (
      <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 px-4 mb-4">
        <div className="card bg-white shadow-md rounded-lg overflow-hidden">
          <div className="card-header bg-gray-200 text-gray-700 font-semibold uppercase p-3">
            Appointment Details
          </div>
          <div className="card-body flex justify-between p-5">
            <div>
              <div className="mb-2">
                <strong className="font-semibold">Name:</strong> {appointment.name}
              </div>
              <div className="mb-2">
                <strong className="font-semibold">Location:</strong> {appointment.location}
              </div>
              <div className="mb-2">
                <strong className="font-semibold">Date:</strong> {appointment.date}
              </div>
              <div className="mb-2">
                <strong className="font-semibold">Time:</strong> {appointment.time}
              </div>
            </div>
            <div>
              <div>
                <strong className="font-semibold">Status:</strong> Active
              </div>
              <div className=" flex justify-center mt-5">
                <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" size="2x" />
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
        { previousAppointments.length>0?  previousAppointments.map((appointment, index) => (
          appointment.status === "donated" && (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 px-4 mb-4">
              <div className="card bg-white shadow-md rounded-lg overflow-hidden">
                <div className="card-header bg-gray-200 text-gray-700 font-semibold uppercase p-3">
                Appointment Details
                </div>
                <div className="card-body flex justify-between p-5">
                  <div>
                    <div className="card-body">
                      <div key={index}>
                        <div className="card-body">
                        <div>
                    <div className="mb-2">
                      <strong className="font-semibold">Name:</strong> {appointment.name}
                    </div>
                    <div className="mb-2">
                      <strong className="font-semibold">Location:</strong> {appointment.location}
                    </div>
                    <div className="mb-2">
                      <strong className="font-semibold">Date:</strong> {appointment.date}
                    </div>
                    <div className="mb-2">
                      <strong className="font-semibold">Units Donated:</strong> {appointment.unitsDonated}
                    </div>
                  </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <strong className="font-semibold">Status:</strong> Donated
                    </div>
                    <div className=" flex justify-center mt-5">
                      <FontAwesomeIcon icon={faCheckCircle} size='2x' className="text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )):
        <div className="flex justify-center items-center text-center text-gray-500 w-full">
    <h1 className="text-xl text-center font-bold">No Previous appointments found.</h1>
  </div>
        }
      </div>
    </>
  );
}
