import mongoose from 'mongoose';

const { Schema } = mongoose;

const awarenessPostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true }, // URL of the uploaded image
  createdAt: { type: Date, default: Date.now },
  authorNGO: { type: Schema.Types.ObjectId, ref: 'NGO', required: true },
  comments: [{
    author: { type: Schema.Types.ObjectId, ref: 'Donor' },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [{
      author: { type: Schema.Types.ObjectId, ref: 'NGO' },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    }],
  }],
}, { timestamps: true });

export default mongoose.model('AwarenessPost', awarenessPostSchema);
