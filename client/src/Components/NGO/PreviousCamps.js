import React, { useState, useEffect } from 'react';
import { format, isAfter, isBefore } from 'date-fns'; // Import isAfter from date-fns
import { CampsDonors } from './CampsDonors';
import { CampsBloodUnits } from './CampsBloodUnits';
import axios from 'axios';

export const PreviousCamps = () => {
  useEffect(() => {  
    const fetchCampsData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/ngo/previous-camps", {ngoId: JSON.parse(localStorage.getItem("user"))._id });
        if (response.status === 200) {
          setCampsData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCampsData();
  }, []);

  const [campsData, setCampsData] = useState([]);
  const [showDonorsModal, setShowDonorsModal] = useState(false);
  const [showBloodUnitsModal, setShowBloodUnitsModal] = useState(false);
  const [selectedCampDonors, setSelectedCampDonors] = useState([]);
  const [selectedCampBloodUnits, setSelectedCampBloodUnits] = useState([]);

  const handleViewDonors = async (campId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/ngo/get-donors-in-camp", {campId});
      if (response.status === 200) {
        setSelectedCampDonors(response.data.donated); // assuming the response has 'donated' field for donors who donated
        setShowDonorsModal(true);
      }
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleViewBloodUnits =  async (campId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/ngo/get-donors-in-camp", {campId});
      if (response.status === 200) {
        setSelectedCampBloodUnits(response.data.donated); // assuming the response has 'donated' field for donors who donated
        setShowBloodUnitsModal(true);
      }
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleCloseModal = () => {
    setShowDonorsModal(false);
    setShowBloodUnitsModal(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Previous Camps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campsData
          .filter(camp => isBefore(new Date(camp.endDate), new Date())) // Filter camps with endDate after today
          .map((camp, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
              <div>
                <img src={camp.imageURL} alt={camp.name} className="w-full h-48 object-cover mb-4" />
                <h2 className="text-xl font-semibold mb-2">{camp.name}</h2>
                <p className="text-gray-600 mb-2">Date: {format(new Date(Date.parse(camp.startDate)), 'MM/dd/yyyy')}</p>
                <p className="text-gray-600 mb-2 line-clamp-3">Location: {camp.location}</p>
              </div>
              <div className='flex justify-around mt-4'>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleViewDonors(camp._id)}>View Donors</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => handleViewBloodUnits(camp._id)}>View Blood Units</button>
              </div>
            </div>
          ))}
      </div>
      <CampsDonors show={showDonorsModal} handleClose={handleCloseModal} donors={selectedCampDonors} />
      <CampsBloodUnits show={showBloodUnitsModal} handleClose={handleCloseModal} donors={selectedCampBloodUnits} />
    </div>
  );
};
