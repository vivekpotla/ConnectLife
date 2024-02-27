import React, {useRef} from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import {ConnectlifeIcon} from '../../Icons/ConnectlifeIcon'
import Nss_logo from '../Images/Nss_logo.png'
export const GenerateSlotReciept = () => {
  const location = useLocation();
  const { campDetails, selectedSlot,donorDetails } = location.state; 
  console.log(campDetails)
  const contentRef = useRef(null); // Reference to the content container

   // Function to handle downloading the receipt
   const handleDownloadReceipt = () => {
    const content = contentRef.current; // Get the HTML content
    html2pdf()
      .from(content)
      .save('receipt.pdf'); // Download the PDF with filename "receipt.pdf"
  };
  return (
    <div className="pl-7 pr-7 p-4 border border-gray-300 rounded" ref={contentRef}>
      <h2 className="text-xl font-semibold mb-3 text-center">Booking Receipt</h2>
      {/* Donor Details */}
      <div className="mb-4">
        <h5 className="text-lg font-semibold mb-2">Booked By</h5>
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Name:</td>
              <td className="border border-gray-400 ">{donorDetails.name}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Blood Group:</td>
              <td className="border border-gray-400 ">{donorDetails.bloodGroup}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Phone No.:</td>
              <td className="border border-gray-400 ">{donorDetails.phoneNumber}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Email:</td>
              <td className="border border-gray-400 ">{donorDetails.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Booking Details */}
      <div>
        <h3 className="text-lg font-semibold mb-2 ">Booking Details</h3>
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Name:</td>
              <td className="border border-gray-400 ">{campDetails.name}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-2">Location:</td>
              <td className="border border-gray-400 ">{campDetails.street},{campDetails.city},{campDetails.state},{campDetails.zipcode}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Description:</td>
              <td className="border border-gray-400 ">{campDetails.description}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Start Date:</td>
              <td className="border border-gray-400">{campDetails.startDate}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">End Date:</td>
              <td className="border border-gray-400">{campDetails.endDate}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 bg-yellow-200 p-1">Slot Details:</td>
              <td className="border border-gray-400 bg-yellow-200">{selectedSlot.startTime} - {selectedSlot.endTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Basic instructions for blood donation */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Basic Instructions for Blood Donation</h3>
        <ul className="list-disc pl-4">
          <li>Ensure you are well-hydrated before donation.</li>
          <li>Eat a healthy meal before donation, avoiding fatty foods.</li>
          <li>Bring a photo ID and any required documentation.</li>
          <li>Get a good night's sleep before donation.</li>
          <li>Follow post-donation instructions provided by the staff.</li>
        </ul>
      </div>
      <div className='flex flex-wrap mt-3'> 
      <img className="w-14 h-14 rounded-t-lg mr-3" src={Nss_logo} alt="camps image" />
      <ConnectlifeIcon />
      </div>
      <div className="mt-4">
        <button onClick={handleDownloadReceipt} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Download Receipt
        </button>
      </div>
    </div>
  );
};
