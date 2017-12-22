'use strict';
var Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const rootURL = "https://s3.amazonaws.com/simoncalexa/sticksong/";
var stickIndex;

const init = () => {
  stickIndex = 0;
}


var handlers = {
    'LaunchRequest': function () {
        init();
        //console.log('Insert some voice over to frame the experience here. It\'s the Hey Duggee Stick song, you know what to do when you hear someone say... <audio src="' + rootURL + 'stick' + stickIndex + '.mp3" />');
        this.response.speak('Awoof. Do I sound like Duggee? Imagine it\'s him talking right now. Awoof. It\'s the Hey Duggee Stick song, you know what to do when you hear someone say... <audio src="' + rootURL + 'stick' + stickIndex + '.mp3" />' ).listen('say <audio src="' + rootURL+ 'prompt_stick.mp3" />');
        this.emit(":responseReady");
    },
    'StickIntent': function () {
        stickIndex++;
        if(stickIndex>= 7 ){
          console.log("song goes here because stickIndex = " + stickIndex);
          console.log('<audio src="' +rootURL + 'song.mp3" />');
          this.response.speak('<audio src="' +rootURL + 'song.mp3" />');

        }else{
          console.log("another call to stick because stickIndex = " + stickIndex);
          this.response.speak('<audio src="' + rootURL + 'stick' + stickIndex + '.mp3" />' ).listen('say <audio src="' + rootURL+ 'prompt_stick.mp3" />');

        }
        this.emit(":responseReady");

    },
    'MyNameIsIntent': function () {
        this.emit('SayHelloName');
    },
    'SayHello': function () {
        this.response.speak('Hello World!')
                     .cardRenderer('hello world', 'hello world');
        this.emit(':responseReady');
    },
    'SayHelloName': function () {
        var name = this.event.request.intent.slots.name.value;
        this.response.speak('Hello ' + name)
            .cardRenderer('hello world', 'hello ' + name);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};
