import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    travelPackage: { type: mongoose.Schema.Types.ObjectId, ref: 'TravelPackage', required: true, index: true },
    bookingDate: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true, min: 1 },
    totalCost: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['Pending', 'confirmed', 'cancelled'], default: 'Pending' },
    bookingPersonName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactNumber: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
  },
  { timestamps: true }
);

export const Booking = mongoose.model('Booking', bookingSchema);
