const express = require('express');
const router = express.Router();
const User = require('../models/auth-model.js')
const controller = require('../controllers/auth-controller.js')



router.post('./register', controller.register)

router.post('./login', controller.login)

module.exports = router;
