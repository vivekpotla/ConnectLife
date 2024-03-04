import React from 'react';
import { useLocation } from 'react-router';

export const CampDetails = () => {
  // Destructure campData from location state
  // console.log(state);
  const locationLoc = useLocation();
  // console.log(locationLoc);
  // const { campData } = [;?

  // Check if campData exists before accessing its properties
  // if (!campData) {
  //   return <div>Error: Camp data not found</div>;
  // }

  // Access camp data properties and render them
  const { location, description, startDate, endDate, startTime, endTime, donorsJoined } = locationLoc.state.camps;

  return (
    <div>
      <h1>Camp Details</h1>
      <p>Location: {location}</p>
      <p>Description: {description}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      <p>Timings: {startTime} AM to {endTime} PM</p>
      <p>Donors Joined: {donorsJoined}</p>
      {/* Add more details as needed */}
    </div>
  );
}
