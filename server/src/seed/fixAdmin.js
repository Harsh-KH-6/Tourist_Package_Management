import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../lib/db.js';
import { User } from '../models/User.model.js';

dotenv.config();

async function fixAdmin() {
  await connectToDatabase();

  const adminEmail = 'admin@tourism.local';
  const adminPassword = 'Admin@123';

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    // If admin exists, ensure role is 'admin' and reset password
    existingAdmin.role = 'admin';
    existingAdmin.password = adminPassword; // The pre-save hook will hash this
    await existingAdmin.save();
    // eslint-disable-next-line no-console
    console.log(`✅ Admin user '${adminEmail}' was found and updated.`);
  } else {
    // If admin does not exist, create one
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword, // The User model's pre-save hook will hash this
      role: 'admin',
    });
    // eslint-disable-next-line no-console
    console.log(`✅ Admin user '${adminEmail}' created with password: ${adminPassword}`);
  }

  process.exit(0);
}

fixAdmin().catch((e) => {
  // eslint-disable-next-line no-console
  console.error('❌ Failed to fix admin user:', e);
  process.exit(1);
});