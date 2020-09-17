require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const url = `${process.env.DB_URL}${process.env.DB_NAME}`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose

