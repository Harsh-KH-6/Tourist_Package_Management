import { Booking } from '../models/Booking.model.js';
import { TravelPackage } from '../models/Package.model.js';

export async function createBooking(req, res) {
  try {
    const {
      travelPackageId,
      bookingDate,
      numberOfPeople,
      bookingPersonName,
      contactEmail,
      contactNumber,
      whatsappNumber,
    } = req.body;

    if (!travelPackageId || !bookingDate || !numberOfPeople || !bookingPersonName || !contactEmail || !contactNumber || !whatsappNumber) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const travelPackage = await TravelPackage.findById(travelPackageId);
    if (!travelPackage) return res.status(404).json({ success: false, message: 'Package not found' });

    const totalCost = travelPackage.price * numberOfPeople;

    const booking = await Booking.create({
      user: req.user.id,
      travelPackage: travelPackage._id,
      bookingDate: new Date(bookingDate),
      numberOfPeople,
      totalCost,
      bookingPersonName,
      contactEmail,
      contactNumber,
      whatsappNumber,
      status: 'Pending',
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getMyBookings(req, res) {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('travelPackage')
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllBookings(_req, res) {
  try {
    const bookings = await Booking.find()
      .populate('travelPackage')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateBookingStatus(req, res) {
  try {
    const { status } = req.body;
    const updated = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true }).lean();
    if (!updated) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
