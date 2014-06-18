express = require 'express'
jade = require 'jade'
path = require 'path'
http = require 'http'

app = express()

server = http.createServer(app)

app.set 'view engine', 'jade'
app.set 'views', path.join __dirname, 'views'
app.locals.pretty = 'true'

if app.get('env') == 'development'
  app.locals.devMode = 'true'

app.get '/', (req, res) ->
  res.render 'index'

app.use express.static path.join(__dirname, '../bower_components')
app.use express.static path.join(__dirname, '../build')
 


# Handle 404
app.use (req, res) ->
  res.status 404
  res.redirect '/',
    error: 404
# Handle 500
app.use (error, req, res, next) ->
   res.send '500: Internal Server Error', 500

port = Number(process.env.PORT || 3000)
server.listen port, () ->
  console.log "listening on #{port}"