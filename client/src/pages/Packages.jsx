import { useEffect, useState } from 'react';
import { http } from '../api/http.js';
import { API } from '../api/urls.js';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../state/AuthContext.jsx';
import BookingModal from '../components/BookingModal.jsx';
import PackageDetailModal from '../components/PackageDetailModal.jsx';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isAdmin } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingPackage, setBookingPackage] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await http.get(API.PACKAGES);
        setPackages(res.data.data || []);
      } catch (e) {
        toast.error(e?.response?.data?.message || 'Failed to load packages');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function book(bookingData) {
    try {
      bookingData.travelPackageId = bookingPackage._id;
      await http.post(API.BOOKINGS.ROOT, bookingData);
      toast.success('Booking request sent successfully!');
      setBookingPackage(null);
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Booking failed');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Packages</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => (
          <div key={p._id} className="bg-white border rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="w-full h-56 bg-gray-200">
              <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-xl mb-2 text-gray-800">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{p.destination}</p>
              <p className="text-gray-700 text-base mb-4 line-clamp-3">{p.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-lg text-blue-600">₹{p.price}</span>
                <span className="text-sm text-gray-500">{p.durationDays} days</span>
              </div>
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={() => setSelectedPackage(p)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPackage && (
        <PackageDetailModal travelPackage={selectedPackage} onClose={() => setSelectedPackage(null)} onBookNow={() => { setBookingPackage(selectedPackage); setSelectedPackage(null); }} />
      )}
      {bookingPackage && <BookingModal travelPackage={bookingPackage} onClose={() => setBookingPackage(null)} onBook={book} />}
    </div>
  );
}
