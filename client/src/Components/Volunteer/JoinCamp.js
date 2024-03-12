import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const JoinCamp = ({ campDetails }) => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  const [showAlert, setShowAlert] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Check if the volunteer has already joined the camp whenever campDetails changes
    if (userObj && userObj.userType === 'volunteer') {
      const joined = campDetails.volunteers.some(volunteer => volunteer === userObj._id);
      console.log(joined)
      setIsJoined(joined);
    }
  }, [campDetails, userObj]);

  async function joinCamp() {
    if (userObj && userObj.userType === 'volunteer') {
      let volunteerId = userObj._id;
      let campId = campDetails._id;
      try {
        const response = await axios.post('http://localhost:5000/api/volunteer/join-camp', { volunteerId, campId });
        console.log("Join camp response:", response.data); // Log the response
        setIsJoined(true); // Set isJoined to true after successfully joining the camp
        setShowAlert(true); 
      } catch (error) {
        console.error('Error joining camp:', error);
        alert("Failed to join the camp. Please try again later.", "bg-red-500", "text-white");
      }
    }
  }
  
  const alert = (message, bgColor, textColor) => {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.className = `fixed top-0 left-0 right-0 z-50 mx-auto px-4 py-2 mt-4 rounded-md ${bgColor} ${textColor}`;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  };
  
  const renderJoinButton = () => {
    if (userObj && userObj.userType === 'volunteer') {
      if (isJoined) {
        return (
          <div className=" text-red-500 text-center font-bold px-4 py-2 m-4 rounded">
            You've already joined this camp!
          </div>
        );
      } else {
        return (
          <button className="bg-red-500 text-white px-4 py-2 m-4 rounded hover:bg-red-600 mx-auto flex" onClick={joinCamp}>
            Join Camp
          </button>
        );
      }
    }
    return null;
  };
  
  const handleCloseAlert = () => {
    setShowAlert(false); // Close the alert
  };

  return (
    <div>
      {showAlert && (
         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
           <div className="bg-white rounded-lg p-8 max-w-md">
             <p className="text-xl mb-4">You've joined the camp Successfully </p>
             <button onClick={handleCloseAlert} className="mx-auto flex mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
               OK
             </button>
           </div>
         </div>
      )}
      {renderJoinButton()}
    </div>
  );
};
