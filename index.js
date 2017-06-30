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

/*alexaApp.launch(function(request, response) {
  request.getSession();
  response.say("Welcome to Brillio Imagine IZone. I am Brillio AI Bot on Echo Dot");
  response.shouldEndSession(false);
});*/


alexaApp.launch(function(request, response) {
  request.getSession().set();
  response.say("Welcome to Verizon N O C Dashboard. I am Jax, a Brillio AI Bot on Alexa Echo Dot.");
  response.shouldEndSession(false);
});

/*alexaApp.intent("tellme", function(request, response) {
  var session = request.getSession();
  response.say("The number is " + session.get("number"));
  // clear only the 'number' attribute from the session
  session.clear("number");
});

// the session variables can be entirely cleared, or cleared by key
alexaApp.intent("clear", function(request, response) {
  var session = request.getSession();
  session.clear(); // or: session.clear("key") to clear a single value
  response.say("Session cleared!");
});*/



/*alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

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
);*/

/*alexaApp.intent("interactIntent", {
    "slots": { "COMMANDNAME": "LITERAL" },
    "utterances": [
      "open {command|COMMANDNAME}", "can you open {command|COMMANDNAME}"
    ]
  },
  function(request, response) {
   // console.log(request.data.request.intent);
     socketFunction(request.data.request.intent)
    console.log('hitting this page')
    response.say("Ok Jinu.");
  }
);*/


/*alexaApp.intent("welcome", {
    "utterances": [
      "What am I seeing", "What is this"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    response.say("Hi Jinu, You are seeing a Sample Tableau dashboard on College Admissions, published by Chris Gerrard");
  }
);*/


/*alexaApp.intent("brilliosales", {
    "utterances": [
      "over all sales", "what is the  sales", "what is brillio sales"
    ]
  },
  function(request, response) {
  //  console.log('hitting this page')
   // console.log('hitting overallsales');
 
    response.say("Sales	is 234,500 dollars which is pretty good overall");
  }
);*/

/*alexaApp.intent("customerresponse", {
    "utterances": [
      "How much is customer response rate", "what is the  response rate of customers"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    response.say("customer response rate is 15.11 percentage");
  }
);*/


/*
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
*/

alexaApp.intent("welcome", {
    "utterances": [
      "Hi", "Hello", "Hello Jax", "Hi Jax"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting welcome')
    response.say("Hi John, How can I help you? ");
    response.shouldEndSession(false);
  }
);


alexaApp.intent("order", {
    "utterances": [
      "what are the number of ordering inflows we have", "how many ordering inflows we have", "tell me the number of ordering inflows we have"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting welcome')
    response.say("John, the number of ordering inflows we have are 200");
    response.shouldEndSession(false);
  }
);


alexaApp.intent("pending", {
    "utterances": [
      "what are the pending orders for today", "tell me pending orders for today", "any pending orders today"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting welcome')
    response.say("The number of pending orders for today are 50");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("backlogs", {
    "utterances": [
      "what are the Tn backlogs", "which are the Tn backlogs", "tell me th Tn backlogs"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting welcome')
    response.say("The T1 backlogs are 22, T2 backlogs are 18");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("critical", {
    "utterances": [
      "which are the most critical orders that need my supervision", "any critical order needs my supervision", "any critical orders needs my attention"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting welcome')
    response.say("The orders that need your supervision immediately are order number: 1 1 1 1 1");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("assign", {
    "utterances": [
      "to whom is this order assigned", "this order assigned to whom", "order assigned to whom"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting welcome')
    response.say("The orders is assigned to Stephen King");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("mobile", {
    "utterances": [
      "what is Stephen King’s mobile number", "tell me Stephen Kings mobile number", "Give me Stephen King's mobile number"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting welcome')
    response.say("Stephen’s mobile number is: plus 1 612 888 9898");
    response.shouldEndSession(false);
  }
);


    
/*alexaApp.intent("recomment", {
    "utterances": [
      "Yes Please tell", "Ok thats great", "please help me", "Ok Please tell"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting recomment')
    response.say("Shall I will give you a good recipe to surprise.");
    response.shouldEndSession(false);
  }
);*/





alexaApp.intent("defaultintent", {
    "utterances": [
      "can you give me tour plan", "give me another choice", "Not required", "no" , "say"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting default')
    response.say("I did not understand you");
    response.shouldEndSession(false);
  }
);

alexaApp.messages.NO_INTENT_FOUND = "Sorry, something bad happened";

alexaApp.error = function(exception, request, response) {
    console.log('Coming to error')
    var session = request.getSession();
  response.say("Sorry, something bad happened");
    response.shouldEndSession(true);
};

var socketFunction = function(commandname) {
//io.on('connection', function (socket) {
    
  S.emit('alexacommand',  commandname );  
//});
}

server.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/test");