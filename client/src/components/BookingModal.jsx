import { useState, useEffect } from 'react';
import { useAuth } from '../state/AuthContext.jsx';

export default function BookingModal({ travelPackage, onClose, onBook }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    bookingPersonName: '',
    contactEmail: '',
    contactNumber: '',
    bookingDate: new Date().toISOString().slice(0, 10),
    numberOfPeople: 1, // This will now just be for cost calculation
    whatsappNumber: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        bookingPersonName: user.name,
        contactEmail: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Book: {travelPackage.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="bookingPersonName" value={formData.bookingPersonName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Travel Date</label>
              <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of People</label>
              <input type="number" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} min="1" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
            <input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} required
                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border bg-gray-200 hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}