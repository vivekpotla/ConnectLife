import React, {useState} from 'react'
import Modal from 'react-modal';
import {PreviousDonationsForm} from './PreviousDonationsForm';
import { GenerateSlotReciept } from './GenerateSlotReciept';
import { useNavigate  } from 'react-router-dom'; 

const campDetails = {
  startTime: '09:00', // Example start time
  endTime: '18:00',   // Example end time
  maxDonorsPerSlot: 4,
  street: "At VNR Vignan Jyothi Eng. College,Bachupally, Pragathi Nagar",
  city: "Nizampet",
  state: "Telangana",
  zipcode: "500092",
  description: "NSS Blood Donation Camp",
  startDate: "2024-02-17",
  endDate: "2024-02-18",
  name:"NSS Camp"
};
const donorDetails = {
  name:'donor4',
  email:'donor4@gmail.com',
  phoneNumber:'9876543210',
  bloodGroup:'B+'
};
export const BookAppointment=() =>{
    const generateSlots = (details) => {
    const slots = [];
    let startTime = new Date(`01/01/2000 ${details.startTime}`);
    const endTime = new Date(`01/01/2000 ${details.endTime}`);
    const maxDonorsPerSlot = details.maxDonorsPerSlot;
    while (startTime < endTime) {
      const endTimeSlot = new Date(startTime);
      endTimeSlot.setHours(endTimeSlot.getHours() + 1);

      slots.push({
        startTime: startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        endTime: endTimeSlot.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        bookedCount: 0,
        maxDonors: maxDonorsPerSlot
      });

      startTime = endTimeSlot;
    }

    return slots;
  };

  const [slots, setSlots] = useState(generateSlots(campDetails));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSlotClick = (slot) => {
    if (slot.bookedCount < slot.maxDonors) {
      // Slot is available, open modal
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

  const handleConfirmBooking = () => {
    const updatedSlots = slots.map(s => {
      if (s.startTime === selectedSlot.startTime && s.endTime === selectedSlot.endTime) {
        return {
          ...s,
          bookedCount: s.bookedCount + 1,
        };
      }
      return s;
    });
    setSlots(updatedSlots);
    console.log(`Booking confirmed for slot ${selectedSlot.startTime} - ${selectedSlot.endTime}`);
    console.log(selectedSlot)
    // Close the modal
    handleCloseModal();
    setBookingSuccess(true)
    navigate('/receipt', { state: { campDetails, selectedSlot,donorDetails } })
  };

  return (
    <>
    {/* Legend */}
    <div className="flex justify-center m-4">
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
    <div class="flex  justify-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 grid-rows-3 gap-3">
      {slots.map((slot, index) => (
        <div
          key={index}
          onClick={() => handleSlotClick(slot)}
          className={`p-2 border border-gray-300 rounded cursor-pointer ${
            slot.bookedCount < slot.maxDonors ? 'bg-green-400 border-2 border-green-700 hover:bg-green-300' : 
            'bg-red-400 border-2 border-red-700 hover:bg-red-300'
          } hover:scale-90 hover:ring-2 hover:ring-green-500 hover:ring-opacity-50`}
        >
          {/* <p>Slot {index + 1}</p> */}
          <p>{slot.startTime} - {slot.endTime}</p>
          {/* <p>{slot.maxDonors-slot.bookedCount} more slots available!</p> */}
        </div>
      ))}
    </div>
    {/* Modal */}
    <PreviousDonationsForm isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmBooking} />
    {bookingSuccess && (
        <GenerateSlotReciept campDetails={campDetails} selectedSlot={selectedSlot} donorDetails={donorDetails} />
      )}
    </div>
    </>
  );
};