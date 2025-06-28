import React from 'react';

/**
 * EventForm component renders a form for adding or editing a timeline event.
 *
 * Props:
 * - eventData: object containing event fields (title, date, description)
 * - onChange: input change handler function
 * - onSubmit: form submit handler function
 * - timelineName: optional timeline name string
 * - onTimelineNameChange: handler for timeline name input changes
 * - isEditing: boolean indicating if the form is in editing mode
 *
 * The form includes inputs for timeline name, event title, date, and description,
 * and a submit button to add or update the event.
 */

const EventForm = ({ eventData, onChange, onSubmit, timelineName, onTimelineNameChange, isEditing }) => (
  <form 
    onSubmit={onSubmit} 
    className="flex flex-col gap-4 mb-6"
  >
    <input
      type="text"
      name="timelineName"
      value={timelineName}
      onChange={onTimelineNameChange}
      placeholder="Timeline Name"
      required
      className={isEditing ? '' : 'outline-none border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded px-3 py-2 text-base'}
      style={isEditing ? { display: 'none' } : {}}
    />

    <input
      type="text"
      name="date"
      value={eventData.date}
      onChange={onChange}
      placeholder="Date (e.g., 1969)"
      required
      className="px-3 py-2 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#006A71] dark:focus:ring-blue-600"
    />

    <input
      type="text"
      name="title"
      value={eventData.title}
      onChange={onChange}
      placeholder="Event Title"
      required
      className="px-3 py-2 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#006A71] dark:focus:ring-blue-600"
    />

    <textarea
      name="description"
      value={eventData.description}
      onChange={onChange}
      placeholder="Event Description"
      rows="3"
      className="px-3 py-2 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#006A71] dark:focus:ring-blue-600"
    />

    <button
      type="submit"
      className="py-2.5 px-5 bg-[#006A71] dark:bg-blue-600 text-white rounded-md font-semibold text-base cursor-pointer border-0
                 transition-transform duration-300 hover:bg-[#10b2bd] dark:hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,106,113,0.3)]"
    >
      {isEditing ? 'Update Event' : 'Add Event'}
    </button>
  </form>
);

export default EventForm;
