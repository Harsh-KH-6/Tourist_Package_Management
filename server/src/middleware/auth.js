import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

export async function requireAdmin(req, res, next) {
  if (!req.user?.id) return res.status(401).json({ success: false, message: 'Unauthorized' });
  const user = await User.findById(req.user.id).lean();
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
}

export function signJwt(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}


