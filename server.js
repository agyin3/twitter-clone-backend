const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const validateRequiredAuth = require('./middleware/validateRequiredAuth')

const auth_router = require('./routes/auth')
const users_router = require('./routes/user')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use('/api/auth', validateRequiredAuth, auth_router)
server.use('/api/users', users_router)
server.get('/', (req, res) => {
    res.json({api: 'Up and running'})
})

module.exports = server