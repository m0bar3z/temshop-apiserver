const express = require('express');
const app = express();
const expressValidator = require('express-validator')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
global.config = require('./app/config')
let appConfig = require('config')


mongoose.connect(appConfig.mongo.host)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(err => {
        console.log('database connection error!')
    })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))
app.use(expressValidator())

const routes = require('./app/routes');

app.use('/api', routes)

app.listen(appConfig.appPort, () => console.log(`listening on port ${appConfig.appPort}`))

module.exports = app