var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var apiai = require('apiai');
// var app = apiai("70a3b3c6e8f9405a91376dcbc57b2633");
var appi = apiai("46c5c97c0a034146ab9b25ac077b308f");

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
  response.say("Welcome to Lineage Demo. I am Hella, a Brillio AI Bot on Alexa Echo Dot.");
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
      "Hi", "Hello", "Hello Hella", "Hi Hella"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting welcome')
    response.say("Hi Stephen, How can I help you? ");
    response.shouldEndSession(false);
  }
);


alexaApp.intent("order", {
    "utterances": [
      "what are the number of pipeline orders we have", "how many pipeline orders we have", "give the number of pipeline orders we have"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting order')
    response.say("Stephen, the number of pipeline orders are 200");
    response.shouldEndSession(false);
  }
);


alexaApp.intent("current", {
    "utterances": [
      "what are the number of current orders due for today", "tell me the number of current orders due for today", "any current orders due for today"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting pending')
    response.say("The number of current orders due for today are 50");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("future", {
    "utterances": [
      "what are the future orders that are due", "which are future orders that are due", "any future orders that are due"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting backlogs')
    response.say("The future orders that are due within the next 3 days are 12");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("past", {
    "utterances": [
      "which are the past orders that are due as of today", "any past orders that are due as of today", "any past orders due as of today"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting critical')
    response.say("The orders that were due before today are 18");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("key", {
    "utterances": [
      "what are the key metrics for the NoC in this month", "any key metrics for the NoC in this month", "tell if any key metrics for the NoC in this month"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting assign')
    response.say("The average time spent on an order is around 42 min and productivity of the plant is at 60 orders per day which is better than the previous month by 12%.");
    response.shouldEndSession(false);
  }
);

alexaApp.intent("bye", {
    "utterances": [
      "good bye"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting assign')
    response.say("Bye, Have a great day");
    response.shouldEndSession(true);
  }
);
/*alexaApp.intent("thanks", {
    "utterances": [
      "thanks for the help", "thank you very much", "thanks a lot"
    ]
  },
  function(request, response) {
    var session = request.getSession();
    console.log('hitting mobile')
    response.say("You are welcome. Have a great day");
    response.shouldEndSession(false);
  }
);*/


    
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
    
    response.say("Hey! Sorrry, I am not sure");
    
    apiCall(request, response);
            setTimeout(function () {
            response.say("inside default intent");
        }, 4000);
    var session = request.getSession();
    console.log('hitting default')
   // response.say("Sorrry, I am not sure");
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



function apiCall(req, res) {
    var a = "hI";
    var request = appi.textRequest(a, {
        sessionId: '1234567891'
    });
    request.on('response', function (response) {
        var a = response;
        res.say(a["result"]["fulfillment"]["speech"]);
       // res.("i am inside dialog flow");
    });
    request.on('error', function (error) {
        console.log(error);
    });
    request.end();
    return(a["result"]["fulfillment"]["speech"]);
}

server.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/test");