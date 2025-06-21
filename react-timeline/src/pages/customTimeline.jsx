import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TimelineList from '../components/customTimeline/TimelineList';
import TimelineEditor from '../components/customTimeline/TimelineEditor';
import NewTimelineEditor from '../components/customTimeline/NewTimelineEditor';
import '../style/pagestyle/customTimeline.css';

const CustomTimeline = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [timelineName, setTimelineName] = useState('');
  const [timelines, setTimelines] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(null);

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) return;

    async function fetchTimelines() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/user/${userEmail}`);
        const data = await res.json();
        setTimelines(data);
      } catch (err) {
        console.error('Failed to fetch timelines:', err);
      }
    }
    fetchTimelines();
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    if (selectedTimeline) {
      const updatedEvents = [...selectedTimeline.events, newEvent];
      setSelectedTimeline({ ...selectedTimeline, events: updatedEvents });
    } else {
      setEvents((prev) => [...prev, newEvent]);
    }
    setNewEvent({ title: '', date: '', description: '' });
  };

  const fetchAndSetTimelines = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/user/${userEmail}`);
      const data = await res.json();
      setTimelines(data);
    } catch (err) {
      console.error('Failed to fetch timelines:', err);
    }
  };

  const handleSaveNewTimeline = async () => {
    if (!timelineName || events.length === 0) {
      alert('Please enter a name and add at least one event.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userEmail, title: timelineName, events }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Timeline saved successfully!');
        setTimelineName('');
        setEvents([]);
        await fetchAndSetTimelines();
      } else {
        alert('Error saving timeline: ' + data.message);
      }
    } catch (err) {
      console.error('Save timeline error:', err);
      alert('Failed to save timeline');
    }
  };

  const handleSaveExistingTimeline = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/${selectedTimeline._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedTimeline.title,
          events: selectedTimeline.events,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Timeline updated successfully!');
        setSelectedTimeline(null);
        await fetchAndSetTimelines();
      } else {
        alert('Error updating timeline: ' + data.message);
      }
    } catch (err) {
      console.error('Save timeline error:', err);
      alert('Failed to save timeline');
    }
  };

  const handleEditTimelineName = (e) => {
    if (!selectedTimeline) return;
    setSelectedTimeline({ ...selectedTimeline, title: e.target.value });
  };

  return (
    <div className="custom-timeline-page">
      <Header />
      <h2 className="app-title">Build Your Own Timeline</h2>

      <div className="custom-timeline-container">
        <TimelineList timelines={timelines} onSelect={setSelectedTimeline} />

        <div className="timeline-editor">
          {selectedTimeline ? (
            <TimelineEditor
              selectedTimeline={selectedTimeline}
              newEvent={newEvent}
              onAddEvent={handleAddEvent}
              onEditTimelineName={handleEditTimelineName}
              onChangeNewEvent={handleChange}
              onSave={handleSaveExistingTimeline}
              onCancel={() => setSelectedTimeline(null)}
            />
          ) : (
            <NewTimelineEditor
              timelineName={timelineName}
              newEvent={newEvent}
              events={events}
              onTimelineNameChange={(e) => setTimelineName(e.target.value)}
              onChangeNewEvent={handleChange}
              onAddEvent={handleAddEvent}
              onSave={handleSaveNewTimeline}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomTimeline;
