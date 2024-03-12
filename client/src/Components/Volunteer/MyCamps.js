import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import SlotDetails from './SlotDetails';

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
    },
    {
      "id": "65ce535dc22a6d56f68a344d",
      "name": "NSS Camp",
      "date": "2024-02-17",
      "location": "Hyderabad",
      "image": "https://cdni.iconscout.com/illustration/premium/thumb/blood-donation-camp-5526365-4620411.png?f=webp",
      "startTime": "09:00",
      "endTime": "18:00",
    },
    {
      "id": "65ce535dc22a6d56f68a344d",
      "name": "NSS Camp",
      "date": "2024-03-17",
      "location": "Hyderabad",
      "image": "https://cdni.iconscout.com/illustration/premium/thumb/blood-donation-camp-5526365-4620411.png?f=webp",
      "startTime": "09:00",
      "endTime": "18:00",
    },
    
    // Add more camp objects as needed
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);

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
    setSelectedCamp(camp);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {camps.map((camp, index) => (
        <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 m-5 transition duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-300">
          <a href={camp.link} className='flex justify-center items-center m-4'>
            <img className="rounded-lg shadow-md" src={camp.image} alt="camps image" />
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
            <p className="text-l text-gray-700 dark:text-white ">Start Date : {new Date(camp.date).toDateString()}</p>
            <p className="text-l text-gray-700 dark:text-white">Timings : {camp.startTime} AM to {camp.endTime} PM</p>
            <Button size="md" variant="gradient" color='red' className="select-none rounded-lg block w-1/2 mt-3" onClick={() => handleEditClick(camp)}>
              Edit
            </Button>
          </div>
        </div>
      ))}
      {selectedCamp && (
        <SlotDetails isOpen={modalOpen} onClose={handleCloseModal} slots={generateSlots(selectedCamp.startTime, selectedCamp.endTime)} />
      )}
    </div>
  );
};
