const router = require('express').Router()
const user_controller = require('../controllers/user')
const validateUserById = require('../middleware/validateUserById')
const restricted = require('../middleware/restricted')
const validateUser = require('../middleware/validateUser')
const validateFollower = require('../middleware/validateFollower')

router.get('/', user_controller.getAllUsers)
router.get('/:id', validateUserById, user_controller.getSingleUser)
router.get('/:id/followers', validateUserById, user_controller.getUserFollowers)
router.post('/:id/following',restricted, validateUser, validateUserById, validateFollower, user_controller.requestFriend)

module.exports = router