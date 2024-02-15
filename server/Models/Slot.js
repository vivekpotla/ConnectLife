import { Schema, model } from 'mongoose';

const slotSchema = new Schema({
  camp: { type: Schema.Types.ObjectId, ref: 'BloodDonationCamp', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // Start time of the slot
  endTime: { type: String, required: true }, // End time of the slot
  maxDonorsPerSlot: { type: Number, default: 1 }, // Maximum number of donors allowed in the slot
  donors: [{ type: Schema.Types.ObjectId, ref: 'Donor' }], // Donors booked for this slot
  volunteers: [{ type: Schema.Types.ObjectId, ref: 'Volunteer' }] // Volunteers participating in this slot
});

const Slot = model('Slot', slotSchema);

export default Slot;
