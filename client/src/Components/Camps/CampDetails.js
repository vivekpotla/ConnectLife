import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { BookAppointment } from '../Donor/BookAppointment';
import MapComponent from '../MapComponent';

export const CampDetails = () => {
  const locationLoc = useLocation();
  const campDetails = locationLoc.state.camps;
  console.log(campDetails)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const userObj = JSON.parse(localStorage.getItem("user"));
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const formattedHours = parseInt(hours) % 12 || 12;
    const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${formattedHours}:${minutes} ${period}`;
  };

  const [marker, setMarker] = useState({ latitude: campDetails.latitude, longitude: campDetails.longitude });

  const renderJoinButton = () => {
    if (userObj && userObj.userType === 'volunteer') {
      return (
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Join Camp</button>
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center m-4">
        <div className="lg:w-1/3 mb-4 lg:mb-0">
          <img src={campDetails.imageURL} alt="Camp" className="w-full rounded-lg" />
        </div>
        <div className="lg:w-2/3 lg:pl-8">
          <div className='flex flex-wrap justify-between mr-10'>
            <h1 className="text-2xl font-bold mb-4">Camp Details</h1>
            {renderJoinButton()}
          </div>
          <p className="mb-5"><span className="font-bold">Location:</span> {campDetails.location}</p>
          <p className="mb-5"><span className="font-bold">Description:</span> {campDetails.description}</p>
          <p className="mb-5"><span className="font-bold">Start Date:</span> {formatDate(campDetails.startDate)}</p>
          <p className="mb-5"><span className="font-bold">End Date:</span> {formatDate(campDetails.endDate)}</p>
          <p className="mb-5"><span className="font-bold">Timings:</span> {formatTime(campDetails.startTime)} to {formatTime(campDetails.endTime)}</p>
        </div>
      </div>
      <div className='mr-10 mb-10 ml-10'>
        <MapComponent
          setMarker={setMarker}
          setLocationAddress={(address) => console.log(address)} // Placeholder for setLocationAddress function
          latitude={campDetails.latitude}
          longitude={campDetails.longitude}
          address={campDetails.location}
        />
      </div>
      {userObj && userObj.userType === 'donor' && <BookAppointment campDetails={campDetails} />}
    </>
  );
}
