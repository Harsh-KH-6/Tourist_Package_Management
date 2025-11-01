import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Packages from './pages/Packages.jsx';
import MyBookings from './pages/MyBookings.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}


