import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SlotDetails = ({ isOpen, onClose, campId }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getSlotsData = async () => {
      await axios.post('http://localhost:5000/api/volunteer/get-slot-details', { campId }).then((res) => {
        // console.log(res.data);
        setSlots(res.data);
      }).catch((error) => {
        console.log("error fetching slots data", error);
      }).finally(() => {
        setLoading(false);
      });
    }
    getSlotsData();
  }, [])

  const handleSlotClick = (slot) => {
    // Here you can fetch donor details based on the slot and navigate to another page
    // For now, I'll keep it static
    console.log(slots)
    const donorDetails = slot.donors.map(donor => ({
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      status: donor.status,
      unitsDonated: donor.unitsDonated,
      slotId: slot._id,
      donorId: donor._id
      // Add other donor details if needed
    }));
    // console.log(donorDetails)
    // Navigate to the donor details page
    navigate("/volunteer/donordetails", { state: { donorDetails } });
    // Close the modal after navigating
    onClose();
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
      <div className="bg-white rounded-lg overflow-hidden z-50">
        {loading ?
          <div className="flex justify-center items-center p-12">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" /> {/* Display spinner icon */}
          </div> :
          <div className="px-6 py-4">
            <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-lg font-bold mb-2">Camp Slots</div>
            {/* Render date selection */}

            <h1 className='my-2'>Select Date: </h1>
            <div className="flex justify-center">
              {Object.keys(slots).map(dateString => (
                <button
                  key={dateString}
                  className={`mx-2 py-2 px-4 rounded ${selectedDate === dateString ? 'bg-blue-500 text-white' : 'border text-gray-700'
                    }`}
                  onClick={() => handleDateClick(dateString)}
                >
                  {dateString}
                </button>
              ))}
            </div>
            {/* Render slots for selected date */}
            <h1 className='my-3'>Select Slot :</h1>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {selectedDate && slots[selectedDate]?.map((slot, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-md cursor-pointer text-center"
                  onClick={() => handleSlotClick(slot)}
                >
                  {`${slot.startTime}-${slot.endTime}`} {/* Render slot time range */}
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default SlotDetails;
