import React, {useState} from 'react'
import Modal from 'react-modal';
import PreviousDonationsForm from './PreviousDonationsForm';

Modal.setAppElement('#root');  

export const BookAppointment=() =>{
  const [showModal, setShowModal] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);


  const handleBookSlot = (slotId) => {
    setSelectedSlotId(slotId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <button key={index} onClick={() => handleBookSlot(index + 1)} 
        className="bg-blue-200 p-4 rounded">
        Slot {index + 1}
        </button>
      ))}
      {/* Modal for previous donations form */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <PreviousDonationsForm slotId={selectedSlotId} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};