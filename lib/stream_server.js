// Generated by CoffeeScript 1.9.2
(function() {
  var app, express, request, server, xml;

  express = require('express');

  xml = require('xml2js');

  request = require('request');

  app = express();

  app.set('view engine', 'jade');

  app.set('views', './views');

  app.get('/streams', function(req, res) {
    request('http://localhost/live/stat.xls', function(error, response, body) {
      xml.parseString(body, function(err, result) {
        var stream, streamNames, streams;
        streams = result.rtmp.server[0].application[0].live[0].stream;
        if (streams) {
          streamNames = (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = streams.length; i < len; i++) {
              stream = streams[i];
              results.push(stream.name);
            }
            return results;
          })();
        } else {
          streamNames = [];
        }
        res.render('streamlist', {
          title: 'Active Stream',
          streamNames: streamNames
        });
      });
    });
  });

  app.get('/streams/:streamName', function(req, res) {
    return res.render('stream', {
      streamName: req.params.streamName
    });
  });

  server = app.listen(8080, function() {
    var host, port;
    host = server.address().address;
    port = server.address().port;
    return console.log('listening at http://%s:%s', host, port);
  });

}).call(this);
