import mongoose from 'mongoose';

const { Schema } = mongoose;

const bloodQuantitySchema = new Schema({
  camp: {
    type: Schema.Types.ObjectId,
    ref: 'Camp',
    required: true
  },
  A_positive: {
    type: Number,
    required: true,
    default: 0
  },
  A_negative: {
    type: Number,
    required: true,
    default: 0
  },
  B_positive: {
    type: Number,
    required: true,
    default: 0
  },
  B_negative: {
    type: Number,
    required: true,
    default: 0
  },
  AB_positive: {
    type: Number,
    required: true,
    default: 0
  },
  AB_negative: {
    type: Number,
    required: true,
    default: 0
  },
  O_positive: {
    type: Number,
    required: true,
    default: 0
  },
  O_negative: {
    type: Number,
    required: true,
    default: 0
  }
});

export default mongoose.model('BloodQuantity', bloodQuantitySchema);
