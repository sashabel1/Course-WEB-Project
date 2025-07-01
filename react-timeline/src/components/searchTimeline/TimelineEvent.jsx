import React, { useState } from 'react';

/**
 * TimelineEvent component renders a single event on a timeline.
 * 
 * Props:
 * - date: string representing the event date
 * - summary: string with event details, shown on toggle
 * - index: number used to alternate event alignment (left/right)
 * 
 * Behavior:
 * - Alternates event position between left and right sides based on index
 * - Displays date as a clickable button that toggles visibility of the summary
 * - Shows a styled dot marker aligned with the event position on the timeline
 * - Fully responsive design for all device sizes
 */

const TimelineEvent = ({ date, summary, index }) => {
  const [showSummary, setShowSummary] = useState(false);
  const side = index % 2 === 0 ? 'left' : 'right';

  const baseClasses =
    'relative w-full sm:w-1/2 px-2 sm:px-4 md:px-10 lg:px-12 xl:px-16 box-border mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24'; 
  const leftClasses = 'sm:left-0 text-left';
  const rightClasses = 'sm:left-1/2 text-left';

  return (
    <div className={`${baseClasses} ${side === 'left' ? leftClasses : rightClasses}`}>
      <div className="relative z-[1]">
        <button
          className="
            bg-[#F2EFE7] dark:bg-gray-800
            text-[#006A71] dark:text-[#3dd6f3]
            border-2 border-[#006A71] dark:border-[#3dd6f3]
            rounded-lg font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] cursor-pointer mb-2 sm:mb-3 
            px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 
            py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 
            w-full sm:w-[140px] md:w-[180px] lg:w-[200px] xl:w-[220px] text-center inline-block
            shadow-md dark:shadow-none
            transition-all duration-300 ease-in-out
            hover:bg-[#e0ddd4] dark:hover:bg-[#0f7389]
            hover:scale-[1.03]
          "
          onClick={() => setShowSummary(!showSummary)}
        >
          {date}
        </button>
        {showSummary && (
          <div className="bg-[#f0f0f0] dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 rounded-md mt-2 sm:mt-3 shadow-md dark:shadow-none text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            {summary}
          </div>
        )}
      </div>
      {/* Event Dot */}
      <div
        className={`
          absolute top-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full 
          border-2 sm:border-4 md:border-[6px] lg:border-[8px] xl:border-[10px] border-[#006A71] dark:border-[#3dd6f3] 
          bg-white dark:bg-gray-800 
          z-[2] transform -translate-y-1/2 
          ${side === 'left' ? 'left-full -translate-x-1/2' : 'left-0 -translate-x-1/2'}
        `}
      ></div>
    </div>
  );
};

export default TimelineEvent;
