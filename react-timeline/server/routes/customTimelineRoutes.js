const express = require('express');
const router = express.Router();
const Timeline = require('../models/customTimelineModel');


router.post('/create', async (req, res) => {
  try {
    const { userId, title, events } = req.body;

    if (!userId || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ message: 'Missing Email or events' });
    }

    const timeline = new Timeline({
      userId,
      title,
      events
    });

    await timeline.save();
    res.status(201).json({ message: 'Timeline created', timeline });

  } catch (err) {
    console.error('Error creating timeline:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const timelines = await Timeline.find({ userId });
    res.json(timelines);
  } catch (err) {
    console.error('Error fetching timelines:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// update timeline by id (add events or update title)
router.put('/:timelineId', async (req, res) => {
  try {
    const { timelineId } = req.params;
    const { title, events } = req.body;

    const timeline = await Timeline.findById(timelineId);
    if (!timeline) {
      return res.status(404).json({ message: 'Timeline not found' });
    }

    if (title) timeline.title = title;
    if (events && Array.isArray(events)) {
      timeline.events = events;
    }

    await timeline.save();

    res.json({ message: 'Timeline updated', timeline });
  } catch (err) {
    console.error('Error updating timeline:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
