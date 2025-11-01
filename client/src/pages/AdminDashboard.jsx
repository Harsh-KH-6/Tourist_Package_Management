import { useEffect, useState } from 'react';
import { http } from '../api/http.js';
import { API } from '../api/urls.js';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ name: '', destination: '', description: '', price: '', durationDays: '', imageUrl: '', tripDetails: [] });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState('');

  async function load() {
    try {
      const [p, b] = await Promise.all([http.get(API.PACKAGES), http.get(API.BOOKINGS.ROOT)]);
      setPackages(p.data.data || []);
      setBookings(b.data.data || []);
    } catch (e) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function savePackage() {
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        tripDetails: form.tripDetails.filter(d => d.trim() !== ''), // Also send tripDetails
        durationDays: Number(form.durationDays),
      };
      if (editingId) {
        await http.put(`${API.PACKAGES}/${editingId}`, payload);
        toast.success('Package updated');
      } else {
        await http.post(API.PACKAGES, payload);
        toast.success('Package created');
      }
      setForm({ name: '', destination: '', description: '', price: '', durationDays: '', imageUrl: '', tripDetails: [] });
      setEditingId('');
      await load();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Save failed');
    }
  }

  async function editPackage(p) {
    setForm({
      name: p.name,
      destination: p.destination,
      description: p.description,
      price: String(p.price),
      durationDays: String(p.durationDays),
      imageUrl: p.imageUrl,
      tripDetails: p.tripDetails || [],
    });
    setEditingId(p._id);
  }

  function handleTripDetailChange(index, value) {
    const newTripDetails = [...form.tripDetails];
    newTripDetails[index] = value;
    setForm(f => ({ ...f, tripDetails: newTripDetails }));
  }

  function addTripDetail() {
    setForm(f => ({ ...f, tripDetails: [...f.tripDetails, ''] }));
  }

  function removeTripDetail(index) {
    setForm(f => ({ ...f, tripDetails: f.tripDetails.filter((_, i) => i !== index) }));
  }

  async function deletePackage(id) {
    if (!confirm('Delete this package?')) return;
    try {
      await http.delete(`${API.PACKAGES}/${id}`);
      toast.success('Deleted');
      await load();
    } catch (e) {
      toast.error('Delete failed');
    }
  }

  async function acceptBooking(id) {
    if (!confirm('Accept this booking? This will confirm the slot.')) return;
    try {
      await http.put(`${API.BOOKINGS.ROOT}/${id}`, { status: 'confirmed' });
      toast.success('Booking confirmed');
      await load(); // Reload data to reflect the change
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to confirm booking');
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
    <div className="grid gap-12 lg:grid-cols-3">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{editingId ? 'Edit Package' : 'Create Package'}</h2>
        <div className="bg-white border rounded-lg shadow-lg p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input className="border p-3 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" name="name" placeholder="Package Name" value={form.name} onChange={handleChange} />
            <input className="border p-3 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <input className="border p-3 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} />
              <input className="border p-3 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" name="durationDays" type="number" placeholder="Duration (days)" value={form.durationDays} onChange={handleChange} />
            </div>
            <input className="border p-3 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
            <textarea className="border p-3 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" rows="4" name="description" placeholder="Description" value={form.description} onChange={handleChange} />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">Trip Itinerary</h3>
              {form.tripDetails.map((detail, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    className="border p-2 rounded-md w-full"
                    placeholder={`Day ${index + 1} details`}
                    value={detail}
                    onChange={(e) => handleTripDetailChange(index, e.target.value)}
                  />
                  <button onClick={() => removeTripDetail(index)} className="px-3 py-1 text-xs font-semibold rounded-md bg-red-500 text-white hover:bg-red-600">&times;</button>
                </div>
              ))}
              <button onClick={addTripDetail} className="px-4 py-2 text-sm rounded-md border bg-gray-100 hover:bg-gray-200 transition-colors">Add Day</button>
            </div>

          </div>
          <div className="flex gap-2">
            <button onClick={savePackage} className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">{editingId ? 'Update Package' : 'Create Package'}</button>
            {editingId && (
              <button onClick={() => { setEditingId(''); setForm({ name: '', destination: '', description: '', price: '', durationDays: '', imageUrl: '', tripDetails: [] }); }} className="px-5 py-2 rounded-md border bg-gray-200 hover:bg-gray-300 transition-colors">Cancel</button>
            )}
          </div>
        </div>
      </section>
      <section className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Packages</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Package Name</th>
                <th scope="col" className="px-6 py-3">Destination</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((p) => (
                <tr key={p._id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{p.name}</th>
                  <td className="px-6 py-4">{p.destination}</td>
                  <td className="px-6 py-4">₹{p.price}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => editPackage(p)} className="font-medium text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => deletePackage(p._id)} className="font-medium text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {packages.length === 0 && <div className="text-center p-4">No packages found.</div>}
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">All Bookings</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Package</th>
                <th scope="col" className="px-6 py-3">Customer Details</th>
                <th scope="col" className="px-6 py-3">Booking Info</th>
                <th scope="col" className="px-6 py-3 text-right">Status & Actions</th>
              </tr>
            </thead>
            <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{b.travelPackage?.name || 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="font-medium">{b.bookingPersonName || 'N/A'}</div>
                  <div className="text-xs">{b.contactEmail || ''}</div>
                  <div className="text-xs">Ph: {b.contactNumber || ''}</div>
                  <div className="text-xs">WA: {b.whatsappNumber || ''}</div>
                </td>
                <td className="px-6 py-4">
                  <div>{new Date(b.bookingDate).toLocaleDateString()}</div>
                  <div className="text-xs">People: {b.numberOfPeople}</div>
                  <div className="text-xs">Cost: ₹{b.totalCost}</div>
                </td>
                <td className="px-6 py-4 text-right space-y-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${b.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}>{b.status}</span>
                  <div>
                    {b.status !== 'confirmed' && (
                      <button
                        onClick={() => acceptBooking(b._id)}
                        className="px-3 py-1 text-xs font-semibold rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                      >Accept</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
            {bookings.length === 0 && <div className="text-center p-4">No bookings found.</div>}
        </div>
      </section>
    </div>
  );
}
