import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { BookAppointment } from '../Donor/BookAppointment';
import MapComponent from '../MapComponent'
import axios from 'axios';
export const CampDetails = () => {
  const locationLoc = useLocation();
  const campDetails = locationLoc.state.camps;
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
  async function joinCamp() {
    if (userObj && userObj.userType === 'volunteer') {
      let volunteerId= userObj._id;
      let campId= campDetails._id;
     // /join-camp
     let response=  await axios.post('http://localhost:5000/api/volunteer/join-camp', {volunteerId, campId});
     console.log(response)
    }
  }
  const renderJoinButton = () => {
    if (userObj && userObj.userType === 'volunteer') {
      return (
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={()=>{joinCamp()}}>Join Camp</button>
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
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Camp Details</h1>
            {renderJoinButton()}
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
      {userObj && userObj.userType === 'donor' && <BookAppointment campDetails={campDetails} />}
      <div className='mb-8'>
        {/* Create a button which redirects to google maps to get directions to that location */}
        <p className='text-center text-gray-700'>Navigate in maps : {campDetails.geolocation.coordinates[0]},{campDetails.geolocation.coordinates[1]} </p>
        {/* window.open("https://maps.google.com?q="+your_lat+","+your_lng ); */}
        <MapComponent
          setMarker={setMarker}
          setLocationAddress={(address) => (address)} // Placeholder for setLocationAddress function
          latitude={campDetails.latitude}
          longitude={campDetails.longitude}
          address={campDetails.location}
        />
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Contact Us</h3>
            <p className="text-gray-700 mb-1">Email: nssteamvnrvjiet@gmail.com</p>
            <p className="text-gray-700 mb-1">Phone: 9963168687</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Quick Links</h3>
            <ul className="text-gray-700">
              <li className="mb-1 hover:text-blue-800"><a href="https://nss.gov.in/">About Us</a></li>
              <li className="mb-1 hover:text-blue-800"><a href="/camps">Donate</a></li>
             
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Follow Us</h3>
            <div className="flex items-center justify-center">
              <a href="https://www.facebook.com/nssvnrvjiet"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" alt="Facebook" className="w-6 h-6 mr-2 transition-transform transform hover:scale-110" /></a>
              <a href="https://twitter.com/nss_vnrvjiet"><img src="https://e7.pngegg.com/pngimages/708/311/png-clipart-twitter-twitter-thumbnail.png" alt="Twitter" className="w-6 h-6 mr-2 transition-transform transform hover:scale-110" /></a>
              <a href="https://www.instagram.com/nss_vnrvjiet/"><img src="https://image.similarpng.com/very-thumbnail/2020/05/Vector-Instagram-icon-PNG.png" alt="Instagram" className="w-6 h-6 mr-2 transition-transform transform hover:scale-110" /></a>
            </div>
          </div>
        </div>
        <p className="text-gray-700 mt-4">© 2024 Camp Details. All rights reserved.</p>
      </footer>
    </>
  );
}

export default CampDetails;
