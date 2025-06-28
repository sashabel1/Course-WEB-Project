import React from 'react';

export default function Loading({ query }) {
  return (
    <div className="flex flex-col items-center mt-8 text-center">
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
        Searching for: <span className="text-teal-700 dark:text-teal-400 font-semibold">{query}</span>
      </p>
      <p className="text-xl text-gray-500 dark:text-gray-400 animate-pulse">Loading timeline...</p>
    </div>
  );
}
