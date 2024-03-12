import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock , faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ViewRequests = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const recipientId = JSON.parse(localStorage.getItem('user'))._id;
        const response = await axios.post('http://localhost:5000/api/recipient/view-requests', {
          recipientId
        });
        const responseData = response.data;
        if (Array.isArray(responseData) && responseData.length > 0) {
          // Filter requests based on status
          const accepted = responseData.filter(request => request.status === 'accepted');
          const pending = responseData.filter(request => request.status === 'pending');
          setAcceptedRequests(accepted);
          setPendingRequests(pending);
        } else {
          setError('No requests found');
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Error fetching requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" /> {/* Display spinner icon */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-4">
      <div>
        <h2 className="text-xl font-semibold mb-2 text-center">Accepted Requests</h2>
        {acceptedRequests.length > 0 ? (
          <table className="min-w-full divide-y mt-4 divide-gray-200">
            <thead className="font-bold bg-gray-100">
              <tr className=''>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Donor Name</th>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Phone Number</th>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Blood Group</th>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {acceptedRequests.map(request => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{request.donor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.donor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.donor.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.donor.bloodGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.status}
                  <FontAwesomeIcon icon={faCheckCircle } className="ml-2 text-green-500 mx-auto" size="x" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No accepted requests found</div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-center">Pending Requests</h2>
        {pendingRequests.length > 0 ? (
          <table className="min-w-full divide-y mt-4 divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Donor Name</th>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Phone Number</th>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Blood Group</th>
                <th scope="col" className="px-6 py-3 text-left text-md text-gray-900 tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingRequests.map(request => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{request.donor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.status}
                  <FontAwesomeIcon icon={faClock } className="ml-2 text-yellow-500 mx-auto" size="x" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No pending requests found</div>
        )}
      </div>
    </div>
  );
};

export default ViewRequests;
