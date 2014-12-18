"use strict";

var restify = require("restify"),
	url = require("url"),
	config = require("./config.js"); // set your web folder routes in config.js

var server = restify.createServer();

server.use(restify.queryParser());

for (var k in config.webFolderRoutes) {
	(function(endpoint, baseUrl) {
		// dynamically create endpoint for baseURL's key/path
		server.get(new RegExp("/" + endpoint + "/(.*)"), function(req, res, next) {
			var urlPath = req.params[0], //extracted path
				redirectUrl = url.resolve(baseUrl, urlPath);
			res.header("Location", redirectUrl);
			res.send(302);
			return next();
		});
	})(k, config.webFolderRoutes[k]);
}

server.listen(config.port, function() {
	console.log("%s listening at %s", server.name, server.url);
});
