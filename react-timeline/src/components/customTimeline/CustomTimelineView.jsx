import React from 'react';

const TimelineView = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="border-l-2 border-gray-700 pl-5">
      {sortedEvents.map((event, index) => (
        <div key={index} className="relative mb-5">

          <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-gray-700 rounded-full"></div>
          
          <div className="font-bold text-gray-600">{event.date}</div>
          
          <div className="mt-1">
            <h4 className="text-lg font-semibold">{event.title}</h4>
            <p className="text-sm text-gray-700">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineView;
