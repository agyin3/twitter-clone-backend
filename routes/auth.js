const router = require('express').Router()
const auth_controller = require('../controllers/auth')


router.post('/register', auth_controller.registerUser)

module.exports = router