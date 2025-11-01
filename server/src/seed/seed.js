import dotenv from 'dotenv';
import { connectToDatabase } from '../lib/db.js';
import { User } from '../models/User.model.js';
import { TravelPackage } from '../models/Package.model.js';

dotenv.config();

async function run() {
  await connectToDatabase();

  const adminEmail = 'admin@tourism.local';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({ name: 'Admin', email: adminEmail, password: 'Admin@123', role: 'admin' });
    // eslint-disable-next-line no-console
    console.log('Created admin user:', adminEmail, 'password: Admin@123');
  } else {
    // eslint-disable-next-line no-console
    console.log('Admin already exists');
  }

  const count = await TravelPackage.countDocuments();
  if (count === 0) {
    await TravelPackage.insertMany([
      {
        name: 'Jaipur Heritage Tour',
        destination: 'Jaipur, Rajasthan',
        description: 'Explore the majestic forts, opulent palaces, and vibrant bazaars of the Pink City on this immersive heritage tour.',
        price: 18000,
        durationDays: 3,
        imageUrl: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33',
        tripDetails: [
          'Arrival in Jaipur, hotel check-in. Visit Hawa Mahal and City Palace. Evening walk at Johari Bazaar.',
          'Visit Amber Fort and Jaigarh Fort. Lunch at a traditional Rajasthani restaurant. Evening cultural show at Chokhi Dhani.',
          'Visit Nahargarh Fort for panoramic city views. Explore Albert Hall Museum. Departure after local shopping.',
        ],
      },
      {
        name: 'Coorg Nature Retreat',
        destination: 'Coorg, Karnataka',
        description: "Escape to the 'Scotland of India'. Discover misty hills, lush coffee plantations, and serene waterfalls in this nature-filled retreat.",
        price: 22000,
        durationDays: 4,
        imageUrl: 'https://images.unsplash.com/photo-1595358339233-261b135ca3a8',
        tripDetails: [
          'Arrive at Coorg and check into resort. Visit Abbey Falls and Raja’s Seat viewpoint. Evening bonfire at resort.',
          'Coffee plantation tour and tasting. Visit Namdroling Monastery (Golden Temple). Explore Dubare Elephant Camp.',
          'Trek to Tadiandamol Peak (optional). Visit Nisargadhama Bamboo Forest. Local cuisine dinner.',
          'Relax at resort. Depart with memories of misty hills.',
        ],
      },
      {
        name: 'Andaman Island Escape',
        destination: 'Andaman & Nicobar Islands',
        description: 'Discover pristine beaches, turquoise waters, and vibrant coral reefs in this breathtaking island paradise.',
        price: 35000,
        durationDays: 5,
        imageUrl: 'https://images.unsplash.com/photo-1609269763923-52a053935e53',
        tripDetails: [
          'Arrive in Port Blair, visit Cellular Jail. Attend light and sound show. Stay overnight at Port Blair.',
          'Ferry to Havelock Island. Relax at Radhanagar Beach. Water sports and sunset view.',
          'Visit Elephant Beach for snorkeling. Explore coral reefs. Return to hotel.',
          'Visit Neil Island (Natural Bridge & Laxmanpur Beach). Return to Port Blair by evening.',
          'Local shopping and departure.',
        ],
      },
      {
        name: 'Ladakh Adventure Expedition',
        destination: 'Leh-Ladakh, Jammu & Kashmir',
        description: 'Embark on a thrilling journey to the "Land of High Passes". Witness stunning landscapes, serene monasteries, and crystal-clear lakes.',
        price: 45000,
        durationDays: 7,
        imageUrl: 'https://images.unsplash.com/photo-1581793745862-91a61fab7d28',
        tripDetails: [
          'Arrive in Leh, acclimatization. Visit Shanti Stupa and Leh Market.',
          'Visit Magnetic Hill, Gurudwara Pathar Sahib, and Indus–Zanskar Confluence.',
          'Drive to Nubra Valley via Khardung La (highest motorable road). Camel ride in Hunder Sand Dunes.',
          'Visit Diskit Monastery. Drive to Pangong Lake (overnight stay).',
          'Explore Pangong Lake. Return to Leh via Chang La Pass.',
          'Visit Hemis and Thiksey Monasteries. Free evening for shopping.',
          'Departure from Leh.',
        ],
      },
      {
        name: 'Kashmir Paradise Tour',
        destination: 'Srinagar, Jammu & Kashmir',
        description: 'Experience "Heaven on Earth" with serene Dal Lake, stunning Mughal Gardens, and the snow-capped peaks of Gulmarg and Pahalgam.',
        price: 40000,
        durationDays: 6,
        imageUrl: 'https://images.unsplash.com/photo-1587899765383-500a2a7813c0',
        tripDetails: [
          'Arrival at Srinagar, Shikara ride on Dal Lake. Check-in to houseboat.',
          'Visit Mughal Gardens: Nishat Bagh, Shalimar Bagh, and Chashme Shahi. Evening at local markets.',
          'Full-day trip to Gulmarg for cable car ride and snow activities.',
          'Visit Pahalgam, Betaab Valley, and Aru Valley. Overnight stay at Pahalgam.',
          'Return to Srinagar. Free time for local shopping.',
          'Departure after breakfast.',
        ],
      },
      {
        name: 'Goa Beach Escape',
        destination: 'Goa, India',
        description: 'Enjoy the sun, sand, and sea with water sports, vibrant nightlife, and a touch of Portuguese heritage.',
        price: 25000,
        durationDays: 4,
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        tripDetails: [
          'Arrive in Goa, check-in at beach resort. Relax at Baga Beach. Explore night markets.',
          'Visit Aguada Fort and Candolim Beach. Water sports and parasailing. Evening beach party.',
          'Explore Old Goa Churches and Latin Quarter. River cruise on Mandovi River. Sunset at Chapora Fort.',
          'Relax and enjoy spa or beach walk. Departure after breakfast.',
        ],
      },
    ]);
    // eslint-disable-next-line no-console
    console.log('Inserted sample packages');
  } else {
    // eslint-disable-next-line no-console
    console.log('Packages already populated');
  }

  process.exit(0);
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
