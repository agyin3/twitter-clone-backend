const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./config/db_config').connection

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

db.once('open', _ => {
    console.log('Database connected:', process.env.DB_URL)
})

db.on('error', err => {
    console.error('connection error:', err)
})

server.get('/', (req, res) => {
    res.json({api: 'Up and running'})
})

module.exports = server