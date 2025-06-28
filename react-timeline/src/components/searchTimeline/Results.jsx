import TimelineEvent from './TimelineEvent';
import TimelineImages from './TimelineImages';

/**
 * Results component displays search results including Wikipedia summary,
 * timeline events, and related side images.
 *
 * Props:
 * - query: Search term string
 * - startYear: Filter start year (optional)
 * - endYear: Filter end year (optional)
 * - fullText: Wikipedia summary text
 * - timelineEvents: Array of timeline event objects with date and summary
 * - images: Array of images (not used directly here)
 * - getSideImages: Function to retrieve images for left/right side panels
 *
 * Features:
 * - Shows Wikipedia summary in a collapsible section
 * - Renders timeline events centered with a vertical line
 * - Displays side image panels on left and right
 * - Provides user feedback when no results or timeline events found
 */

export default function Results({
  query,
  startYear,
  endYear,
  fullText,
  timelineEvents,
  images,
  getSideImages
}) {
  return (
    <div className="flex justify-center items-start gap-[30px] p-5 w-full max-w-[1400px] box-border flex-wrap lg:flex-nowrap">
      <div className="w-[300px] max-w-[300px] flex flex-col gap-5">
        <TimelineImages images={getSideImages('left')} />
      </div>

      <div className="flex-1 min-w-0">
        {fullText ? (
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-700 box-border">
            <h2 className="text-[2rem] font-bold text-[#006A71] dark:text-gray-100 mb-4 text-center">
              {`Results for "${query}"`}
              {(startYear || endYear) && (
                <> from: {startYear || '1900'} to: {endYear || '2024'}</>
              )}
            </h2>

            <details className="my-4 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-[#f9f9f9] dark:bg-gray-700">
              <summary className="cursor-pointer font-bold text-[#0077cc] dark:text-blue-400 hover:underline">
                Show Wikipedia summary
              </summary>
              <p className="mt-2 leading-6 whitespace-pre-wrap text-gray-700 dark:text-gray-300 max-h-[240px] overflow-y-auto border border-gray-300 dark:border-gray-600 p-3 rounded bg-[#f9fafb] dark:bg-gray-800">
                {fullText}
              </p>
            </details>

            {timelineEvents.length > 0 ? (
              <div className="relative px-[50px] py-5">
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-[#006A71] dark:bg-blue-600 -translate-x-1/2 z-0" />
                {timelineEvents.map((event, index) => (
                  <TimelineEvent
                    key={index}
                    date={event.date}
                    summary={event.summary}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-xl text-red-600 dark:text-red-400 mt-8">
                No specific timeline events found for "{query}" in the extract.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-xl text-red-600 dark:text-red-400 mt-8">
            No data found on Wikipedia for "{query}". Please try a different search term.
          </p>
        )}
      </div>

      <div className="w-[300px] max-w-[300px] flex flex-col gap-5">
        <TimelineImages images={getSideImages('right')} />
      </div>
    </div>
  );
}
