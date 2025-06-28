import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

/**
 * Choose Component
 *
 * This component provides a simple navigation interface for users to choose their experience path:
 * - Explore Bubbles: Navigate to the interactive bubble page
 * - Explore Timeline: Navigate to the timeline search page
 * - Create Your Own Timeline: Navigate to the custom timeline creation page
 *
 * Features:
 * - Uses buttons styled as arrows for a clear UX
 * - Uses React Router's useNavigate hook for client-side navigation
 *
 * Hooks used:
 * - useNavigate: For programmatic navigation between routes
 */

const Choose = () => {
  const navigate = useNavigate();

  const goToBubbles = () => navigate('/bubble');
  const goToTimelineSearch = () => navigate('/search');
  const goToCreateTimeline = () => navigate('/custom-timeline');

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] dark:bg-gray-900 font-sans transition-colors duration-300">
      <Header />
      <main className="flex flex-col items-center justify-start pt-20 h-screen flex-1">
        <h1 className="text-[3rem] font-extrabold text-[#006A71] dark:text-gray-100 mb-8 text-center drop-shadow-md">
          Choose Your Timeline Experience
        </h1>
        <div className="flex flex-col items-center gap-6 mt-8">
          <button
            onClick={() => navigate('/search')}
            className="relative inline-flex items-center justify-center h-20 w-[450px] min-w-[200px] bg-[#F2EFE7] dark:bg-gray-800 text-[#006A71] dark:text-gray-100 border-2 border-[#006A71] dark:border-blue-600 font-bold text-[22px] rounded-lg transition-all duration-300 shadow-[0_8px_16px_rgba(0,106,113,0.3)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:-translate-y-[5px] hover:shadow-[0_12px_24px_rgba(0,106,113,0.4)] dark:hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] hover:bg-[#006A71] hover:text-white dark:hover:bg-blue-600 group"
          >
            <span className="flex items-center gap-3">
              Search Timeline
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </button>
          
          <button
            onClick={() => navigate('/bubble')}
            className="relative inline-flex items-center justify-center h-20 w-[450px] min-w-[200px] bg-[#006A71] dark:bg-blue-600 text-white font-bold text-[22px] rounded-lg transition-all duration-300 shadow-[0_8px_16px_rgba(0,106,113,0.3)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:-translate-y-[5px] hover:shadow-[0_12px_24px_rgba(0,106,113,0.4)] dark:hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] group"
          >
            <span className="flex items-center gap-3">
              Bubble Timeline
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </button>
          
          <button
            onClick={() => navigate('/custom-timeline')}
            className="relative inline-flex items-center justify-center h-20 w-[450px] min-w-[200px] bg-[#F2EFE7] dark:bg-gray-800 text-[#006A71] dark:text-gray-100 border-2 border-[#006A71] dark:border-blue-600 font-bold text-[22px] rounded-lg transition-all duration-300 shadow-[0_8px_16px_rgba(0,106,113,0.3)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:-translate-y-[5px] hover:shadow-[0_12px_24px_rgba(0,106,113,0.4)] dark:hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] hover:bg-[#006A71] hover:text-white dark:hover:bg-blue-600 group"
          >
            <span className="flex items-center gap-3">
              Custom Timeline
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Choose;
