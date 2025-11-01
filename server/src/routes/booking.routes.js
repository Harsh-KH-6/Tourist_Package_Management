import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { createBooking, getAllBookings, getMyBookings, updateBookingStatus } from '../controllers/booking.controller.js';

const router = Router();

router.post('/', requireAuth, createBooking);

router.get('/me', requireAuth, getMyBookings);
router.get('/', requireAuth, requireAdmin, getAllBookings);
router.put('/:id', requireAuth, requireAdmin, updateBookingStatus);

export default router;
