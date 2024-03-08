import React from 'react';
import { useNavigate } from 'react-router-dom';

const CampModal = ({ isOpen, onClose, slots }) => {
  const navigate = useNavigate();

  const handleSlotClick = () => {
    // Here you can fetch donor details based on the slot and navigate to another page
    // For now, I'll keep it static
    const donorDetails =[ {
      name: 'John Doe',
      bloodGroup: 'O+',
      // Add other donor details if needed
    },
    {
      name: 'John Doe',
      bloodGroup: 'O+',
      // Add other donor details if needed
    },
    {
      name: 'John Doe',
      bloodGroup: 'O+',
      // Add other donor details if needed
    },
    {
      name: 'John Doe',
      bloodGroup: 'O+',
      // Add other donor details if needed
    }
  ]
    console.log(donorDetails)
    // Navigate to the donor details page
    navigate("/volunteer/donordetails", { state: { donorDetails } });
     // Close the modal after navigating
     onClose();

  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
      <div className="bg-white rounded-lg overflow-hidden z-50">
        <div className="px-6 py-4">
          <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-lg font-bold mb-2">Available Slots</div>
          <div className="grid grid-cols-3 gap-4">
            {slots.map((slot, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md cursor-pointer" onClick={handleSlotClick}>
                {slot}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampModal;
