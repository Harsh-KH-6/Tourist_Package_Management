import { TravelPackage } from '../models/Package.model.js';

export async function getAllPackages(_req, res) {
  try {
    const packages = await TravelPackage.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getPackageById(req, res) {
  try {
    const travelPackage = await TravelPackage.findById(req.params.id).lean();
    if (!travelPackage) return res.status(404).json({ success: false, message: 'Package not found' });
    res.json({ success: true, data: travelPackage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function createPackage(req, res) {
  try {
    const { name, destination, description, price, durationDays, imageUrl, tripDetails } = req.body;
    const created = await TravelPackage.create({ name, destination, description, price, durationDays, imageUrl, tripDetails });
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function updatePackage(req, res) {
  try {
    const updated = await TravelPackage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ success: false, message: 'Package not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function deletePackage(req, res) {
  try {
    const deleted = await TravelPackage.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ success: false, message: 'Package not found' });
    res.json({ success: true, data: { id: deleted._id } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
