import React from 'react';
import { useLocation } from 'react-router';
import { BookAppointment } from '../Donor/BookAppointment';

export const CampDetails = () => {
  const locationLoc = useLocation();
console.log(locationLoc.state.camps)
  // Access camp data properties
  const { location, description, startDate, endDate, startTime, endTime, donorsJoined, imageURL } = locationLoc.state.camps;
 // Function to format date
 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
};
const userObj = JSON.parse(localStorage.getItem("user"));
console.log(userObj)
// Function to format time
const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const formattedHours = parseInt(hours) % 12 || 12;
  const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
  return `${formattedHours}:${minutes} ${period}`;
};
  return (
    <>
    <div className="flex flex-col lg:flex-row items-center m-4">
      {/* Camp Image */}
      <div className="lg:w-1/3 mb-4 lg:mb-0">
        <img src={imageURL} alt="Camp" className="w-full rounded-lg" />
      </div>
      {/* Camp Details */}
      <div className="lg:w-2/3 lg:pl-8">
        <h1 className="text-2xl font-bold mb-4">Camp Details</h1>
        <p className="mb-5"><span className="font-bold">Location:</span> {location}</p>
        <p className="mb-5"><span className="font-bold">Description:</span> {description}</p>
        <p className="mb-5"><span className="font-bold">Start Date:</span> {formatDate(startDate)}</p>
        <p className="mb-5"><span className="font-bold">End Date:</span> {formatDate(endDate)}</p>
        <p className="mb-5"><span className="font-bold">Timings:</span> {formatTime(startTime)} to {formatTime(endTime)}</p>
        <p className="mb-4"><span className="font-bold">Donors Joined:</span> {donorsJoined}</p>
      </div>
    </div>
     {/* Book Appointment Section */}
     {userObj.userType === 'donor' && <BookAppointment />}
    </>
  );
}
