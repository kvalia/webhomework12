const bodyParser = require('body-parser');
const express = require('express');
const exp = express();
var http = require('http');
var port = process.env.PORT || 3000;
console.log("Console");
http.createServer(function(req,res) {
	res.writeHead(200, { 'Content-Type': 'text/html'});
	res.write("<h2>Hello world!</h2>");
	res.write("Sucessful deploy");
	res.end();
}).listen(port);
