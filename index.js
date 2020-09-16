const server = require('./server')
require('dotenv').config()

const port = process.env.PORT || 8888

server.listen(port, () => {
    console.log(`\n********You are listening on PORT ${port}********\n`)
})