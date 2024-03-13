import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { BookAppointment } from '../Donor/BookAppointment';
import MapComponent from '../MapComponent'
import { JoinCamp } from '../Volunteer/JoinCamp';

export const CampDetails = () => {
  const locationLoc = useLocation();
  const [campDetails, setCampDetails] = useState(locationLoc.state.camps);

  useEffect(() => {
    // Update campDetails whenever locationLoc.state.camps changes
    setCampDetails(locationLoc.state.camps);
  }, [locationLoc.state.camps]);

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
  function navigateToLocation(longitude, latitude) {
    // Construct the Google Maps URL with the coordinates
    var url = "https://www.google.com/maps/dir/?api=1&destination=" + latitude + "," + longitude;

    // Open the URL in a new tab
    window.open(url, '_blank');
}

  const [marker, setMarker] = useState({ latitude: campDetails.latitude, longitude: campDetails.longitude });

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center m-4">
        <div className="lg:w-1/3 mb-4 lg:mb-0">
          <img src={campDetails.imageURL} alt="Camp" className="w-full rounded-lg" />
        </div>
        <div className="lg:w-2/3 lg:pl-8">
          <div className='flex flex-wrap justify-between mr-10'>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Camp Details</h1>
          </div>
          <p className="mb-5 text-gray-700"><span className="font-bold">Location:</span> {campDetails.location}</p>
          <p className="mb-5 text-gray-700"><span className="font-bold">Description:</span> {campDetails.description}</p>
          <p className="mb-5 text-gray-700"><span className="font-bold">Start Date:</span> {formatDate(campDetails.startDate)}</p>
          <p className="mb-5 text-gray-700"><span className="font-bold">End Date:</span> {formatDate(campDetails.endDate)}</p>
          <p className="mb-5 text-gray-700"><span className="font-bold">Timings:</span> {formatTime(campDetails.startTime)} to {formatTime(campDetails.endTime)}</p>
          <div>
            {/* NGO Information to be improvised +++++++++++++++++++++++++++++++++++ */}
            <div className="text-gray-700">Organized by {campDetails.ngo.name}</div>
            <img src={campDetails.ngo.imageURL} className='object-cover h-20 w-20'/>
            <div className="text-gray-700">Email: {campDetails.ngo.email}</div>
            <div className="text-gray-700">NGO cell: +91 {campDetails.ngo.phoneNumber}</div>
            {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
          </div>
        </div>
      </div>
      {userObj && userObj.userType === 'volunteer' && <JoinCamp campDetails={campDetails} />}
      {userObj && userObj.userType === 'donor' && <BookAppointment campDetails={campDetails} />}      
       
      <div className=''>
        <MapComponent
          setMarker={setMarker}
          setLocationAddress={(address) => (address)} // Placeholder for setLocationAddress function
          latitude={campDetails.latitude}
          longitude={campDetails.longitude}
          address={campDetails.location}
        />
      </div>
      <div className='flex justify-center'>
       <button className='mb-8  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded btn text-center' onClick={()=>navigateToLocation(campDetails.geolocation.coordinates[0],campDetails.geolocation.coordinates[1])}>Navigate in maps</button>
       </div>

     
    </>
  );
}

export default CampDetails;
