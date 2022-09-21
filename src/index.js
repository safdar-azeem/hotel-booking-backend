const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5008;
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




