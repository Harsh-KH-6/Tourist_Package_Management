import { User } from '../models/User.model.js';
import { signJwt } from '../middleware/auth.js';

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ success: false, message: 'Email already in use' });

    const user = await User.create({ name, email, password });
    const token = signJwt({ id: user._id, role: user.role });
    res.status(201).json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = signJwt({ id: user._id, role: user.role });
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


