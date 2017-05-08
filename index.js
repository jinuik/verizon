var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
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
      "my name is {names|NAME}", "set my name to {names|NAME}"
    ]
  },
  function(request, response) {
    console.log(request);
    console.log('hitting this page')
    response.say("My name is Jinu");
  }
);



alexaApp.intent("brilliosales", {
    "utterances": [
      "what is the brillio sales", "what is the  sales", "what is brillio sales"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    response.say("Sales	is 207,417.4 dollars");
  }
);

alexaApp.intent("customerresponse", {
    "utterances": [
      "what is the customer responser rate", "what is the  responser rate of customers"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    response.say("customer reponse rate is 15.11 percentage");
  }
);


alexaApp.intent("transactionrresponse", {
    "utterances": [
      "what is the transaction response rate", "what is the  responser rate of transaction"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    response.say("transaction reponse rate is 16.55 percentage");
  }
);

alexaApp.intent("ctr", {
    "utterances": [
      "what is the ctr", "what is our ctr"
    ]
  },
  function(request, response) {
    console.log('hitting this page')
    response.say("transaction reponse rate is 16.55 percentage");
  }
);

app.error = function(exception, request, response) {
  response.say("Sorry, something bad happened");
};

app.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/test");