import React from 'react';
import EventForm from './EventMakerCustomTimeLine';
import TimelineView from './CustomTimelineView';

/**
 * NewTimelineEditor component manages the creation of a new timeline.
 *
 * Props:
 * - timelineName: current name of the new timeline
 * - newEvent: object representing the event being created
 * - events: array of existing events in the timeline
 * - onTimelineNameChange: handler for changes to the timeline name input
 * - onChangeNewEvent: handler for input changes in the new event form
 * - onAddEvent: callback for adding a new event to the timeline
 * - onSave: callback to save the entire timeline
 *
 * Renders the event creation form, a save button, and the list of current events.
 */

const NewTimelineEditor = ({
  timelineName,
  newEvent,
  events,
  onTimelineNameChange,
  onChangeNewEvent,
  onAddEvent,
  onSave,
}) => (
  <>
    <EventForm
      eventData={newEvent}
      onChange={onChangeNewEvent}
      onSubmit={onAddEvent}
      timelineName={timelineName}
      onTimelineNameChange={onTimelineNameChange}
      isEditing={false}
    />

    <button
      onClick={onSave}
      className="py-2.5 px-5 bg-[#006A71] dark:bg-blue-600 text-white rounded-md font-semibold text-base cursor-pointer border-0
                 transition-transform duration-300 hover:bg-[#10b2bd] dark:hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,106,113,0.3)]"
    >
      Save Timeline
    </button>

    <TimelineView events={events} />
  </>
);

export default NewTimelineEditor;
