const mongoose = require('mongoose');

const InscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
});

const Inscription = mongoose.model('Inscription', InscriptionSchema);

module.exports = Inscription;
