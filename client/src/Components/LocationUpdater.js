import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useSelector } from 'react-redux';
const LocationUpdater = () => {
  let userObj = useSelector(state => state.user.userObj);
  useEffect(() => {
    
    const updateLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                if(userObj)
                {
                    const userType = userObj.userType
                    const userId = userObj._id
                    await axios.post('http://localhost:5000/api/donor/updateLiveLocation', {userType, userId, latitude, longitude });
                }
            } catch (error) {
              console.error('Error updating live location in db', error);
            }
          });
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.error('Error updating location:', error);
      }
    };
    updateLocation();
    const interval = setInterval(updateLocation,5*1000); //milli sec

    // Clean up function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []); 

  return <></>; 
};

export default LocationUpdater;
