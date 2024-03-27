const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel'); 

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }] });
    if (existingUser) {
      return res.status(400).json({ message: "L'email ou le login est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      login: req.body.login,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur ajouté avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur l'ajout de l'utilisateur." });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ $or: [{ email: req.body.username }, { login: req.body.username }] });
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    const token = jwt.sign({ userId: user._id }, 'secret');

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur de connexion l'utilisateur." });
  }
});


router.get('/check/:username', async (req, res) => {
  try {
    const user = await User.findOne({ $or: [{ email: req.params.username }, { login: req.params.username }] });
    res.status(200).json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ message: "Erreur de la vérification." });
  }
});


module.exports = router;
