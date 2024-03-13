import React, { useState, useEffect } from 'react';
import { format, isBefore } from 'date-fns'; // Import isAfter from date-fns
import { CampsDonors } from './CampsDonors';
import { CampsBloodUnits } from './CampsBloodUnits';
import axios from 'axios';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { BellAlertIcon } from '@heroicons/react/24/outline';
import { clearStorage } from 'mapbox-gl';

export const PreviousCamps = () => {

  const [campsData, setCampsData] = useState([]);
  const [showDonorsModal, setShowDonorsModal] = useState(false);
  const [showBloodUnitsModal, setShowBloodUnitsModal] = useState(false);
  const [selectedCampDonors, setSelectedCampDonors] = useState([]);
  const [selectedCampBloodUnits, setSelectedCampBloodUnits] = useState([]);

  useEffect(() => {
    const fetchCampsData = async () => {
      try {
        await axios.post("http://localhost:5000/api/ngo/previous-camps", { ngoId: JSON.parse(localStorage.getItem("user"))._id }).then((res) => {
          setCampsData(res.data);
          // console.log(res.data);
        }).catch((error) => {
          console.log(error);
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCampsData();
  }, []);

  const handleViewDonors = async (campId) => {
    try {
      await axios.post("http://localhost:5000/api/ngo/get-donors-in-camp", { campId }).then((res) => {
        setSelectedCampDonors(res.data.donated); // assuming the response has 'donated' field for donors who donated
        setShowDonorsModal(true);
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleViewBloodUnits = async (campId) => {
    try {
      await axios.post("http://localhost:5000/api/ngo/get-blood-quantity", { campId }).then((res) => {
        setSelectedCampBloodUnits(res.data.donated); // assuming the response has 'donated' field for donors who donated
        setShowBloodUnitsModal(true);
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleCloseModal = () => {
    setShowDonorsModal(false);
    setShowBloodUnitsModal(false);
  };

  const [notify, setNotify] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Previous Camps</h1>
      {campsData.length > 0 ? ( // Check if campsData is not null
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* .filter(camp => isBefore(new Date(camp.endDate), new Date()) && isBefore(new Date(camp.startDate), new Date())) // Filter camps with endDate after today */}
          {campsData
            .map((camp, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col relative justify-between">
                <div className='absolute right-3'>
                  <Tooltip content="Send Mail to Volunteers">
                    <IconButton disabled={notify} variant='text' onClick={async () => {
                      setNotify(true);
                      await axios.post("http://localhost:5000/api/ngo/notify-volunteers-email", { campId: camp._id }).then((res) => {
                        setTimeout(() => {
                          setNotify(false);
                        }, 120000);
                      }).catch((error) => {
                        console.log(error);
                      });
                    }}>
                      <BellAlertIcon className='w-6 h-6' fill='red' />
                    </IconButton>
                  </Tooltip>
                </div>
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
      ) : (
        <div>Loading...</div>
      )}
      <CampsDonors show={showDonorsModal} handleClose={handleCloseModal} donors={selectedCampDonors} />
      <CampsBloodUnits show={showBloodUnitsModal} handleClose={handleCloseModal} donors={selectedCampBloodUnits} />
    </div>
  );
}