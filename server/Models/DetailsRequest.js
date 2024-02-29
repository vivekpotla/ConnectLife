import mongoose from 'mongoose';

const { Schema } = mongoose;

const requestSchema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'Recipient', required: true },
  donor: { type: Schema.Types.ObjectId, ref: 'Donor', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
});

export default mongoose.model('RequestDetails', requestSchema);
