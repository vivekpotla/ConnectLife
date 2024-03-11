import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PreviousDonationsForm } from './PreviousDonationsForm';
import { GenerateSlotReciept } from './GenerateSlotReciept';
import { useNavigate } from 'react-router';

const userObj = JSON.parse(localStorage.getItem("user"));

export const BookAppointment = ({campDetails}) => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/donor/camp/getslots', { campId: campDetails._id });
        if (!response.data) {
          throw new Error('Failed to fetch slots');
        }
        const slotsData = Object.values(response.data).flatMap(slots => slots);
        setSlots(slotsData);
      } catch (error) {
        console.error('Error fetching slots:', error.message);
      }
    };

    if (campDetails) {
      fetchSlots();
    }
  }, [campDetails]);
  const handleSlotClick = (slot) => {
    if (slot.slotsLeft!=0) {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    } else {
      console.log(`Slot ${slot.startTime} - ${slot.endTime} is fully booked`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (lastDonationDate !== '') {
      setBookingSuccess(true);
      setSelectedSlot(null);
      setLastDonationDate('');
    }
  };

  const handleConfirmBooking = async() => {
    try {
      console.log(selectedSlot._id)
      const response = await axios.post('http://localhost:5000/api/donor/book-appointment', {
        campId: campDetails._id,
        date: campDetails.startDate,
        slot: selectedSlot,
        donorId: userObj._id
      });
      setBookingSuccess(true);
      navigate('/receipt', { state: { campDetails, selectedSlot, donorDetails: userObj } });
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Book Slot</h1>
      {/* Legend */}
      <div className="flex justify-center mt-16 m-4">
        <div className=" inline-block mr-4">
          <div className="w-4 h-4 bg-green-500 rounded-full inline-block mr-2"></div>
          <span className="text-sm">Slot Available</span>
        </div>
        <div className="inline-block">
          <div className="w-4 h-4 bg-red-500 rounded-full inline-block mr-2"></div>
          <span className="text-sm">Slot not Available</span>
        </div>
      </div>
      {/* Grid */}
      <div className="flex  justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 grid-rows-3 gap-3">
          {slots.map((slot, index) => (
            <div
              key={index}
              onClick={() => handleSlotClick(slot)}
              className={`p-2 border border-gray-300 rounded cursor-pointer ${slot.slotsLeft!=0 ? 'bg-green-400 border-2 border-green-700 hover:bg-green-300' :
                  'bg-red-400 border-2 border-red-700 hover:bg-red-300'
                } hover:scale-90 hover:ring-2 hover:ring-green-500 hover:ring-opacity-50`}
            >
              <p>{slot.startTime} - {slot.endTime}</p>
            </div>
          ))}
        </div>
      </div>
      <PreviousDonationsForm isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmBooking} />
      {bookingSuccess && (
        <GenerateSlotReciept campDetails={campDetails} selectedSlot={selectedSlot} donorDetails={userObj} />
      )}
    </>
  );
};
