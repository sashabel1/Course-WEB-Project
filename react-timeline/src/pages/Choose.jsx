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
        <h1 className="text-[3rem] font-extrabold text-[#006A71] dark:text-[#3dd6f3] mb-8 text-center drop-shadow-md">
          Choose Your Experience
        </h1>
        <div className="flex flex-col items-center gap-7">
          <button
            onClick={goToBubbles}
            className="relative inline-flex items-center justify-center h-20 w-[450px] min-w-[200px]
              bg-[#F2EFE7] dark:bg-gray-800 text-[#006A71] dark:text-[#3dd6f3] border-2 border-[#006A71] dark:border-[#3dd6f3]
              font-bold text-[22px] rounded-lg transition-all duration-300
              hover:bg-[#6db3b7] dark:hover:bg-[#0f7389] hover:shadow-lg hover:-translate-y-1
              after:content-[''] after:absolute after:top-0 after:-right-[43px]
              after:border-t-[40px] after:border-b-[40px] after:border-l-[40px]
              after:border-transparent after:border-l-[#006A71] dark:after:border-l-[#3dd6f3] z-10"
          >
            EXPLORE BUBBLES
          </button>

          <button
            onClick={goToTimelineSearch}
            className="relative inline-flex items-center justify-center h-20 w-[450px] min-w-[200px]
              bg-[#006A71] dark:bg-[#3dd6f3] text-white dark:text-gray-900
              font-bold text-[22px] rounded-lg transition-all duration-300
              hover:bg-[#6db3b7] dark:hover:bg-[#66c9f4] hover:shadow-lg hover:-translate-y-1
              before:content-[''] before:absolute before:top-0 before:-left-[43px]
              before:border-t-[40px] before:border-b-[40px] before:border-r-[40px]
              before:border-transparent before:border-r-[#006A71] dark:before:border-r-[#3dd6f3] z-10 pl-[60px]"
          >
            EXPLORE TIMELINE
          </button>

          <button
            onClick={goToCreateTimeline}
            className="relative inline-flex items-center justify-center h-20 w-[450px] min-w-[200px]
              bg-[#F2EFE7] dark:bg-gray-800 text-[#006A71] dark:text-[#3dd6f3] border-2 border-[#006A71] dark:border-[#3dd6f3]
              font-bold text-[22px] rounded-lg transition-all duration-300
              hover:bg-[#6db3b7] dark:hover:bg-[#0f7389] hover:shadow-lg hover:-translate-y-1
              after:content-[''] after:absolute after:top-0 after:-right-[43px]
              after:border-t-[40px] after:border-b-[40px] after:border-l-[40px]
              after:border-transparent after:border-l-[#006A71] dark:after:border-l-[#3dd6f3] z-10"
          >
            CREATE YOUR OWN TIMELINE
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Choose;
