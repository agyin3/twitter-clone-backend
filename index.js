const server = require('./server')
const db = require('./config/db_config')
require('dotenv').config()

const port = process.env.PORT || 8888

server.listen(port, () => {
    console.log(`\n********You are listening on PORT ${port}********\n`)
})