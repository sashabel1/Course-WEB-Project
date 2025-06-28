import React, { useState } from 'react';
import useSearchHistory from '../../hooks/useSearchHistory';

/**
 * SearchBar component provides a search input with autocomplete suggestions
 * based on the user's previous search history, plus optional year range filters.
 *
 * Props:
 * - onSearch: function called with { query, startYear, endYear } when search is submitted
 *
 * Features:
 * - Retrieves user search history from custom hook (uses localStorage userId)
 * - Filters suggestions matching input prefix (case-insensitive)
 * - Shows suggestions dropdown; clicking a suggestion triggers search
 * - Allows optional input of start and end year filters
 * - Handles form submission via Enter key or Search button
 */

function SearchBar({ onSearch }) {
  const userId = localStorage.getItem('userId');
  const { history: searchHistory } = useSearchHistory(userId);

  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const fetchSuggestions = (input) => {
    if (!userId || !input.trim()) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = searchHistory.filter(historyTerm =>
      historyTerm.toLowerCase().startsWith(input.toLowerCase()) &&
      historyTerm.toLowerCase() !== input.toLowerCase()
    );
    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    fetchSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setTerm(suggestion);
    setShowSuggestions(false);
    onSearch({
      query: suggestion,
      startYear: startYear.trim(),
      endYear: endYear.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    setShowSuggestions(false);
    onSearch({
      query: term.trim(),
      startYear: startYear.trim(),
      endYear: endYear.trim()
    });
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input
            type="text"
            value={term}
            onChange={handleInputChange}
            placeholder="Search for a topic..."
            autoComplete="off"
            className="w-full p-2 text-[20px] border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded transition-colors"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded z-50 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400">
              <div className="flex gap-2 p-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer text-[18px] whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-4">
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            placeholder="Start Year"
            className="flex-1 p-2 text-[18px] border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded transition-colors"
          />
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            placeholder="End Year"
            className="flex-1 p-2 text-[18px] border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded transition-colors"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2 text-white bg-[#006A71] dark:bg-blue-600 rounded font-semibold text-base cursor-pointer transition hover:bg-[#10b2bd] dark:hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
