import React from 'react';
import EventForm from './EventMakerCustomTimeLine';
import TimelineView from './CustomTimelineView';

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
      className="py-2.5 px-5 bg-[#006A71] text-white rounded-md font-semibold text-base cursor-pointer border-0
                 transition-transform duration-300 hover:bg-[#10b2bd] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,106,113,0.3)]"
    >
      Save Timeline
    </button>

    <TimelineView events={events} />
  </>
);

export default NewTimelineEditor;
