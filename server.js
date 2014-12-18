/*jslint node: true, nomen: true, sloppy: true */
var express = require('express'),
    langs = require('./isoLangs.json'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app'));


app.get('/isolangs.json', function(req, res) {
  res.send(langs);
});

app.get('/*', function(req, res) {
  res.redirect('/');
});

module.exports = app;
