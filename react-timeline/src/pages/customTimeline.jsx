import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../style/pagestyle/customTimeline.css';

const CustomTimeline = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: ''
  });
  const [timelineName, setTimelineName] = useState('');
  const [timelines, setTimelines] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(null);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) return;

    async function fetchTimelines() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/user/${userEmail}`);
        const data = await res.json();
        setTimelines(data);
      } catch (err) {
        console.error("Failed to fetch timelines:", err);
      }
    }

    fetchTimelines();
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    if (selectedTimeline) {
      const updatedEvents = [...selectedTimeline.events, newEvent];
      setSelectedTimeline({ ...selectedTimeline, events: updatedEvents });
    } else {
      setEvents(prev => [...prev, newEvent]);
    }
    setNewEvent({ title: '', date: '', description: '' });
  };

  const handleSaveNewTimeline = async () => {
    if (!timelineName || events.length === 0) {
      alert("Please enter a name and add at least one event.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userEmail, title: timelineName, events })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Timeline saved successfully!");
        setTimelineName('');
        setEvents([]);
        const res = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/user/${userEmail}`);
        const newData = await res.json();
        setTimelines(newData);
      } else {
        alert("Error saving timeline: " + data.message);
      }
    } catch (err) {
      console.error("Save timeline error:", err);
      alert("Failed to save timeline");
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
        const res = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/user/${userEmail}`);
        const newData = await res.json();
        setTimelines(newData);
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
        <div className='timeline-list'>
          <h3>Your Timelines:</h3>
          {timelines.length === 0 && <p>No timelines found.</p>}
          <ul className="timeline-list">
            {timelines.map(tl => (
              <li key={tl._id}>
                <button className="btn" onClick={() => setSelectedTimeline(tl)}>
                  {tl.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="timeline-editor">
          {selectedTimeline ? (
            <>
              
              <div className="timeline">
                {selectedTimeline.events
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event, index) => (
                    <div key={index} className="timeline-event">
                      <div className="event-date">{event.date}</div>
                      <div className="event-details">
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <form className="event-form" onSubmit={handleAddEvent}>
                <input type="text" value={selectedTimeline.title} onChange={handleEditTimelineName} placeholder="Timeline name" />
                <input type="text" name="title" placeholder="Title" value={newEvent.title} onChange={handleChange} required />
                <input type="date" name="date" value={newEvent.date} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={newEvent.description} onChange={handleChange} />
                <button type="submit" className="btn">Add Event</button>
              </form>
              <button onClick={handleSaveExistingTimeline} className="btn">Save Changes</button>
              <button onClick={() => setSelectedTimeline(null)} className="btn">Cancel</button>
            </>
          ) : (
            <>
              <form className="event-form" onSubmit={handleAddEvent}>
                <input
                  type="text"
                  value={timelineName}
                  onChange={(e) => setTimelineName(e.target.value)}
                  placeholder="Timeline name"
                  className="timeline-name"
                />
                <input type="text" name="title" placeholder="Title" value={newEvent.title} onChange={handleChange} required />
                <input type="date" name="date" value={newEvent.date} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={newEvent.description} onChange={handleChange}></textarea>
                <button type="submit" className="btn">Add Event</button>
              </form>
              <button onClick={handleSaveNewTimeline} className="btn">Save Timeline</button>
              <div className="timeline">
                {events
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event, index) => (
                    <div key={index} className="timeline-event">
                      <div className="event-date">{event.date}</div>
                      <div className="event-details">
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomTimeline;