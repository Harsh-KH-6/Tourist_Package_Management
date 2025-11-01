import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { http } from '../api/http.js';
import { API } from '../api/urls.js';

// Star Icon for ratings
const StarIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.728c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ArrowLeftIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);


const testimonials = [
  {
    name: 'Priya S.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887',
    review: 'The Kashmir tour was breathtaking! The houseboat stay on Dal Lake was a dream. Everything was perfectly organized by Tourista.',
  },
  {
    name: 'Rohan M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887',
    review: 'An unforgettable adventure in Ladakh. The views from Khardung La were surreal. The guides were fantastic and very knowledgeable.',
  },
  {
    name: 'Anjali K.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961',
    review: 'Our Goa trip was pure bliss. The beaches, the food, the culture... Tourista handled everything flawlessly. Highly recommended!',
  },
  {
    name: 'Vikram R.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887',
    review: 'The Jaipur Heritage Tour was a vibrant journey into history. The local guides provided deep insights into the city\'s culture.',
  },
  {
    name: 'Sneha P.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070',
    review: 'Coorg was a refreshing escape into nature. The coffee plantation tour was the highlight of our trip. Thank you for the wonderful experience!',
  },
  {
    name: 'Arjun D.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887',
    review: 'Exploring the Andaman islands was incredible. The snorkeling at Elephant Beach is a must-do. Great arrangements by the team.',
  },
];

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    async function loadFeaturedPackages() {
      try {
        const res = await http.get(API.PACKAGES);
        // Show the first 3 packages as featured
        setPackages((res.data.data || []).slice(0, 3));
      } catch (e) {
        // It's okay to fail silently on the homepage
        // eslint-disable-next-line no-console
        console.error('Failed to load featured packages', e);
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedPackages();
  }, []);

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070')" }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Explore Your Next Adventure</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Discover curated travel packages for every kind of traveler. Your dream vacation is just a click away.
          </p>
          <Link
            to="/packages"
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
          >Browse Packages</Link>
        </div>
      </div>

      {/* Featured Packages Section */}
      {!loading && packages.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Tours</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => (
                <div key={p._id} className="bg-white border rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-gray-800">{p.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{p.destination} • {p.durationDays} days</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-blue-600">₹{p.price}</span>
                      <Link to="/packages" className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/packages" className="px-6 py-3 rounded-md bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-colors">
                View All Packages
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Travelers Say</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center transition-opacity duration-500" key={currentTestimonialIndex}>
              <img
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                src={testimonials[currentTestimonialIndex].avatar}
                alt={testimonials[currentTestimonialIndex].name}
              />
              <p className="text-gray-600 leading-relaxed mb-4">&ldquo;{testimonials[currentTestimonialIndex].review}&rdquo;</p>
              <p className="font-semibold text-gray-800">{testimonials[currentTestimonialIndex].name}</p>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
              </div>
            </div>
            <button
              onClick={handlePrevTestimonial}
              className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
              aria-label="Previous testimonial"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={handleNextTestimonial}
              className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
              aria-label="Next testimonial"
            >
              <ArrowRightIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
