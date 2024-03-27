const express = require('express');
const router = express.Router();
const Inscription = require('../Models/InscriptionModel'); 
const Event = require('../Models/EventModel'); 
const User = require('../Models/UserModel'); 

router.post('/add', async (req, res) => {
    try {
      const event = await Event.findById(req.body.eventId);
      if (!event) {
        return res.status(404).json({ message: "Événement non trouvé." });
      }
  
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
  
      const existingInscription = await Inscription.findOne({ userId: req.body.userId, eventId: req.body.eventId });
      if (existingInscription) {
        return res.status(400).json({ message: "L'inscription existe déjà pour cet utilisateur et cet événement." });
      }
  
      const newInscription = new Inscription({
        userId: req.body.userId,
        eventId: req.body.eventId
      });
  
      await newInscription.save();
  
      res.status(201).json({ message: "Inscription ajoutée avec succès." });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'ajout de l'inscription." });
    }
  });

module.exports = router;
