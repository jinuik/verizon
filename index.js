var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

var server = require('http').createServer(app);  
var io = require('socket.io')(server);


var S;
io.on('connection', function(socket){
    S = socket;
  console.log('a user connected');
});

app.use('/', express.static(__dirname + ''));

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
  response.say("Welcome to Brillio Jax Demo. I am Brillio AI Bot on Echo Dot");
});

alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

alexaApp.intent("nameIntent", {
    "slots": { "NAME": "LITERAL" },
    "utterances": [
      "my name is {names|NAME}", "set my name to {names|NAME}"
    ]
  },
  function(request, response) {
    console.log(request.data.request.intent);
    console.log('hitting this page')
    response.say("My name is Jinu");
  }
);

alexaApp.intent("welcome", {
    "utterances": [
      "What am I seeing", "What is this"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    response.say("Hi Jinu, You are seeing Sales dashboard");
  }
);


alexaApp.intent("brilliosales", {
    "utterances": [
      "over all sales", "what is the  sales", "what is brillio sales"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    console.log('hitting overallsales');
    S.emit('getoverallsales',  'overallsales' );
    S.on('getoveralltradesales', function(data){
        console.log(data);
        console.log('hitting overallsales');
        response.send(data);
   });
    //response.say("Sales	is 234,500 dollars which is pretty good overall");
  }
);

alexaApp.intent("customerresponse", {
    "utterances": [
      "How much is customer response rate", "what is the  response rate of customers"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    response.say("customer response rate is 15.11 percentage");
  }
);


alexaApp.intent("transactionrresponse", {
    "utterances": [
      "open dashboard"
    ]
  },
  function(request, response) {
    console.log('hitting this page dashboard')
    socketFunction('dashboard')
    
    response.say("opening dashboard");
  }
);




alexaApp.intent("ctr", {
    "utterances": [
      "what is the ctr", "what is our ctr"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    response.say("CTR is 3.43 percentage");
  }
);

app.error = function(exception, request, response) {
  response.say("Sorry, something bad happened");
};

var socketFunction = function(commandname) {
//io.on('connection', function (socket) {
    
  S.emit('alexacommand',  commandname );  
//});
}

server.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/test");