export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
  PACKAGES: '/api/packages',
  BOOKINGS: {
    ROOT: '/api/bookings',
    MINE: '/api/bookings/me',
  },
};


