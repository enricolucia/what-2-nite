/*jslint node: true, nomen: true, sloppy: true */
var express = require('express'),
    langs = require('./isoLangs.json'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express();

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json());

app.get('/isolangs.json', function(req, res) {
  res.send(langs);
});

app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile(__dirname + '/app/index.html');
});


module.exports = app;
