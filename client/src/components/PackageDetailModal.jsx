import { useAuth } from '../state/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function PackageDetailModal({ travelPackage, onClose, onBookNow }) {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-40 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="w-full h-64 bg-gray-200 rounded-t-lg">
          <img src={travelPackage.imageUrl} alt={travelPackage.name} className="w-full h-full object-contain" />
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{travelPackage.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
          </div>
          <p className="text-md text-gray-600 mb-4">{travelPackage.destination}</p>

          <div className="flex items-center justify-between mb-6 border-y py-4">
            <span className="font-bold text-2xl text-blue-600">₹{travelPackage.price}</span>
            <span className="text-md text-gray-500">{travelPackage.durationDays} days</span>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{travelPackage.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Itinerary</h3>
            <div className="space-y-3 border-l-2 border-blue-200 pl-4">
              {travelPackage.tripDetails && travelPackage.tripDetails.length > 0 ? (
                travelPackage.tripDetails.map((detail, index) => (
                  <div key={index} className="relative">
                    <span className="absolute -left-5 top-1.5 w-3 h-3 bg-blue-500 rounded-full"></span>
                    <p><span className="font-semibold">Day {index + 1}:</span> {detail}</p>
                  </div>
                ))
              ) : (
                <p>No itinerary available.</p>
              )}
            </div>
          </div>

          <div className="text-center border-t pt-6">
            {isAuthenticated ? (
              !isAdmin && (
                <button onClick={onBookNow} className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-lg">
                  Book Now
                </button>
              )
            ) : (
              <Link to="/login" className="px-8 py-3 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-700 transition-colors text-lg">Login to Book</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}