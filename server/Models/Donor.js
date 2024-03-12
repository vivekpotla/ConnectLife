import mongoose from 'mongoose';

const { Schema } = mongoose;

const donorSchema = new Schema({
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
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  livelocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      default:[0,0]
    }
  },
  previousAppointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
});

// Create 2dsphere index on livelocation field
donorSchema.index({ livelocation: '2dsphere' });

export default mongoose.model('Donor', donorSchema);
