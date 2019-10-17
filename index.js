require('module-alias/register');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => console.log('Connected'));
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// Import Routes
const authRoute = require('./routes/auth');

// Route Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server up and Running'));