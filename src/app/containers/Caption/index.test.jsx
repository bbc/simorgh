import React from 'react';
import { render } from 'enzyme';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import CaptionContainer from '.';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContext } from '../../contexts/ServiceContext';
import { blockContainingText } from '../../models/blocks';

const newsServiceContextStub = {
  imageCaptionOffscreenText: 'Image caption, ',
  script: latin,
};
const persianServiceContextStub = {
  imageCaptionOffscreenText: ' ، عنوان تصویر',
  script: arabic,
};

const captionBlock = blockContainingText('caption', 'Some caption text...');

const captionBlock3Paragraphs = {
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
                      text: 'This is paragraph 1',
                    },
                    type: 'fragment',
                  },
                ],
                text: 'This is paragraph 1',
              },
              type: 'paragraph',
            },
            {
              model: {
                blocks: [
                  {
                    model: {
                      attributes: [],
                      text: 'This is paragraph 2',
                    },
                    type: 'fragment',
                  },
                ],
                text: 'This is paragraph 2',
              },
              type: 'paragraph',
            },
            {
              model: {
                blocks: [
                  {
                    model: {
                      attributes: [],
                      text: 'Paragraph 3',
                    },
                    type: 'fragment',
                  },
                ],
                text: 'Paragraph 3',
              },
              type: 'paragraph',
            },
          ],
        },
        type: 'text',
      },
    ],
  },
  type: 'caption',
};

const CaptionWithContext = (block, contextStub) => (
  <ServiceContext.Provider value={contextStub}>
    <CaptionContainer block={block} />
  </ServiceContext.Provider>
);

shouldMatchSnapshot(
  'should render caption text with example News offscreen text',
  CaptionWithContext(captionBlock, newsServiceContextStub),
);

shouldMatchSnapshot(
  'should render caption text with example Farsi offscreen text',
  CaptionWithContext(captionBlock, persianServiceContextStub),
);

shouldMatchSnapshot(
  'should render caption text with no VisuallyHiddenText component when no imageCaptionOffscreenText is defined in ServiceContext',
  CaptionWithContext(captionBlock, {
    imageCaptionOffscreenText: undefined,
    script: latin,
  }),
);

shouldMatchSnapshot(
  'should render caption with mutiple paragraphs',
  CaptionWithContext(captionBlock3Paragraphs, newsServiceContextStub),
);

it('should render figcaption with multiple paragraphs', () => {
  const renderedWrapper = render(
    CaptionWithContext(captionBlock3Paragraphs, newsServiceContextStub),
  );
  expect(renderedWrapper.find('figcaption p').length).toBe(3);
  expect(
    renderedWrapper
      .find('figcaption p')
      .first()
      .html(),
  ).toBe('This is paragraph 1');
});
