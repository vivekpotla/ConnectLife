import mongoose from 'mongoose';

const { Schema } = mongoose;

const recipientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL:{
    type: String,
    required: false,
    default:"https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg"
  },
  aadhaarNumber: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  livelocation:{
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  }
});

export default mongoose.model('Recipient', recipientSchema);