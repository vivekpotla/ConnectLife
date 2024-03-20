import { Schema, mongoose } from 'mongoose';

const appointmentSchema = new Schema({
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  camp: {
    type: Schema.Types.ObjectId,
    ref: 'Camp',
    required: true
  },
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  medicalConditions: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  donated: {
    type: Boolean,
    default: false
  },
  quantity: {
    type: Number,
    default: 0
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
});

export default mongoose.model('Appointment', appointmentSchema);
