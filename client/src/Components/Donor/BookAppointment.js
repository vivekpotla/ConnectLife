import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PreviousDonationsForm } from './PreviousDonationsForm';
import { GenerateSlotReciept } from './GenerateSlotReciept';
import { useNavigate } from 'react-router';
import Footer from '../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogHeader } from '@material-tailwind/react';
const userObj = JSON.parse(localStorage.getItem('user'));

export const BookAppointment = ({ campDetails }) => {
  const [showDatesPopup, setShowDatesPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unavailableSlotAlertVisible, setUnavailableSlotAlertVisible] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false); // Updated state
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/donor/camp/getslots', {
          campId: campDetails._id,
        });
        if (!response.data) {
          throw new Error('Failed to fetch slots');
        }
        setSlots(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching slots:', error.message);
      }
    };

    const checkAlreadyBooked = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:5000/api/donor/appointments/${userObj._id}`);
        const { notDonatedAppointments } = response.data;
        const alreadyBooked = notDonatedAppointments.some(appointment => appointment.camp._id === campDetails._id);
        setAlreadyBooked(alreadyBooked);
        setLoading(false); // Set loading to false after fetching appointment status
      } catch (error) {
        console.error('Error checking if already booked:', error);
      }
    };

    if (campDetails) {
      fetchSlots();
      checkAlreadyBooked(); // Check if already booked when campDetails changes
    }
  }, [campDetails]);

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setShowDatesPopup(false);
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  };

  const handleSlotClick = (slot) => {
    if (slot.slotsLeft !== 0) {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    } else {
      setUnavailableSlotAlertVisible(true);
    }
  };

  const handleConfirmBooking = async (medicalConditions) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/donor/book-appointment', {
        campId: campDetails._id,
        date: selectedDate,
        slot: selectedSlot,
        donorId: userObj._id,
        medicalConditions: medicalConditions.split("\n")
      });
      setLoading(false);
      setBookingSuccess(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleRejectBooking = () => {
    setSelectedDate(null);
    setIsModalOpen(false);
    setShowDatesPopup(false);
  }

  const handleCloseUnavailableSlotAlert = () => {
    setUnavailableSlotAlertVisible(false);
  };

  const handleCloseAlert = () => {
    navigate('/receipt', { state: { campDetails, selectedSlot, donorDetails: userObj } });
  };

  // Render loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center m-5 p-5">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" /> {/* Display spinner icon */}
      </div>
    );
  }

  // Render UI based on appointment status
  return (
    <div className="container mx-auto p-4">
      {!alreadyBooked && campDetails && (
        <button
          onClick={() => setShowDatesPopup(true)}
          className="flex justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4 mx-auto"
        >
          Book Appointment
        </button>
      )}

      {alreadyBooked && (
        <p className="text-center text-red-500 font-semibold">
          You have already booked an appointment for this camp!
        </p>
      )}


      <Dialog
        open={showDatesPopup}
        handler={() => setShowDatesPopup(!showDatesPopup)}
        size='xs'
        className='py-5'
      >
        <DialogHeader className=''>
          <h1 className='text-xl mx-auto font-semibold mb-2 text-center'>Select Date</h1>
        </DialogHeader>
          <div className={`max-w-md mx-auto grid grid-cols-${Object.keys(slots).length > 2 ? 3 : Object.keys(slots).length}`}>
          {Object.keys(slots)
            .filter(dateString => new Date(dateString) >= new Date(new Date().setHours(0, 0, 0, 0))) // Filter out dates before today
            .map((dateString, index) => {
              const date = new Date(dateString);
              const options = { weekday: 'short', month: 'short', day: 'numeric' };
              const formattedDate = date.toLocaleDateString('en-US', options);
              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`pt-6 pb-6 p-2 m-2 border rounded-md text-gray-900 border-gray-300  cursor-pointer hover:bg-red-100 bg-red-200`}
                >
                  <p className="text-center">{formattedDate}</p>
                </div>
              );
            })}
        </div>
      </Dialog>

      {selectedDate && (
        <>
          <div className="my-4">
            <h2 className="text-lg font-bold mb-2">Slots Available on ({selectedDate})</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {slots[selectedDate]?.map((slot, index) => (
                <div
                  key={index}
                  onClick={() => handleSlotClick(slot)}
                  className={`p-2 rounded cursor-pointer ${slot.slotsLeft !== 0
                    ? 'bg-green-400 border-2 border-green-700 hover:bg-green-300 hover:ring-green-500 transition delay-100'
                    : 'bg-red-400 border-2 border-red-700 hover:bg-red-300 hover:ring-red-500 transition delay-100'
                    } hover:scale-90 hover:ring-opacity-50`}
                >
                  <p>{slot.startTime} - {slot.endTime}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='flex gap-3 mt-5 text-center items-start'>
            <div className='text-[40px] text-red-600'>*</div>
            <div className={`p-1 rounded bg-green-400 border-2 border-green-700  `} style={{ width: '110px' }} >
              <p>Available </p>
            </div>
            <div className={`p-1 rounded bg-red-400 border-2 border-red-700  `} style={{ width: '110px' }} >
              <p>Not Available </p>
            </div>
          </div>
        </>
      )}

      {/* ${
                  slot.slotsLeft !== 0
                    ? 'bg-green-400 border-2 border-green-700 hover:bg-green-300 hover:ring-green-500 transition delay-100'
                    : 'bg-red-400 border-2 border-red-700 hover:bg-red-300 hover:ring-red-500 transition delay-100'
                } */}


      <PreviousDonationsForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onConfirm={handleConfirmBooking} onReject={handleRejectBooking} />

      {bookingSuccess && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <p className="text-xl font-semibold mb-4">Booking successful!</p>
            <p>You will now be redirected to the receipt page.</p>
            <button onClick={handleCloseAlert} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              OK
            </button>
          </div>
        </div>
      )}

      {unavailableSlotAlertVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <p className="text-xl font-semibold mb-4">Slot not available!</p>
            <p>Please select another slot.</p>
            <button onClick={handleCloseUnavailableSlotAlert} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
