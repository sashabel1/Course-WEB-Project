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
 */

const TimelineEvent = ({ date, summary, index }) => {
  const [showSummary, setShowSummary] = useState(false);
  const side = index % 2 === 0 ? 'left' : 'right';

  const baseClasses =
    'relative w-1/2 px-10 box-border mb-8'; 
  const leftClasses = 'left-0 text-left';
  const rightClasses = 'left-1/2 text-left';

  return (
    <div className={`${baseClasses} ${side === 'left' ? leftClasses : rightClasses}`}>
      <div className="relative z-[1]">
        <button
          className="bg-[#F2EFE7] dark:bg-gray-700 text-[#006A71] dark:text-gray-100 border-2 border-[#006A71] dark:border-blue-600 rounded-lg font-bold text-[16px] cursor-pointer mb-1 px-[15px] py-[10px] w-[160px] text-center inline-block shadow-md transition-all duration-300 hover:bg-[#e0ddd4] dark:hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg"
          onClick={() => setShowSummary(!showSummary)}
        >
          {date}
        </button>
        {showSummary && (
          <div className="bg-[#f0f0f0] dark:bg-gray-800 p-2 rounded-md mt-1 shadow-md">
            <p className="text-[#333] dark:text-gray-200 text-[14px] leading-[1.4]">{summary}</p>
          </div>
        )}
      </div>
      {/* Event Dot */}
      <div
        className={`absolute top-1/2 w-[20px] h-[20px] rounded-full border-[10px] border-[#006A71] dark:border-blue-600 bg-white dark:bg-gray-700 z-[2] transform -translate-y-1/2 ${side === 'left' ? 'left-full -translate-x-1/2' : 'left-0 -translate-x-1/2'}`}
      ></div>
    </div>
  );
};

export default TimelineEvent;
