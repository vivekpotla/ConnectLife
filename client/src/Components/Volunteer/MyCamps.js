import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import CampModal from './SlotDetails';

export const MyCamps = () => {
  const camps = [
    {
      "id": "65ce535dc22a6d56f68a344d",
      "name": "NSS Camp",
      "date": "2024-02-17",
      "location": "Hyderabad",
      "image": "https://cdni.iconscout.com/illustration/premium/thumb/blood-donation-camp-5526365-4620411.png?f=webp",
      "startTime": "09:00",
      "endTime": "18:00",
    }
  ];

  const [modalOpen, setModalOpen] = useState(false);

  const startDate = new Date(camps[0].date);
  const startTime = camps[0].startTime;
  const endTime = camps[0].endTime;

  // Generate slots based on start time and end time
  const generateSlots = () => {
    const slots = [];
    let currentTime = new Date(`2000-01-01T${startTime}`);
    const endTimeObj = new Date(`2000-01-01T${endTime}`);
    while (currentTime < endTimeObj) {
      slots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Increment by 1 hour
    }
    return slots;
  };

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 m-5 transition duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-300">
      <a href={camps[0].link} className='flex justify-center items-center m-4'>
        <img className="rounded-lg shadow-md" src={camps[0].image} alt="camps image" />
      </a>
      <div className="px-5 pb-5">
        <div className="flex items-center">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{camps[0].name}</h5>
        </div>
        <div className='text-gray-600'>{camps[0].description}</div>
        <div className="flex items-start gap-2 py-3">
          <div>
            <MapPinIcon className="w-5 text-blue-gray-500 mt-0.5 fill-red-300" />
          </div>
          <span className="text-l text-gray-700 dark:text-white line-clamp-2">{camps[0].location}</span>
        </div>
        <p className="text-l text-gray-700 dark:text-white ">Start Date : {startDate.toDateString()}</p>
        <p className="text-l text-gray-700 dark:text-white">Timings : {startTime} AM to {endTime} PM</p>
          <Button size="md" variant="gradient" color='red' className="select-none rounded-lg block w-1/2 mt-3" onClick={handleEditClick}>
            Edit
          </Button>
        <CampModal isOpen={modalOpen} onClose={handleCloseModal} slots={generateSlots()} />
      </div>
    </div>
  );
};
