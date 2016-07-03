var express = require('express');
var nconf = require('nconf');
var httpProxy = require('http-proxy');

nconf.env()
   .file({ file: './config.json' });

var apiProxy = httpProxy.createProxyServer({
	ignorePath: true,
	changeOrigin: true
});

exports.proxy = function(req, res) {
	// Support GET /bibs only
	var regexp = /alma(\/bibs[\/?].*)/;
	var url = regexp.exec(req.url)[1];
	apiProxy.web(req, res, 
		{ 
			target: nconf.get('alma_host') +
				url,
			headers: {
				"Authorization": "apikey " + nconf.get('api_key'),
				"Accept": "application/json"
			}
		});
}
