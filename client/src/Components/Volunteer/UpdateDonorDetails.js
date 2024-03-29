import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'; // Import tick and wrong icons

export const UpdateDonorDetails = () => {
  const location = useLocation();
  const [donorDetails, setDonorDetails] = useState(location?.state?.donorDetails || []);
  const [donationUnits, setDonationUnits] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [updatedDonorIndex, setUpdatedDonorIndex] = useState(null);
  const [rejectConfirmation, setRejectConfirmation] = useState(false);

  const handleDonate = (index) => {
    setShowPopup(true);
    setUpdatedDonorIndex(index); // Set the index of the donor being updated
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setUpdatedDonorIndex(null); // Reset the updated donor index
  };

  const handleDonateConfirm = () => {
    if (donationUnits <= 0) {
        alert('Please enter a value greater than 0 for donation units.');
        return;
      }
    
    setShowPopup(false);
    // Update the status to "Donated" for the selected donor
    const updatedDonorDetails = [...donorDetails];
    updatedDonorDetails[updatedDonorIndex].status = 'Donated';
    setDonorDetails(updatedDonorDetails);
    // You may need to perform further actions here, like updating the database
  };

  const handleReject = (index) => {
    setRejectConfirmation(true); // Set the rejection confirmation flag
    setUpdatedDonorIndex(index); // Set the index of the donor being updated
  };

  const handleRejectConfirm = () => {
    // If the user confirms rejection, update the status
    const updatedDonorDetails = [...donorDetails];
    updatedDonorDetails[updatedDonorIndex].status = 'Rejected';
    setDonorDetails(updatedDonorDetails);
    setRejectConfirmation(false); // Close the rejection confirmation popup
    // You may need to perform further actions here, like updating the database
  };

  return (
    <div className='m-10'>
      <h2 className="text-xl font-bold mb-4 text-center">Donors Details</h2>
      <table className="w-full">
        <thead className='bg-gray-100'>
          <tr>
            <th className="border py-2">Name</th>
            <th className="border py-2">Blood Group</th>
            <th className="border py-2">Status</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {donorDetails.map((donor, index) => (
            <tr key={index}>
              <td className="border py-2">{donor.name}</td>
              <td className="border py-2">{donor.bloodGroup}</td>
              <td className="border py-2">
                {donor.status === 'Pending' && (
                  <>
                    <button onClick={() => handleDonate(index)} className="mb-1 mt-1 px-2 py-1 bg-green-500 text-white rounded-md">Donated</button>
                    <button onClick={() => handleReject(index)} className="px-2 py-1 bg-red-500 text-white rounded-md ml-2">Rejected</button>
                  </>
                )}
                {donor.status === 'Donated' && (
                    <div className='flex mx-auto justify-center'>
                        <span>Donated</span>
                        <CheckCircleIcon className="h-6 w-6 text-green-500 " />
                    </div>
                )}
                {donor.status === 'Rejected' && (
                  <div className='flex mx-auto justify-center'>
                  <p>Rejected</p>
                  <XCircleIcon className="h-6 w-6 text-red-500 " />
              </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={handlePopupClose}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-50">
            <span className="absolute top-0 right-0 mr-4 mt-2 cursor-pointer" onClick={handlePopupClose}>&times;</span>
            <label htmlFor="units" className="block mb-2">Enter number of units donated:</label>
            <input type="number" id="units" className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-4" value={donationUnits} onChange={(e) => setDonationUnits(e.target.value)} />
            <div className="mt-4 flex justify-end">
            <button onClick={() => setShowPopup(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2">Cancel</button>
            <button onClick={handleDonateConfirm} className="bg-green-500 text-white px-4 py-2 rounded-md">Confirm</button>
            </div>
          </div>
        </div>
      )}
      {rejectConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg z-50">
            <p>Are you sure you want to reject this donation?</p>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setRejectConfirmation(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2">Cancel</button>
              <button onClick={handleRejectConfirm} className="bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
