var fragment = require('./models/fragment');

var stringToRichText = function stringToRichText(string) {
  return {
    type: 'text',
    model: {
      blocks: [{
        type: 'paragraph',
        model: {
          text: string,
          blocks: [fragment(string)]
        }
      }]
    }
  };
};

module.exports = stringToRichText;