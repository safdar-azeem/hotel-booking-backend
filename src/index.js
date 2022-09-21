const express = require('express')
require('dotenv').config();
const app = express()
const cors = require('cors')
const PORT = 5001;
const connectDB = require('./config/connectDB');
const routes = require('./routes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// ConnectDB
connectDB();

// Routes
app.use('/api/v1/', routes)


app.listen(PORT, () => console.log(`app is running on port ${PORT}`))




