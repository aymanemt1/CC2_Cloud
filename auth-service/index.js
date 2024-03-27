const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3003;

var app = express()
app.use(express.json());

const db = require('../Db.js');

const UserRoute = require('./Routes/UserRoute.js')

app.use('/User', UserRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
