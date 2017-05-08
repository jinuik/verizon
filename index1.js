var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.port || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("test");

alexaApp.express({
  expressApp: app,

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: true
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");

alexaApp.launch(function(request, response) {
  response.say("You launched the app!");
});

alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

alexaApp.intent("nameIntent", {
    "slots": { "NAME": "LITERAL" },
    "utterances": [
      "HelloWorldIntent hello",
"HelloWorldIntent say hello",
"HelloWorldIntent say hello world"
    ]
  },
  function(request, response) {
    response.say("hi Welcome to brillio");
  }
);

app.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/test");




//'use strict';
//var Alexa = require("alexa-sdk");
//var http = require('http');
//
//http.createServer(function (request, response) {
//   // Send the HTTP header 
//   // HTTP Status: 200 : OK
//   // Content Type: text/plain
//    
//     console.log('favicon requested request.url',request.url);
//    if (request.url === '/favicon.ico') {
//    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
//    response.end();
//    console.log('favicon requested');
//    return;
//  }
//
//        if (request.method === 'GET' && request.url === '/') {
//       response.writeHead(200, {'Content-Type': 'text/plain'});
//   
//   // Send the response body as "Hello World"
//    console.log('favicon requested');
//   response.end('Hello World\n');
//  } 
//   
//
//   
//}).listen(process.env.PORT || 8000);
//
// exports.handler = function(event, context, callback) {
//     console.log('event')
//    var alexa = Alexa.handler(event, context);
//    alexa.registerHandlers(handlers);
//    alexa.execute();
//};
//
//var handlers = {
//    'LaunchRequest': function () {
//        this.emit('SayHello');
//    },
//    'HelloWorldIntent': function () {
//        this.emit('SayHello')
//    },
//    'SayHello': function () {
//        this.emit(':tell', 'Hi Welcome to brillio!');
//    }
//};
//
//
