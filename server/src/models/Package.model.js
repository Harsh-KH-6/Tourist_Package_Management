import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    durationDays: { type: Number, required: true, min: 1 },
    imageUrl: { type: String, required: true },
    tripDetails: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const TravelPackage = mongoose.model('TravelPackage', packageSchema);
