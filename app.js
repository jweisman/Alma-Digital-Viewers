var express = require('express');
var almaProxy = require('./alma-proxy');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get("/alma/*", function(req, res) {
	almaProxy.proxy(req, res)
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(app.get('port'), function () {
  console.log('Node app listening on port ', app.get('port'));
});