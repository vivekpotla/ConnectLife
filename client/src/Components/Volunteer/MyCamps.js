import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import SlotDetails from './SlotDetails';
import axios from 'axios';

export const MyCamps = () => {
  const [camps, setCamps] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const userObj = JSON.parse(localStorage.getItem("user"));
  const volunteerId = userObj._id;

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        // Fetch volunteer's camps data from backend
        const response = await axios.get(`http://localhost:5000/api/volunteer/mycamps/${volunteerId}`);
        const campsWithSlots = await Promise.all(response.data.map(async (camp) => {
          // Fetch slot details for each camp
          const slotResponse = await axios.post('http://localhost:5000/api/volunteer/get-slot-details', { campId: camp._id });
          const updatedCamp = { ...camp, slots: slotResponse.data };
          console.log(updatedCamp)
          return updatedCamp;
        }));
        setCamps(campsWithSlots);
      } catch (error) {
        console.error('Error fetching volunteer camps:', error);
      }
    };

    // Call the fetchCamps function when the component mounts
    fetchCamps();
  }, []);
  const generateSlots = (startTime, endTime) => {
    const slots = [];
    let currentTime = new Date(`2000-01-01T${startTime}`);
    const endTimeObj = new Date(`2000-01-01T${endTime}`);
    while (currentTime < endTimeObj) {
      slots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Increment by 1 hour
    }
    return slots;
  };

  const handleEditClick = (camp) => {
    console.log(camp)
    setSelectedCamp(camp);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="flex flex-wrap justify-center">
      {camps.map((camp, index) => (
        <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 m-5 transition duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-300">
          <a href={camp.link} className='flex justify-center items-center m-4'>
            <img className="rounded-lg shadow-md" src={camp.imageURL} alt="camps image" />
          </a>
          <div className="px-5 pb-5">
            <div className="flex items-center">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{camp.name}</h5>
              {new Date(camp.date) > new Date() ? (
                <span className='ml-6 pl-1 pr-1 rounded-xl text-white bg-gray-500'>Not Started</span>
              ) : (
                <span className='ml-6 pl-1 pr-1 rounded-xl text-white bg-green-500'>Active</span>
              )}
            </div>
            <div className='text-gray-600'>{camp.description}</div>
            <div className="flex items-start gap-2 py-3">
              <div>
                <MapPinIcon className="w-5 text-blue-gray-500 mt-0.5 fill-red-300" />
              </div>
              <span className="text-l text-gray-700 dark:text-white line-clamp-2">{camp.location}</span>
            </div>
            <p className="text-l text-gray-700 dark:text-white ">Start Date : {formatDate(camp.startDate)}</p>
            <p className="text-l text-gray-700 dark:text-white ">End Date : {formatDate(camp.endDate)}</p>
            <p className="text-l text-gray-700 dark:text-white">Timings : {camp.startTime} AM to {camp.endTime} PM</p>
            <Button size="md" variant="gradient" color='red' className="select-none rounded-lg block w-1/2 mt-3" onClick={() => handleEditClick(camp)}>
              Edit
            </Button>
          </div>
        </div>
      ))}
      {selectedCamp && (
        <SlotDetails isOpen={modalOpen} onClose={handleCloseModal} slots={selectedCamp.slots} />
      )}
    </div>
  );
};

