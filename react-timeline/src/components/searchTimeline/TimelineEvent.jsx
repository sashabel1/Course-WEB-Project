import React, { useState } from 'react';

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
          className="bg-[#F2EFE7] text-[#006A71] border-2 border-[#006A71] rounded-lg font-bold text-[16px] cursor-pointer mb-1 px-[15px] py-[10px] w-[160px] text-center inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-[#e0ddd4] hover:scale-[1.03]"
          onClick={() => setShowSummary(!showSummary)}
        >
          {date}
        </button>
        {showSummary && (
          <div className="bg-[#f0f0f0] p-2 rounded-md mt-1 shadow-md">
            {summary}
          </div>
        )}
      </div>
      {/* Event Dot */}
      <div
        className={`absolute top-1/2 w-[20px] h-[20px] rounded-full border-[10px] border-[#006A71] bg-white z-[2] transform -translate-y-1/2 ${side === 'left' ? 'left-full -translate-x-1/2' : 'left-0 -translate-x-1/2'}`}
      ></div>
    </div>
  );
};

export default TimelineEvent;
