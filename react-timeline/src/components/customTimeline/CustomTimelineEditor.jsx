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
 */

const TimelineEditor = ({
  selectedTimeline,
  newEvent,
  onAddEvent,
  onEditTimelineName,
  onChangeNewEvent,
  onSave,
  onCancel,
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
    <div className="flex justify-center gap-4 mt-4">
      <button
        type="submit"
        onClick={onSave}
        className="px-4 py-2 bg-[#006A71] text-white rounded font-semibold hover:bg-[#10b2bd] hover:-translate-y-0.5 hover:shadow-md transition"
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 bg-[#006A71] text-white rounded font-semibold hover:bg-[#10b2bd] hover:-translate-y-0.5 hover:shadow-md transition"
      >
        Cancel
      </button>
    </div>
  </>
);

export default TimelineEditor;
