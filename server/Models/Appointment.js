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
  date: {
    type: Date,
    required: true
  }
});

export default mongoose.model('Appointment', appointmentSchema);
