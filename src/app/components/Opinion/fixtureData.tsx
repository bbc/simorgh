export default {
  type: 'opinions',
  model: {
    blocks: [
      {
        type: 'title',
        model: {
          text: 'Tomato shortages have caused the price of ketchup to soar.',
          canonicalUrl: 'https://www.bbc.com/mundo/articles/c20myn5q195o',
        },
      },
      {
        type: 'quoteList',
        model: {
          connotation: 'positive',
          quotes: [
            {
              text: `I'm scared this might affect my job security`,
              attribution: `Factory worker`,
              attributionLocation: `London`,
            },
            {
              text: `I never thought ketchup would be something I'd have to budget for.`,
              attribution: `Student`,
              attributionLocation: `London`,
            },
            {
              text: `Feels like everything's going up except my paycheck. Even ketchup isn't safe.`,
              attribution: `Parent`,
              attributionLocation: `London`,
            },
          ],
        },
      },
      {
        type: 'quoteList',
        model: {
          connotation: 'negative',
          quotes: [
            {
              text: `Who care's anyway, it's a rubbish fruit used to make a tasteless sauce.`,
              attribution: `Experienced Professional`,
              attributionLocation: `London`,
            },
            {
              text: `Never liked the taste anyway.`,
              attribution: `Student`,
              attributionLocation: `London`,
            },
            {
              text: `I never understood the hype over ketchup it's just red gloop.`,
              attribution: `Young professional`,
              attributionLocation: `London`,
            },
          ],
        },
      },
    ],
  },
};
