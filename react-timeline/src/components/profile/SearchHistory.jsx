import React from 'react';

/**
 * SearchHistory component displays a list of recent search terms.
 *
 * Props:
 * - searches: array of search strings
 * - loading: boolean indicating if data is loading
 * - error: error message string (if any)
 * - onSelect: callback triggered when a search term is clicked
 *
 * Features:
 * - Shows loading and error states
 * - Displays message if no searches exist
 * - Responsive tag-like clickable search terms with hover effect
 */

const SearchHistory = ({ searches, loading, error, onSelect }) => (
  <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md mt-8 p-4">
    <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-2 mb-4">
      Your Recent Searches
    </h3>

    {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>}
    {error && <p className="text-center bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-2 rounded">{error}</p>}
    {!loading && !error && searches.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400">No searches yet</p>}

    {!loading && !error && searches.length > 0 && (
      <div className="flex flex-wrap gap-2 justify-center">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSelect && onSelect(search)}
            className="bg-gray-300 dark:bg-gray-700 text-[#006A71] dark:text-gray-100 text-sm px-4 py-2 rounded-full shadow cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            {search}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default SearchHistory;
