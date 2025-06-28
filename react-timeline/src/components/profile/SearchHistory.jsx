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
  <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md mt-8 p-4">
    <h3 className="text-xl font-semibold text-center text-gray-800 border-b pb-2 mb-4">
      Recent Searches ({searches.length})
    </h3>

    {loading ? (
      <p className="text-center text-gray-500">Loading...</p>
    ) : error ? (
      <p className="text-center bg-red-100 text-red-700 p-2 rounded">{error}</p>
    ) : searches.length === 0 ? (
      <p className="text-center text-gray-500">No searches yet</p>
    ) : (
      <div className="flex flex-wrap gap-2 justify-center">
        {searches.map((term, index) => (
          <div
            key={index}
            onClick={() => onSelect && onSelect(term)}
            className="bg-gray-300 text-[#006A71] text-sm px-4 py-2 rounded-full shadow cursor-pointer hover:bg-gray-400 transition"
          >
            {term}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default SearchHistory;
