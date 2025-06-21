import React, { useState } from 'react';
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

    setEvents(prev => [...prev, newEvent]);
    setNewEvent({ title: '', date: '', description: '' });
  };

  const handleSaveTimeline = async () => {
    if (!timelineName || events.length === 0) {
      alert("Please enter a name and add at least one event.");
      return;
    }

    const userEmail = localStorage.getItem("userEmail"); 

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/customtimelines/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userEmail,       
          title: timelineName,      
          events,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Timeline saved successfully!");
        setTimelineName('');
        setEvents([]);
      } else {
        alert("Error saving timeline: " + data.message);
      }
    } catch (err) {
      console.error("Save timeline error:", err);
      alert("Failed to save timeline");
    }
  };

  return (
    <div className="custom-timeline-page">
    <Header />
    <h2 className="app-title" >Build Your Own Timeline</h2>
    <div className="custom-timeline-container">
    <input
          type="text"
          placeholder="Enter timeline name"
          value={timelineName}
          onChange={(e) => setTimelineName(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      />

      <form className="event-form" onSubmit={handleAddEvent}>
        <input type="text" name="title" placeholder="Title" value={newEvent.title} onChange={handleChange} required />
        <input type="date" name="date" value={newEvent.date} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={newEvent.description} onChange={handleChange}></textarea>
        <button type="submit">Add Event</button>
      </form>

      <button onClick={handleSaveTimeline} style={{ marginTop: '20px' }}>
          Save Timeline
      </button>

      <div className="timeline">
        {events.sort((a, b) => new Date(a.date) - new Date(b.date)).map((event, index) => (
          <div key={index} className="timeline-event">
            <div className="event-date">{event.date}</div>
            <div className="event-details">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default CustomTimeline;
