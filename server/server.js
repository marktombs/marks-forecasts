//Dummy server file, used to serve the HTML-content.

var path = require('path');
var express = require('express');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./../webpack.config.js');

const isDeveloping = config.env !== 'dist';
const port = process.env.PORT || config.port;

console.log('Server mode:', isDeveloping ? 'DEVELOPMENT' : 'PRODUCTION');

const app = express();

if (isDeveloping) {
  var webpack = require('webpack');
  const compiler = webpack(config);
  app.use(webpackMiddleware(compiler, config.devServer));
  app.use(webpackHotMiddleware(compiler));
}

// Server static content
app.use("/", express.static(__dirname + '/src'));

//Use the api modules
var api = require('./index')(app);

// Send the client from the root URL
app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.error('FATAL ERROR', err);
  }
  console.info('Running on port: ' + port + '. ');
});
