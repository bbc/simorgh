import React from 'react';
import { render } from '@testing-library/react';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import CaptionContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';
import { blockContainingText } from '#models/blocks';

const newsServiceContextStub = {
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  defaultCaptionOffscreenText: 'Caption, ',
  script: latin,
  service: 'news',
};
const persianServiceContextStub = {
  imageCaptionOffscreenText: ' ، عنوان تصویر',
  videoCaptionOffscreenText: ' ، عنوان ویدئو',
  defaultCaptionOffscreenText: ' ، عنوان',
  script: arabic,
  service: 'persian',
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
                    id: 1,
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
                    id: 2,
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
                    id: 3,
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

const CaptionWithContext = (block, contextStub, type) => (
  <ServiceContext.Provider value={contextStub}>
    <CaptionContainer block={block} type={type} />
  </ServiceContext.Provider>
);

shouldMatchSnapshot(
  'should render caption text with example News offscreen text',
  CaptionWithContext(captionBlock, newsServiceContextStub, 'caption'),
);

shouldMatchSnapshot(
  'should render caption text with example Farsi offscreen text',
  CaptionWithContext(captionBlock, persianServiceContextStub, 'caption'),
);

shouldMatchSnapshot(
  'should render caption with mutiple paragraphs',
  CaptionWithContext(
    captionBlock3Paragraphs,
    newsServiceContextStub,
    'caption',
  ),
);

describe('with offscreen text', () => {
  it('should render the default offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={captionBlock} type="caption" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual('Caption, ');
  });

  it('should render the video offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={captionBlock} type="video" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual(
      'Video caption, ',
    );
  });

  it('should render the image offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={captionBlock} type="image" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual(
      'Image caption, ',
    );
  });

  it('should render the persian image offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={persianServiceContextStub}>
        <CaptionContainer block={captionBlock} type="image" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual(
      ' ، عنوان تصویر',
    );
  });

  it('should render the persian video offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={persianServiceContextStub}>
        <CaptionContainer block={captionBlock} type="image" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual(
      ' ، عنوان تصویر',
    );
  });

  it('should render figcaption with multiple paragraphs', () => {
    const { container } = render(
      CaptionWithContext(
        captionBlock3Paragraphs,
        newsServiceContextStub,
        'caption',
      ),
    );
    expect(container.querySelectorAll('figcaption p').length).toEqual(3);
    expect(container.querySelector('figcaption p').textContent).toEqual(
      'This is paragraph 1',
    );
  });
});
