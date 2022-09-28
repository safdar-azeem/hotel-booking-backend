const User = require('../models/User.modal.js')
const STATUS = require('../config/status')
const dotenv = require('dotenv');
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
                            message: "Error while saving user"
                        })
                    } else {
                        return res.status(STATUS.CREATED).json({
                            message: "User register successfully"
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
                if (password === user.password) {
                    return res.status(STATUS.SUCCESS).json({
                        message: "Login successfully",
                        user: user
                    })
                } else {
                    return res.status(STATUS.BAD_REQUEST).json({
                        message: "password didn't match",
                        user: user
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

controller.loggedIn = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.json(false)
        jwt.verify(token, process.env.JWT_SECTRET)
        res.send(true)
    } catch (error) {
        res.json(false)
    }
}

module.exports = controller