import {  mongoose, Schema } from 'mongoose';


const campSchema = new Schema({
  ngo: {
    type: Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageURL:{
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  geolocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  maxDonorsPerSlot: {
    type: Number,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  slotsPerHour: {
    type: Number,
    required: true,
    default:1
  },
  volunteers: [{
    type: Schema.Types.ObjectId,
    ref: 'Volunteer'
  }]
});

export default mongoose.model('Camp', campSchema);
