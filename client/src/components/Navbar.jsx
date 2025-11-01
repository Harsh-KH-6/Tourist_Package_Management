import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

export default function Navbar() {
  const { isAuthenticated, isAdmin, setToken, setUser } = useAuth();
  const navigate = useNavigate();

  function logout() {
    setToken('');
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl text-blue-600">Tourista</Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          {/* Guest and User links */}
          {!isAdmin && <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>}

          {/* Common link for all */}
          <Link to="/packages" className="hover:text-blue-600 transition-colors">Packages</Link>

          {/* Authenticated User links */}
          {isAuthenticated && !isAdmin && (
            <Link to="/bookings" className="hover:text-blue-600 transition-colors">My Bookings</Link>
          )}

          {/* Admin links */}
          {isAdmin && (
            <Link to="/admin" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          )}

          {/* Auth buttons */}
          {isAuthenticated ? (
            <button onClick={logout} className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800 transition-colors">Logout</button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
