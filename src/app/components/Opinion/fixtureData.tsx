export default {
  type: 'opinions',
  model: {
    blocks: [
      {
        type: 'title',
        model: {
          text: 'Australian school bans clapping in assemblies.',
          canonicalUrl: 'https://www.bbc.co.uk/news/world-australia-36842731',
        },
      },
      {
        type: 'quoteList',
        model: {
          connotation: 'positive',
          quotes: [
            {
              text: `Clapping is quite distressing for me as a hearing aid wearer.`,
              attribution: `Factory worker`,
              attributionLocation: `London`,
            },
            {
              text: `I have really bad anxiety and policies like this would've helped me a lot at school.`,
              attribution: `Student`,
              attributionLocation: `London`,
            },
            {
              text: `I think it's a step forward to building a more inclusive and nuturing environment for my children.`,
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
              text: `What next, ban clapping in glastonbury? What nonsense.`,
              attribution: `Experienced Professional`,
              attributionLocation: `London`,
            },
            {
              text: `Teachers should be working on making my children's grades better, not on unecessary policies like this.`,
              attribution: `Parent`,
              attributionLocation: `London`,
            },
            {
              text: `I'm fed up with minority students generalising themselves and misrepresenting the wider student body.`,
              attribution: `Student`,
              attributionLocation: `London`,
            },
          ],
        },
      },
    ],
  },
};
