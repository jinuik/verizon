'use strict';
var Alexa = require("alexa-sdk");
var http = require('http');

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
    
    if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end();
    console.log('favicon requested');
    return;
  }

        if (request.method === 'GET' && request.url === '/') {
       response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   
   response.end('Hello World\n');
  } 
   

   
}).listen(process.env.PORT || 8000);

 exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello')
    },
    'SayHello': function () {
        this.emit(':tell', 'Hi Welcome to brillio!');
    }
};