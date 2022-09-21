const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please add an email'],
        validate: {
            validator: function (value) {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    throw new Error('Email is not valid');
                }
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    avatar: {
        type: String,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;