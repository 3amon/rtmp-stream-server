express = require 'express'
xml = require 'xml2js'
request = require 'request'

app = express()

app.set 'view engine', 'jade'
app.set 'views', './views'

app.get '/streams', (req, res) ->
	request 'http://localhost/live/stat.xls', (error, response, body) ->
		xml.parseString body, (err, result) ->
			streams = result.rtmp.server[0].application[0].live[0].stream
			if streams
				streamNames = (stream.name for stream in streams)
			else
				streamNames = []
			res.render('streamlist', { title: 'Active Stream', streamNames: streamNames});
			return
		return
	return

app.get '/streams/:streamName', (req, res) ->
	res.render('stream', {streamName: req.params.streamName});


server = app.listen 8080, ->
	host = server.address().address
	port = server.address().port

	console.log 'listening at http://%s:%s', host, port
