import React from 'react';
import EventForm from './EventMakerCustomTimeLine';
import TimelineView from './CustomTimelineView';

/**
 * TimelineEditor component for viewing and editing a custom timeline.
 *
 * Props:
 * - selectedTimeline: timeline data with title and events
 * - newEvent: data for the event being added or edited
 * - onAddEvent: handler to add a new event
 * - onEditTimelineName: handler to edit the timeline title
 * - onChangeNewEvent: handler to update event form data
 * - onSave: handler to save timeline changes
 * - onCancel: handler to cancel editing
 * - onDelete: handler to delete the timeline
 */

const TimelineEditor = ({
  selectedTimeline,
  newEvent,
  onAddEvent,
  onEditTimelineName,
  onChangeNewEvent,
  onSave,
  onCancel,
  onDelete,
}) => (
  <>
    <TimelineView events={selectedTimeline.events} />
    <EventForm
      eventData={newEvent}
      onChange={onChangeNewEvent}
      onSubmit={onAddEvent}
      timelineName={selectedTimeline.title}
      onTimelineNameChange={onEditTimelineName}
      isEditing={true}
    />
    <div className="w-full flex justify-center gap-4 mt-4">
      <button
        type="submit"
        onClick={onSave}
        className="px-4 py-2 bg-[#006A71] dark:bg-blue-600 text-white rounded font-semibold hover:bg-[#10b2bd] dark:hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md transition"
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 bg-[#006A71] dark:bg-blue-600 text-white rounded font-semibold hover:bg-[#10b2bd] dark:hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md transition"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this timeline?")) {
            onDelete();
          }
        }}
        className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded font-semibold hover:bg-red-700 dark:hover:bg-red-800 hover:-translate-y-0.5 hover:shadow-md transition"
      >
        Delete
      </button>
    </div>
  </>
);

export default TimelineEditor;
