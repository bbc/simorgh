import React from 'react';
import { render } from 'enzyme';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import CaptionContainer from '.';
import { shouldMatchSnapshot } from '../../../testHelpers';
import { ServiceContext } from '../../contexts/ServiceContext';
import { blockContainingText } from '../../models/blocks';

const newsServiceContextStub = {
  imageCaptionOffscreenText: 'Image caption, ',
  videoCaptionOffscreenText: 'Video caption, ',
  defaultCaptionOffscreenText: 'Caption, ',
  script: latin,
};
const persianServiceContextStub = {
  imageCaptionOffscreenText: ' ، عنوان تصویر',
  videoCaptionOffscreenText: ' ، عنوان ویدئو',
  defaultCaptionOffscreenText: ' ، عنوان',
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

const CaptionWithContext = (block, contextStub, type) => (
  <ServiceContext.Provider value={contextStub}>
    <CaptionContainer block={block} type={type} />
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
  'should render caption with mutiple paragraphs',
  CaptionWithContext(captionBlock3Paragraphs, newsServiceContextStub),
);

describe('with offscreen text', () => {
  it('should render the default offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={captionBlock} />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').html()).toBe('Caption, ');
  });

  it('should render the video offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={captionBlock} type="video" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').html()).toBe('Video caption, ');
  });

  it('should render the image offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={captionBlock} type="image" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').html()).toBe('Image caption, ');
  });

  it('should render the persian image offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={persianServiceContextStub}>
        <CaptionContainer block={captionBlock} type="image" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').text()).toBe(' ، عنوان تصویر');
  });

  it('should render the persian video offscreen text', () => {
    const renderedWrapper = render(
      <ServiceContext.Provider value={persianServiceContextStub}>
        <CaptionContainer block={captionBlock} type="image" />
      </ServiceContext.Provider>,
    );
    expect(renderedWrapper.find('span').text()).toBe(' ، عنوان تصویر');
  });

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
});
