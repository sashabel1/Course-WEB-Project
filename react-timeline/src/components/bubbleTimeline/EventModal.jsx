import { useNavigate } from "react-router-dom";

/**
 * generateOnThisDayLink - Generates a URL to the 'On This Day' website
 * based on available date information from an event object.
 *
 * @param {object} event - Event containing Date, Month, and Year fields.
 * @returns {string} URL pointing to the relevant 'On This Day' page.
 */
const generateOnThisDayLink = ({ Date: day, Month: month, Year: year }) => {
  const d = day?.toString().trim().toLowerCase();
  const m = month?.toString().trim().toLowerCase();
  const y = year?.toString().trim();

  const validMonths = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  const isValidMonth = m && validMonths.includes(m);
  const isValidDay = d && !isNaN(d) && +d >= 1 && +d <= 31;

  if (y && isValidMonth && isValidDay) return `https://www.onthisday.com/date/${y}/${m}/${d}`;
  if (y && isValidMonth) return `https://www.onthisday.com/date/${y}/${m}`;
  if (y) return `https://www.onthisday.com/date/${y}`;
  if (isValidMonth && isValidDay) return `https://www.onthisday.com/day/${m}/${d}`;
  return "https://www.onthisday.com";
};

/**
 * EventModal - Modal component displaying detailed information about a timeline event.
 *
 * Props:
 * - event (object): Event data with detailed properties like date, place, impact, etc.
 * - onClose (function): Callback to close the modal.
 *
 * Features:
 * - Displays event details including date, location, impact, and key persons.
 * - Provides external link to 'On This Day' based on event date.
 * - Allows navigation to a search page for more related information.
 * - Modal closes when clicking outside content or using the Close button.
 */

const EventModal = ({ event, onClose }) => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-[#F2EFE7] rounded-xl border-4 border-[#006A71] p-4 w-[90%] max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4 text-[#0e868f]">{event["Name of Incident"]}</h2>
        <p><strong>Date:</strong> {[event.Date, event.Month, event.Year].filter(val => val !== "Unknown").join(" ") || "Unknown"}</p>
        <p><strong>Country:</strong> {event.Country}</p>
        <p><strong>Place:</strong> {event["Place Name"]}</p>
        <p><strong>Impact:</strong> {event.Impact}</p>
        <p><strong>Affected Population:</strong> {event["Affected Population"]}</p>
        <p><strong>Important Person/Group Responsible:</strong> {event["Important Person/Group Responsible"]}</p>
        <p><strong>Outcome:</strong> {event.Outcome}</p>

        <div className="flex gap-3 flex-wrap mt-4">
          <button onClick={onClose} className="px-5 py-2 text-white bg-[#006A71] rounded-md font-semibold hover:bg-[#1769aa] transition">Close</button>
          {(event.Year || event.Month || event.Date) && (
            <a
              href={generateOnThisDayLink(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-white bg-[#006A71] rounded-md font-semibold hover:bg-[#1769aa] transition"
            >
              View on OnThisDay
            </a>
          )}
          <button
            onClick={() => navigate(`/search?query=${encodeURIComponent(event["Name of Incident"])}`)}
            className="px-5 py-2 text-white bg-[#006A71] rounded-md font-semibold hover:bg-[#1769aa] transition"
          >
            Search for more
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
