const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  imageUrl: String
});

const TimelineSchema = new mongoose.Schema({
  userId: String,
  timelineName: String,
  events: [EventSchema]
});

module.exports = mongoose.model('CustomTimeline', TimelineSchema);
