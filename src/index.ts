import Alexa = require('alexa-sdk');
import _ = require('lodash');

const APP_ID = 'amzn1.ask.skill.224d3dea-a3bd-4367-9769-fb43fbe02ec9'; // OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

const SKILL_NAME = 'Sloth Facts';

/**
 * Array containing sloth facts.
 */
const FACTS: string[] = [
  'Sloths are very slow! You probably already knew that though.',
  'Sloths are able swimmers, and are faster in the water than in a tree.',
  'A sloth only poops once a week, and loses half its body weight while doing it.',
  'Sloths poop at the bottom of their tree to help algae grow, which gets on their fur and helps camouflage the sloth.',
  'Two-toed and three-toed sloths both have three toes; however two-toed sloths only have two claws on their hands.',
  'Two-toed and three-toed slots are not that closely related.',
  'Wild sloths actually only sleep about 10 hours a day, but ones in captivity sleep much more.',
  `Sloths are slow and well-camouflaged, so they're hard for predators to spot in the trees. They're most vulnerable when they leave their trees to go to the bathroom.`,
  `Slots are slow because they mostly eat leaves, which don't have much energy.`,
  `Sloths only have one baby at a time.`,
  `A baby sloth will hang onto its mother for a few weeks, and stay with her for a few years.`,
  `Sloths only leave their trees to swim and use the bathroom.`,
  `Sloths don't spend a lot of time with other sloths.`,
  `There used to be giant slots in North America.`,
  `Sloths live in the forests of Central and South America.`,
  `Like owls, sloths can turn their heads almost all the way around.`,
  `Female sloths give out a loud shriek when they are ready to mate.`,
  `Sloth claws are usually about 4 inches long.`,
  `Wild sloths usually live to about 15, though they can live as long as 40 years.`,
  `Sloths' internal organs are attached to their rib cages, which helps them breath when their upsidedown.`,
  `Sloths don't sweat or have body odor, which helps them stay hidden.`,
  `When swimming, sloths can hold their breath for up to 40 minutes.`
];

const handlers = {
  'LaunchRequest': function () {
    this.emit('GetFact');
  },
  'GetNewFactIntent': function () {
    this.emit('GetFact');
  },
  'GetFact': function () {
    // Get a random sloth fact from the sloth facts list
    const randomFact = _.sample(FACTS);

    // Create speech output
    const speechOutput = `Here's your fact: ${randomFact}`;

    this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact);
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = "You can say tell me a sloth fact, or, you can say exit... What can I help you with?";
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