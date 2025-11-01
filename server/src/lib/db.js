import mongoose from 'mongoose';

export async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not set');
  }

  mongoose.set('strictQuery', true);

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    throw err;
  }
}
