import React, { useState } from 'react';
import { useLocation } from 'react-router';

export const UpdateDonorDetails = () => {
  const location = useLocation();
  const donorDetails = location && location.state ? location.state.donorDetails : null;
  const [donationUnits, setDonationUnits] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleDonate = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleDonateConfirm = () => {
    // Handle donation confirmation
    setShowPopup(false);
  };

  const handleReject = () => {
    // Handle donor rejection
  };

  if (!donorDetails || donorDetails.length === 0) {
    return <div>No donor details found.</div>;
  }

  return (
    <div className='m-10'>
      <h2 className="text-lg font-bold mb-4">Donor Details</h2>
      <table className=" w-full">
        <thead className='bg-gray-100'>
          <tr>
            <th className="border  py-2">Name</th>
            <th className="border  py-2">Blood Group</th>
            <th className="border  py-2">Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {donorDetails.map((donor, index) => (
            <tr key={index} className="">
              <td className="border  py-2">{donor.name}</td>
              <td className="border  py-2">{donor.bloodGroup}</td>
              <td className="border py-2">
                <button onClick={handleDonate} className="px-2 py-1 bg-green-500 text-white rounded-md">Donated</button>
                <button onClick={handleReject} className="px-2 py-1 bg-red-500 text-white rounded-md ml-2">Rejected</button>
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
            <button onClick={handleDonateConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-md">Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};
