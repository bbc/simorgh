const fragment = require('./models/fragment');

const stringToRichText = string => ({
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text: string,
          blocks: [fragment(string)],
        },
      },
    ],
  },
});

module.exports = stringToRichText;
