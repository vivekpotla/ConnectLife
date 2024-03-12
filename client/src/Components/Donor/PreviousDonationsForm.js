import React, { useState } from 'react';

export const PreviousDonationsForm = ({ isOpen, onClose, onConfirm }) => {
  const [lastDonationDate, setLastDonationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would perform validation on the last donation date
    // For the sake of this example, let's assume last donation date is within 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    if (new Date(lastDonationDate) > sixMonthsAgo) {
      // User is not eligible for booking
      alert('You are not eligible for booking this slot. Your last donation was within the last 6 months.');
    } else if(lastDonationDate!=='') {
      // User is eligible, proceed with booking
      onConfirm();
      // Here, you can close the modal if needed
      onClose();
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="bg-white w-96 p-6 rounded-lg z-10">
        <h2 className="text-lg font-semibold mb-4">Book Slot</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="lastDonationDate" className="block text-sm font-medium text-gray-700">Last Donation Date</label>
            <input type="date" id="lastDonationDate" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" value={lastDonationDate} onChange={(e) => setLastDonationDate(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 text-sm rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:border-green-500 focus:ring-green-500" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm rounded-md border border-transparent bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring-green-500">Book Slot</button>
          </div>
        </form>
      </div>
    </div>
  );
};

