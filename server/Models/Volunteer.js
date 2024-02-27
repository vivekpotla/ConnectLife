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
  imageURL:{
    type: String,
    required: false,
    default:"https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg"
  },
  contactNumber: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  livelocation: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  },
  campsParticipated: [{ type: Schema.Types.ObjectId, ref: 'Camp' }]
});

const Volunteer = model('Volunteer', volunteerSchema);

export default Volunteer;
