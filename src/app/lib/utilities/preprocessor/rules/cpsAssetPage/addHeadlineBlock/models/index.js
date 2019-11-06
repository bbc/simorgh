export const getHeadlineBlock = headlineText => ({
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  {
                    model: {
                      attributes: [],
                      text: headlineText,
                    },
                    type: 'fragment',
                  },
                ],
                text: headlineText,
              },
              type: 'paragraph',
            },
          ],
        },
        type: 'text',
      },
    ],
  },
  type: 'headline',
});

export const getFauxHeadlineBlock = headlineText => ({
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  {
                    model: {
                      attributes: [],
                      text: headlineText,
                    },
                    type: 'fragment',
                  },
                ],
                text: headlineText,
              },
              type: 'paragraph',
            },
          ],
        },
        type: 'text',
      },
    ],
  },
  type: 'fauxHeadline',
});

export const getVisuallyHiddenHeadlineBlock = headlineText => ({
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  {
                    model: {
                      attributes: [],
                      text: headlineText,
                    },
                    type: 'fragment',
                  },
                ],
                text: headlineText,
              },
              type: 'paragraph',
            },
          ],
        },
        type: 'text',
      },
    ],
  },
  type: 'visuallyHiddenHeadline',
});
