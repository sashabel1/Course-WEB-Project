import React from "react";

/**
 * TimelineCard - Alternates left/right for timeline events.
 * Props:
 * - event: event object with Month, Year, and Name of Incident
 * - onClick: function for card click
 * - borderColor: string for card border color
 * - align: 'left' or 'right'
 */
const TimelineCard = ({ event, onClick, borderColor, align = "left" }) => {
  const date = [event.Month, event.Year]
    .filter((val) => val && !["Unknown"].includes(val))
    .join(" ");
  const alignmentClass = align === "right" ? "ml-auto mr-0" : "mr-auto ml-0";
  return (
    <div className={`relative w-1/2 min-w-[200px] border-2 rounded-xl p-4 bg-white dark:bg-gray-800 cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl flex-shrink-0 text-[#371f1f] dark:text-gray-200 mb-8 ${alignmentClass}`}
      style={{ borderColor }}
      onClick={onClick}
    >
      {/* Vertical timeline line */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-gray-600 z-0" style={{height: '100%'}}></span>
      <div className="relative z-10">
        <div className="font-bold mb-2 text-[#555] dark:text-gray-400">{date}</div>
        <div className="text-lg font-semibold">
          {event["Name of Incident"]}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard; 