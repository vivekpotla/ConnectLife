import React, { useRef } from 'react';
import { useLocation } from 'react-router';
import html3pdf from 'html3pdf';
import { ConnectlifeIcon } from '../../Icons/ConnectlifeIcon'
import Nss_logo from '../Images/Nss_logo.png'

export const GenerateSlotReciept = () => {
  const location = useLocation();
  const { campDetails, selectedSlot, donorDetails } = location.state || {};
  let startD = new Date(campDetails?.startDate)
  startD =startD.toDateString()
  let endD = new Date(campDetails?.endDate)
  endD =endD.toDateString()
  console.log(campDetails)
  const contentRef = useRef(null); // Reference to the content container

  // Function to handle downloading the receipt
  const handleDownloadReceipt = () => {
    const content = contentRef.current; // Get the HTML content
    html3pdf()
      .from(content)
      .save('receipt.pdf'); // Download the PDF with filename "receipt.pdf"
  };
  const handlePrintPage = () => {
    window.print(); // Print the current page
  };
  return (
    <div className="pl-7 pr-7 p-4 border border-gray-300 rounded" ref={contentRef}>
      <div className='flex flex-wrap justify-center mt-3 mb-5'>
        <img className="w-14 h-14 rounded-t-lg mr-3" src={Nss_logo} alt="campsImage" />
        <ConnectlifeIcon />
      </div>
      <h2 className="text-2xl font-semibold mb-3 text-center">Booking Receipt</h2>
      {/* Donor Details */}
      <div className="mb-4">
        <h5 className="text-lg font-semibold mb-2">Donor Details :</h5>
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Name</td>
              <td className="border border-gray-400 p-2">{donorDetails?.name}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Blood Group</td>
              <td className="border border-gray-400 p-2">{donorDetails?.bloodGroup}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Phone No.</td>
              <td className="border border-gray-400 p-2">{donorDetails?.phoneNumber}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Email</td>
              <td className="border border-gray-400 p-2">{donorDetails?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Booking Details */}
      <div>
        <h3 className="text-lg font-semibold mb-2 ">Venue and Slot Info :</h3>
        <table className="w-full border-collapse border border-gray-400">
          <tbody>
            <tr>
              <td className="font-semibold border border-gray-400 p-2">Name</td>
              <td className="border border-gray-400 ps-2">{campDetails?.name}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-2">Location</td>
              <td className="border border-gray-400 ps-2">{campDetails?.location}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Description</td>
              <td className="border border-gray-400 ps-2">{campDetails?.description}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">Start Date</td>
              <td className="border border-gray-400 ps-2">{startD}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 p-1">End Date</td>
              <td className="border border-gray-400 ps-2">{endD}</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-400 bg-yellow-200 p-1">Slot Details</td>
              <td className="border border-gray-400 bg-yellow-200 ps-2">{selectedSlot?.startTime} - {selectedSlot?.endTime} IST</td>
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
      
      <div className="mt-4 text-center mb-5 ">
        <button onClick={handleDownloadReceipt} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Download Receipt
        </button>

        <button onClick={handlePrintPage} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ms-3">
          Print
        </button>
      </div>
    </div>
  );
};
