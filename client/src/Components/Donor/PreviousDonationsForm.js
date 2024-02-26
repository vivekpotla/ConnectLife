import React from 'react';
import { Modal } from 'react-modal';

const PreviousDonationsForm = ({ slotId, onClose }) => {
  // Add your form logic here
  return (
    <Modal open onClose={onClose}>
      <h2>Previous Donations Form</h2>
      <p>Slot ID: {slotId}</p>
      {/* Add your form components here */}
    </Modal>
  );
};

export default PreviousDonationsForm;
