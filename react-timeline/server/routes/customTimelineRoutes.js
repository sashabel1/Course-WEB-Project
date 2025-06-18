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

module.exports = router;
