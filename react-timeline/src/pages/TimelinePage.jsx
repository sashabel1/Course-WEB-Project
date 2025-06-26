// TimelinePage.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useNavigate } from 'react-router-dom';

/**
 * TimelinePage Component
 *
 * Displays a dynamic timeline of historical events based on a selected topic and type.
 * The topic and type are stored in localStorage and fetched on component mount.
 *
 * Features:
 * - Loads timeline data for a specific topic and type from the backend
 * - Displays event details in a modal with additional metadata
 * - Provides external links to 'On This Day' pages based on the event date
 * - Offers quick navigation to a search page for any event
 *
 * Hooks used:
 * - useState: Manages component state (data, sorting, selection, color)
 * - useEffect: Triggers data fetching and initialization logic on mount
 *
 * External dependencies:
 * - LocalStorage: Reads topic and type selected from previous page
 * - Backend API: `/api/dataset` endpoint for timeline data
 * - onthisday.com: Generates links to external date-based history pages
 */

const TimelinePage = () => {
  const [topic, setTopic] = useState(null);
  const [type, setType] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [color, setColor] = useState("#2563eb");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTopic = localStorage.getItem("selectedTopic");
    const storedType = localStorage.getItem("selectedType");

    if (!storedTopic || !storedType) {
      alert("No topic or type selected! Redirecting to topics page.");
      window.location.href = "/"; 
      return;
    }

    setTopic(storedTopic);
    setType(storedType);

    setLoading(true);

    fetch(`${process.env.REACT_APP_API}/api/dataset?topic=${encodeURIComponent(storedTopic)}&type=${encodeURIComponent(storedType)}`)

      .then((res) => {
        if (!res.ok) {
          console.error("Server responded with an error:", res.statusText);
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTimeline(data);
      })
      .catch((error) => {
        console.error("Failed to fetch timeline data:", error);
        setTimeline([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSort = () => setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  const handleColorChange = (e) => setColor(e.target.value);

  const sortedTimeline = [...timeline].sort((a, b) => {
    const aDate = new Date(`${a.Month || "January"} ${a.Date || 1}, ${a.Year}`);
    const bDate = new Date(`${b.Month || "January"} ${b.Date || 1}, ${b.Year}`);
    return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
  });

  if (!topic || !type) {
    return <div className="text-center p-6">Loading...</div>;
  }

  const generateOnThisDayLink = (event) => {
  const day = event.Date?.toString().trim().toLowerCase();
  const month = event.Month?.toString().trim().toLowerCase();
  const year = event.Year?.toString().trim();

  const validMonths = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  const isValidMonth = month && validMonths.includes(month);

  const isValidDay = day && !isNaN(day) && Number(day) >= 1 && Number(day) <= 31;

    if (year && isValidMonth && isValidDay) {
      // year+month+day
      return `https://www.onthisday.com/date/${year}/${month}/${day}`;
    } else if (year && isValidMonth) {
      // year+month
      return `https://www.onthisday.com/date/${year}/${month}`;
    } else if (year) {
      // year only
      return `https://www.onthisday.com/date/${year}`;
    } else if (isValidMonth && isValidDay) {
      // month+day
      return `https://www.onthisday.com/day/${month}/${day}`;
    } else {
      // default to the main page
      return "https://www.onthisday.com";
    }
  };



  return (
  <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7]">
    <Header />
    <div className="relative w-full rounded-2xl flex-1 px-4 mt-8">
      <div className=""></div>
      <h1 className="text-5xl font-extrabold text-[#006A71] mb-8 text-center drop-shadow-md">
        {topic} Timeline
      </h1>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={handleSort}
          className="px-5 py-2 text-white bg-[#006A71] rounded-md border-none cursor-pointer font-semibold text-base hover:bg-[#10b2bd] hover:-translate-y-0.5 hover:shadow-md transition"
        >
          {sortOrder === "asc" ? "Past → Future" : "Future → Past"}
        </button>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          title="Pick timeline color"
        />
      </div>

      {/* Timeline */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex overflow-x-auto py-4 px-4 gap-4 scroll-smooth">
          {sortedTimeline.map((event, idx) => (
            <div
              key={idx}
              className="min-w-[200px] border-2 rounded-xl p-4 bg-white cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl flex-shrink-0"
              style={{ borderColor: color }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="font-bold mb-2 text-[#555]">
                {[event.Month, event.Year]
                  .filter(val => val !== "Unknown" && val !== "לא ידוע")
                  .join(" ")}
              </div>
              <div className="text-lg font-semibold text-[#371f1f]">
                {event["Name of Incident"]}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-[1000]"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-[#F2EFE7] rounded-xl border-4 border-[#006A71] p-4 w-[90%] max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-4 text-[#0e868f]">{selectedEvent["Name of Incident"]}</h2>
            <p><strong>Date:</strong>{" "}
              {[selectedEvent.Date, selectedEvent.Month, selectedEvent.Year]
                .filter(val => val !== "Unknown")
                .join(" ") || "Unknown"}
            </p>
            <p><strong>Country:</strong> {selectedEvent.Country}</p>
            <p><strong>Place:</strong> {selectedEvent["Place Name"]}</p>
            <p><strong>Impact:</strong> {selectedEvent.Impact}</p>
            <p><strong>Affected Population:</strong> {selectedEvent["Affected Population"]}</p>
            <p><strong>Important Person/Group Responsible:</strong> {selectedEvent["Important Person/Group Responsible"]}</p>
            <p><strong>Outcome:</strong> {selectedEvent.Outcome}</p>

            <div className="flex gap-3 flex-wrap mt-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 text-white bg-[#006A71] rounded-md font-semibold hover:bg-[#1769aa] transition"
              >
                Close
              </button>
              {(selectedEvent.Year || selectedEvent.Month || selectedEvent.Date) && (
                <a
                  href={generateOnThisDayLink(selectedEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 text-white bg-[#006A71] rounded-md font-semibold hover:bg-[#1769aa] transition"
                >
                  View on OnThisDate
                </a>
              )}
              <button
                className="px-5 py-2 text-white bg-[#006A71] rounded-md font-semibold hover:bg-[#1769aa] transition"
                onClick={() =>
                  navigate(`/search?query=${encodeURIComponent(selectedEvent["Name of Incident"])}`)
                }
              >
                Search for more
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
  </div>
);
}

export default TimelinePage;
