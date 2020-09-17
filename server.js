const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const auth_router = require('./routes/auth')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use('/auth', auth_router)
server.get('/', (req, res) => {
    res.json({api: 'Up and running'})
})

module.exports = server