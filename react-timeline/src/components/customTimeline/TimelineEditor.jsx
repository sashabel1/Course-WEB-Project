import React from 'react';
import EventForm from './EventForm';
import TimelineView from './TimelineView';

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
    <button onClick={onSave} className="general-button">
      Save Changes
    </button>
    <button onClick={onCancel} className="general-button">
      Cancel
    </button>
  </>
);

export default TimelineEditor;
