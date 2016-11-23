import Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.fd2174b5-9ce8-4ded-a0da-66f18bdd6502'; // OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

const SKILL_NAME = 'Space Facts';

/**
 * Array containing space facts.
 */
const FACTS: string[] = [
  "A year on Mercury is just 88 days long.",
  "Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.",
  "Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.",
  "On Mars, the Sun appears about half the size as it does on Earth.",
  "Earth is the only planet not named after a god.",
  "Jupiter has the shortest day of all the planets.",
  "The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
  "The Sun contains 99.86% of the mass in the Solar System.",
  "The Sun is an almost perfect sphere.",
  "A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.",
  "Saturn radiates two and a half times more energy into space than it receives from the sun.",
  "The temperature inside the Sun can reach 15 million degrees Celsius.",
  "The Moon is moving approximately 3.8 cm away from our planet every year."
];

const handlers = {
  'LaunchRequest': function () {
    this.emit('GetFact');
  },
  'GetNewFactIntent': function () {
    this.emit('GetFact');
  },
  'GetFact': function () {
    // Get a random space fact from the space facts list
    const factIndex = Math.floor(Math.random() * FACTS.length);
    const randomFact = FACTS[factIndex];

    // Create speech output
    const speechOutput = "Here's your fact: " + randomFact;

    this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact);
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = "You can say tell me a space fact, or, you can say exit... What can I help you with?";
    const reprompt = "What can I help you with?";
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', 'Goodbye!');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', 'Goodbye!');
  }
};

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID; // The original code showed APP_ID, but the type def says appId?
  alexa.registerHandlers(handlers);
  alexa.execute();
};