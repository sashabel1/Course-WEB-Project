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

  // Card alignment classes for alternating effect
  const cardContainer = side === 'left'
    ? 'justify-end pr-[55%] sm:pr-[52%] md:pr-[50%]'
    : 'justify-start pl-[55%] sm:pl-[52%] md:pl-[50%]';
  const cardAlign = side === 'left'
    ? 'text-right items-end'
    : 'text-left items-start';
  const connector = side === 'left'
    ? 'left-1/2 border-l-4'
    : 'right-1/2 border-r-4';

  return (
    <div className={`relative flex w-full ${cardContainer} mb-12 sm:mb-16 md:mb-20 lg:mb-24`}>  
      {/* Connector line from timeline to card */}
      <div className={`absolute top-8 ${connector} h-8 border-[#006A71] dark:border-[#3dd6f3] z-0`} style={{ width: 'calc(50% - 32px)' }} />
      {/* Event Card */}
      <div className={`relative max-w-md w-full flex flex-col ${cardAlign}`}> 
        <button
          className="
            bg-[#F2EFE7] dark:bg-gray-800
            text-[#006A71] dark:text-[#3dd6f3]
            border-2 border-[#006A71] dark:border-[#3dd6f3]
            rounded-lg font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] 
            cursor-pointer mb-3 sm:mb-4 
            px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 
            py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 
            min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px]
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
          <div className="bg-[#f0f0f0] dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 rounded-md shadow-md dark:shadow-none text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-sm sm:max-w-md">
            {summary}
          </div>
        )}
      </div>
      {/* Event Dot - Always centered on the timeline */}
      <div className="absolute left-1/2 top-4 sm:top-5 md:top-6 lg:top-7 xl:top-8 transform -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full border-2 sm:border-4 md:border-[6px] lg:border-[8px] xl:border-[10px] border-[#006A71] dark:border-[#3dd6f3] bg-white dark:bg-gray-800 z-10"></div>
    </div>
  );
};

export default TimelineEvent;
