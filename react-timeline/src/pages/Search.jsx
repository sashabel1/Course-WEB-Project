import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SearchBar from '../components/searchTimeline/searchBar';
import Results from '../components/searchTimeline/Results';
import Loading from '../components/searchTimeline/Loading';
import ErrorBox from '../components/searchTimeline/ErrorBox';
import '../style/pagestyle/Search.css';

/**
 * Search page component for timeline application.
 * Handles search queries, year range, fetches timeline data, and displays results.
 */
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for search query, results, filters, and UI status
  const [query, setQuery] = useState('');
  const [fullText, setFullText] = useState('');
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const userId = localStorage.getItem('userId');

  // Sync state with URL params when location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryFromUrl = params.get('query');
    const start = params.get('startYear') || '';
    const end = params.get('endYear') || '';

    if (queryFromUrl) {
      setQuery(queryFromUrl);
      setStartYear(start);
      setEndYear(end);
    }
  }, [location.search]);

  // Fetch timeline data when query or year filters change
  useEffect(() => {
    if (!query) {
      setFullText('');
      setTimelineEvents([]);
      setImages([]);
      setError(null);
      return;
    }

    const fetchTimelineData = async () => {
      setLoading(true);
      setError(null);
      setFullText('');
      setTimelineEvents([]);
      setImages([]);

      try {
        // Require user authentication
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          navigate('/login');
          return;
        }

        // Build API URL with query and filters
        const apiBase = process.env.REACT_APP_API;
        const searchUrl = new URL(`${apiBase}/search`);
        searchUrl.searchParams.append('q', query);
        searchUrl.searchParams.append('startYear', startYear);
        searchUrl.searchParams.append('endYear', endYear);

        const searchResponse = await fetch(searchUrl, {
          headers: { 'user-email': userEmail }
        });

        // Redirect to login if unauthorized
        if (searchResponse.status === 401) {
          navigate('/login');
          return;
        }

        // Throw error for other failed responses
        if (!searchResponse.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await searchResponse.json();

        // Save search to user's history if logged in
        if (userId) {
          try {
            await fetch(`${apiBase}/api/users/search-history`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, query }),
            });
          } catch (historyError) {
            // Log but don't block UI
            console.error('Failed to save to search history:', historyError);
          }
        }

        setFullText(data.extract);
        setTimelineEvents(data.timelineEvents || []);
        setImages(data.images || []);
      } catch (err) {
        // Show error and reset results
        console.error('Fetch error:', err);
        setError(`Failed to load timeline: ${err.message}`);
        setFullText('');
        setTimelineEvents([]);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, [query, startYear, endYear, navigate, userId]);

  /**
   * Returns images for the left or right side of the timeline.
   * @param {'left'|'right'} side
   */
  const getSideImages = useCallback(
    (side) => {
      const filteredImages = images.filter(img => img && img.src);
      if (!filteredImages.length) return [];
      const half = Math.ceil(filteredImages.length / 2);
      return side === 'left'
        ? filteredImages.slice(0, half)
        : filteredImages.slice(half);
    },
    [images]
  );

  // Update URL with new search params (triggers new search)
  const handleSearch = useCallback(
    ({ query: q, startYear: s, endYear: e }) => {
      navigate(
        `/search?query=${encodeURIComponent(q)}&startYear=${encodeURIComponent(s)}&endYear=${encodeURIComponent(e)}`
      );
    },
    [navigate]
  );

  return (
    <div className="app-container">
      <Header />
      <h1 className="app-title">Timeline Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && query && <Loading query={query} />}
      {error && <ErrorBox error={error} />}
      {!loading && !error && query && (
        <Results
          query={query}
          startYear={startYear}
          endYear={endYear}
          fullText={fullText}
          timelineEvents={timelineEvents}
          images={images}
          getSideImages={getSideImages}
        />
      )}
      <Footer />
    </div>
  );
};

export default Search;
