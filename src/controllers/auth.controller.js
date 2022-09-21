const jwt = require('jsonwebtoken');
const User = require('../models/User.modal.js')
const STATUS = require('../utils/status')
const controller = {};

controller.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        User.findOne({ email: email }, (err, user) => {
            if (user) {
                return res.status(STATUS.CONFLICT).json({
                    message: "User already registered"
                })
            } else {
                const user = new User({ name, email, password })
                user.save(err => {
                    if (err) {
                        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
                            message: err.message
                        })
                    } else {
                        return res.status(STATUS.CREATED).json({
                            message: "User register successfully",
                            user: user
                        })
                    }
                })
            }
        })

    } catch (err) {
        res.send({ message: err.message })
    }
}

controller.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        User.findOne({ email: email }, (err, user) => {
            if (user) {

                if (user.comparePassword(password)) {
                    const token = jwt.sign(
                        {
                            id: user._id,
                        },
                        process.env.SECRET_KEY,
                    );
                    return res.status(STATUS.SUCCESS).json({
                        message: "Login successfully",
                        user: {
                            ...user._doc,
                            password: null
                        },
                        token
                    })
                } else {
                    return res.status(STATUS.BAD_REQUEST).json({
                        message: "password didn't match",
                    })
                }
            } else {
                return res.status(STATUS.NOT_FOUND).json({
                    message: "User not found"
                })
            }
        })
    } catch (err) {
        res.send({ message: err.message })
    }
}

module.exports = controller