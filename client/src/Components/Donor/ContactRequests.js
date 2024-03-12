import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
export default function ContactRequests() {
  const [requests, setRequests] = useState([]);
  const userObj = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const getRecipientRequests = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/donor/view-recipient-requests', { donorId: userObj._id });
        const requestDetails=response.data;
        if(requestDetails!==undefined)
          setRequests(requestDetails);
        console.log("req details" ,requestDetails)
      } catch (error) {
        console.log(error);
      }
    };
    getRecipientRequests();
  }, [userObj._id]); 
  

 
 
  function canDonate(recipientBloodGroup) {
    const donorBloodGroup = userObj.bloodGroup;
    // Check compatibility rules
    if (donorBloodGroup === 'O-') {
      return true; // O- donors can donate to any blood type
    } else if (donorBloodGroup === 'O+') {
      return recipientBloodGroup !== 'AB-'; // O+ donors can donate to any except AB-
    } else if (donorBloodGroup === 'A-') {
      return recipientBloodGroup !== 'AB+' && recipientBloodGroup !== 'AB-'; // A- donors can donate to A-, A+, AB-, and AB+
    } else if (donorBloodGroup === 'A+') {
      return recipientBloodGroup !== 'AB-'; // A+ donors can donate to A+, AB+
    } else if (donorBloodGroup === 'B-') {
      return recipientBloodGroup !== 'AB+' && recipientBloodGroup !== 'AB-'; // B- donors can donate to B-, B+, AB-, and AB+
    } else if (donorBloodGroup === 'B+') {
      return recipientBloodGroup !== 'AB-'; // B+ donors can donate to B+, AB+
    } else if (donorBloodGroup === 'AB-') {
      return recipientBloodGroup === 'AB-'; // AB- donors can donate to AB-
    } else if (donorBloodGroup === 'AB+') {
      return true; // AB+ donors can donate to any blood type
    } else {
      return false; // Return false for incompatible blood types
    }
  }


  const handleApprove = (id, recipientName) => {
    setRequests(requests.filter(request => request.id !== id));
    displayAlert(`Approved request from ${recipientName}`, 'success');
  };

  const handleReject = (id, recipientName) => {
    setRequests(requests.filter(request => request.id !== id));
    displayAlert(`Rejected request from ${recipientName}`, 'error');
  };

  const displayAlert = (message, type) => {
    const alertContainer = document.getElementById("alertContainer");
    const alert = document.createElement("div");
    alert.className = `fixed top-4 right-4 z-50`;
    if (type === 'success') {
      alert.innerHTML = `
        <div id="alert-border-3" class="flex items-center p-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
          <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <div class="ms-3 text-sm font-medium">${message}</div>
          <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-3" aria-label="Close">
            <span class="sr-only">Dismiss</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      `;
    } else if (type === 'error') {
      alert.innerHTML = `
        <div id="alert-border-3" class="flex items-center p-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
          <div class="ms-3 text-sm font-medium">${message}</div>
          <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-3" aria-label="Close">
            <span class="sr-only">Dismiss</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      `;
    }
    alertContainer.appendChild(alert);
    let dismissClicked = false;
    // Dismiss the alert when clicking on the dismiss button
    alert.querySelector('[data-dismiss-target="#alert-border-3"]').addEventListener('click', () => {
      alert.remove();
      dismissClicked = true;
    });
    setTimeout(() => {
      if (!dismissClicked) {
        alert.remove();
      }
    }, 3000);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <h1 className="text-xl font-bold m-4 text-center">Contact Requests</h1>
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-400 border border-collapse border-gray-400">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-900 uppercase  w-[25%]">Recipient Name</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-900 uppercase  w-[25%]">Blood Group</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-900 uppercase  w-[25%]">Can Donate?</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-900 uppercase w-[25%]">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-400">
              {requests.length!=0 && requests.map((request, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap  w-[25%] text-center">{request.recipient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap w-[25%] text-center">{request.recipient.bloodGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap w-[25%] text-center">{canDonate(request.bloodGroup) ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex text-center justify-center">
                    <button onClick={() => handleApprove(request.id, request.recipient.name)} className="text-green-500 hover:text-green-700 focus:outline-none" title="Approve">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-2xl"/>
                    </button>
                    <button onClick={() => handleReject(request.id, request.recipient.name)} className="text-red-500 hover:text-red-700 focus:outline-none ml-2" title="Reject">
                      <FontAwesomeIcon icon={faTimesCircle} className="text-2xl"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div id="alertContainer" className="fixed top-4 right-4 z-50">
        {/* Alerts will be appended here */}
      </div>
    </div>
  );
}
