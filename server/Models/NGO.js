import {Schema,mongoose} from 'mongoose';


const ngoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\+?\d{10,}$/,
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
  description: {
    type: String,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

const NGO = mongoose.model('NGO', ngoSchema);

export default NGO;
