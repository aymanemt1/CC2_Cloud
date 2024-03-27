const express = require('express');
const router = express.Router();
const Event = require('../Models/EventModel'); 

router.post('/add', async (req, res) => {
  try {
    const existingEvent = await Event.findOne({ title: req.body.title });
    if (existingEvent) {
      return res.status(400).json({ message: "Un événement avec ce titre existe déjà." });
    }

    const newEvent = new Event({
      titre: req.body.titre,
      description: req.body.description,
      date: req.body.date,
      lieu: req.body.lieu,
      categorie: req.body.categorie,
    });

    await newEvent.save();
    res.status(201).json({ message: "Événement ajoute avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de l'événement." });
  }
});


router.get('/:eventId', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé." });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des détails de l'événement." });
  }
});

module.exports = router;
