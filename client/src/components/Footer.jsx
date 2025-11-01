import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Developed By</h3>
          <div className="flex justify-center items-center gap-6">
            <a href="https://github.com/Harsh-KH-6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <FaGithub />
              <span>Harsh-KH-6</span>
            </a>
            <a href="https://github.com/Ayushks7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <FaGithub />
              <span>Ayushks7</span>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 mt-4 text-sm text-gray-400">
          <p>&copy; {year} Tourista. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}