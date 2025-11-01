import { useEffect, useState } from 'react';
import { http } from '../api/http.js';
import { API } from '../api/urls.js';
import toast from 'react-hot-toast';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await http.get(API.BOOKINGS.MINE);
        setBookings(res.data.data || []);
      } catch (e) {
        toast.error(e?.response?.data?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return <div className="text-center text-gray-500 mt-8">You have no bookings yet.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h1>
      <div className="space-y-6">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white border rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-grow">
              <div className="font-bold text-xl text-gray-800">{b.travelPackage?.name}</div>
              <div className="text-sm text-gray-600 mt-1">Booked on: {new Date(b.bookingDate).toLocaleDateString()}</div>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-semibold text-lg">₹{b.totalCost} <span className="text-sm font-normal text-gray-500">({b.numberOfPeople} people)</span></div>
              <div className="text-sm mt-1 capitalize">
                Status: <span className={`font-semibold ${b.status === 'confirmed' ? 'text-green-600' : 'text-orange-500'}`}>
                  {b.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
