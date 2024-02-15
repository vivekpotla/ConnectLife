import { Schema, model } from 'mongoose';

// Blood Donation Camp Model
const bloodDonationCampSchema = new Schema({
    ngo: { type: Schema.Types.ObjectId, ref: 'NGO', required: true },
    location: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, default: '09:00 AM' },
    endTime: { type: String, default: '06:00 PM' },
    slots: { type: Number, required: true }, // Total number of slots available
    maxDonorsPerSlot: { type: Number, default: 1 }, // Maximum number of donors per slot
    volunteers: [{ type: Schema.Types.ObjectId, ref: 'Volunteer' }] // Volunteers registered for this camp
  });
  const BloodDonationCamp = model('BloodDonationCamp', bloodDonationCampSchema);
  
  export default  BloodDonationCamp ;