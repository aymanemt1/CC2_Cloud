const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  
  titre: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,

  },
  date: {
    type: Date,
    required: true,
  },
  lieu: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  }
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
