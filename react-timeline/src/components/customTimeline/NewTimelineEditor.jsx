
import React from 'react';
import EventForm from './EventForm';
import TimelineView from './TimelineView';

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
    <button onClick={onSave} className="btn">
      Save Timeline
    </button>
    <TimelineView events={events} />
  </>
);

export default NewTimelineEditor;
