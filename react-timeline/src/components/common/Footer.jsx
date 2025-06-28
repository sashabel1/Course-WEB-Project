import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/componentsStyle/Footer.css';

function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-3 text-[#F2EFE7] dark:text-gray-100">About HistoryFlow</h3>
            <p className="text-sm text-[#a8d0d6] dark:text-gray-400">
              Explore history through interactive timelines. Discover events, create custom timelines, and learn about the past in an engaging way.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-3 text-[#F2EFE7] dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/search')}
                  className="text-sm text-[#a8d0d6] dark:text-gray-400 hover:text-[#F2EFE7] dark:hover:text-gray-200 transition-colors"
                >
                  Search Timeline
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/bubble')}
                  className="text-sm text-[#a8d0d6] dark:text-gray-400 hover:text-[#F2EFE7] dark:hover:text-gray-200 transition-colors"
                >
                  Bubble Timeline
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/custom-timeline')}
                  className="text-sm text-[#a8d0d6] dark:text-gray-400 hover:text-[#F2EFE7] dark:hover:text-gray-200 transition-colors"
                >
                  Custom Timeline
                </button>
              </li>
            </ul>
          </div>

          {/* Contact/Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-3 text-[#F2EFE7] dark:text-gray-100">Connect</h3>
            <p className="text-sm text-[#a8d0d6] dark:text-gray-400 mb-2">
              Made with ❤️ for history enthusiasts
            </p>
            <p className="text-sm text-[#a8d0d6] dark:text-gray-400">
              Learn • Explore • Create
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#a8d0d6] dark:border-gray-700 pt-4 pb-4 text-center">
          <p className="text-sm text-[#a8d0d6] dark:text-gray-400">
            © {currentYear} HistoryFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

