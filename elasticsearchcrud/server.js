var express = require('express');
var elasticsearch = require('elasticsearch');
var bodyParser = require('body-parser');
var app =express();

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

var client = new elasticsearch.Client({
	host: '127.0.0.1:9200',
	log: 'error'
});

client.ping({
	requestTimeout: "30000"
	},
	(error) => {
		if (error) {
			console.log('elasticsearch is not running!',error);
		}
	}
);
module.exports = client;

app .listen(3000);
console.log("server is running on http://localhost:3000");

app.use(require('./routes'));