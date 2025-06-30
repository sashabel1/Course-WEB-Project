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
 * - Fully responsive design for all device sizes
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
    <div className="flex flex-col lg:flex-row justify-center items-start gap-4 sm:gap-6 lg:gap-[30px] p-2 sm:p-3 md:p-5 w-full max-w-[1400px] box-border">
      {/* Left Images - Hidden on mobile, shown on larger screens */}
      <div className="hidden lg:flex w-[300px] max-w-[300px] flex-col gap-5">
        <TimelineImages images={getSideImages('left')} />
      </div>

      <div className="flex-1 min-w-0 w-full">
        {fullText ? (
          <div className="
            w-full p-4 sm:p-5 md:p-6 rounded-lg 
            bg-white dark:bg-gray-800 
            shadow-md dark:shadow-[0_8px_16px_rgba(0,106,113,0.2)] 
            border border-gray-300 dark:border-[#006A71] 
            box-border
          ">
            <h2 className="text-xl sm:text-2xl md:text-[2rem] font-bold text-[#006A71] dark:text-[#3dd6f3] mb-3 sm:mb-4 text-center">
              {`Results for "${query}"`}
              {(startYear || endYear) && (
                <> from: {startYear || '1900'} to: {endYear || '2024'}</>
              )}
            </h2>

            <details className="
              my-3 sm:my-4 border border-[#006A71] dark:border-[#3dd6f3] rounded-lg p-2 
              bg-[#F2EFE7] dark:bg-[#004a4f]
            ">
              <summary className="
                cursor-pointer font-bold text-[#006A71] dark:text-[#3dd6f3] hover:underline text-sm sm:text-base
              ">
                Show Wikipedia summary
              </summary>
              <p className="
                mt-2 leading-6 whitespace-pre-wrap text-gray-800 dark:text-gray-300 max-h-[240px] overflow-y-auto 
                border border-[#006A71] dark:border-[#3dd6f3] p-3 rounded bg-white dark:bg-[#003739] text-sm sm:text-base
              ">
                {fullText}
              </p>
            </details>

            {timelineEvents.length > 0 ? (
              <div className="relative px-4 sm:px-8 md:px-[50px] py-3 sm:py-4 md:py-5">
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-[#006A71] dark:bg-[#3dd6f3] -translate-x-1/2 z-0" />
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
              <p className="text-center text-lg sm:text-xl text-red-600 dark:text-red-400 mt-6 sm:mt-8">
                No specific timeline events found for "{query}" in the extract.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-lg sm:text-xl text-red-600 dark:text-red-400 mt-6 sm:mt-8">
            No data found on Wikipedia for "{query}". Please try a different search term.
          </p>
        )}
      </div>

      {/* Right Images - Hidden on mobile, shown on larger screens */}
      <div className="hidden lg:flex w-[300px] max-w-[300px] flex-col gap-5">
        <TimelineImages images={getSideImages('right')} />
      </div>

      {/* Mobile Images - Shown only on mobile/tablet, below content */}
      <div className="lg:hidden w-full flex flex-col gap-4 sm:gap-5">
        <div className="w-full">
          <TimelineImages images={getSideImages('left')} />
        </div>
        <div className="w-full">
          <TimelineImages images={getSideImages('right')} />
        </div>
      </div>
    </div>
  );
}
