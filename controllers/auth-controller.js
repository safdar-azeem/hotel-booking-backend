const User = require('../models/auth-model.js')
const controller = {};

controller.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        User.findOne({ email: email }, (err, user) => {
            if (user) {
                res.send({ message: "User already registered" })
            } else {
                const user = new User({ name, email, password })
                user.save(err => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({ message: "Successfully register" })
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
                    res.send({ message: "Login successfully", user: user })
                } else { res.send({ message: "password didn't match" }) }
            } else {
                res.send({ message: "User not found" })
            }
        })
    } catch (err) {
        res.send({ message: err.message })
    }
}

module.exports = controller