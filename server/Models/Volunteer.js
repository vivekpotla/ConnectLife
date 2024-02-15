import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const volunteerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aadhaarNumber: {
    type: String,
    unique: true,
    required: true
  },
  contactNumber: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  livelocation: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  },
  campsParticipated: [{ type: Schema.Types.ObjectId, ref: 'Camp' }]
});

const Volunteer = model('Volunteer', volunteerSchema);

export default Volunteer;
