const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
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

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcryptjs.hash(this.password, 10)
        }
        next();
    } catch (err) {
        next(err);
    }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcryptjs.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch (err) {
        throw new Error(err);
    }
}

const User = mongoose.model("User", userSchema)

module.exports = User;