const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ilyas:ilyas@cluster0.suvdu4n.mongodb.net/hotelbooking?retryWrites=true&w=majority')
        console.log('MongoDB connected...')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connectDB;