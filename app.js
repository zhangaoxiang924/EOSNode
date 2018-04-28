const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fileStreamRotator = require('file-stream-rotator')
const fs = require('fs')

const proxyRouter = require('./routes/proxy')
const eosGalaxyRouter = require('./routes/eos-galaxy')
const eosGalaxyMRouter = require('./routes/eos-galaxyM')

const app = express()

// java接口代理
app.use('/info', proxyRouter)
app.use('/market', proxyRouter)
app.use('/passport', proxyRouter)
app.use('/lives', proxyRouter)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// logger
const logDir = '/data/node_site/www.eosgalaxy.io/logs'
fs.existsSync(logDir) || fs.mkdirSync(logDir)
const accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDir, 'logs-%DATE%.log'),
    frequency: 'daily',
    verbose: true
})

app.use(logger('dev'))
app.use(logger('common', {stream: accessLogStream}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', eosGalaxyRouter)
app.use('/m', eosGalaxyMRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
