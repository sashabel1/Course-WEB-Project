import React from 'react';

/**
 * TimelineList component displays a list of user timelines.
 *
 * Props:
 * - timelines: array of timeline objects to display
 * - onSelect: callback invoked with the selected timeline on button click
 *
 * Renders a message if no timelines are available.
 */

const TimelineList = ({ timelines, onSelect }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-[#006A71] mb-2">Your Timelines:</h3>
    {timelines.length === 0 ? (
      <p className="text-gray-600">No timelines found.</p>
    ) : (
      <ul className="flex flex-row gap-2 flex-wrap pb-5">
        {timelines.map((tl) => (
          <li key={tl._id}>
            <button
              onClick={() => onSelect(tl)}
              className="px-4 py-2 bg-[#006A71] text-white rounded font-semibold text-base cursor-pointer transition hover:bg-[#10b2bd] hover:-translate-y-0.5 hover:shadow-md"
            >
              {tl.title}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default TimelineList;