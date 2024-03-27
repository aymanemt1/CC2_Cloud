const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3005;

var app = express()
app.use(express.json());

const db = require('../Db.js');

const EventRoute = require('./Routes/InscriptionRoute.js')

app.use('/Inscription', EventRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
