import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import packageRoutes from './routes/package.routes.js';
import bookingRoutes from './routes/booking.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Tourism Package Management API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ success: false, message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to database', error);
    process.exit(1);
  });
