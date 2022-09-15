const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5001;
const connectDB = require('./config/connectDB');
const auth = require('./routes/auth-route.js');

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// ConnectDB
connectDB();

// Routes
app.use('/', auth)


app.listen(PORT, () => console.log(`app is running on port ${PORT}`))




