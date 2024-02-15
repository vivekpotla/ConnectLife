import mongoose from 'mongoose';

const { Schema } = mongoose;

const slotSchema = new Schema({
  camp: {
    type: Schema.Types.ObjectId,
    ref: 'Camp',
    required: true
  },
  date: {
    type: Date,
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
  maxDonorsPerSlot: {
    type: Number,
    required: true
  },
  slotsLeft:{
    type:Number,
    required:true
  }
});

export default mongoose.model('Slot', slotSchema);
