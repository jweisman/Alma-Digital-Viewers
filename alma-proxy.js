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
			target: (nconf.get('ALMA_APIHOST') || 'https://api-na.hosted.exlibrisgroup.com/almaws/v1') +
				url,
			headers: {
				"Authorization": "apikey " + nconf.get('ALMA_APIKEY'),
				"Accept": "application/json"
			}
		});
}
