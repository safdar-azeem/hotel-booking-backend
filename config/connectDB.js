const mongoose = require('mongoose')
connectDB = () => {

    mongoose.connect('mongodb+srv://ilyas:ilyas@cluster0.suvdu4n.mongodb.net/?retryWrites=true&w=majority', () => console.log('DB connected'))
}
module.exports = connectDB;