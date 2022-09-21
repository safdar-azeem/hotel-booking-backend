const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://safdarazeem:twitter.com@twittercluster.ije0n.mongodb.net/twitter?retryWrites=true&w=majority')
        console.log('MongoDB connected...')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connectDB;