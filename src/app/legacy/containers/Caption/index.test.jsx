import React from 'react';
import { v4 as uuid } from 'uuid';
import { render } from '@testing-library/react';
import { blockContainingText } from '#models/blocks';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContext } from '../../../contexts/ServiceContext';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../components/ThemeProvider/fontScripts/arabic';
import CaptionContainer from '.';

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

const captionBlock = blockContainingText(
  'caption',
  'Some caption text...',
  'mocked-id',
);

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  id: uuid(),
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = (text, locator, blocks, isExternal) => ({
  type: 'urlLink',
  id: uuid(),
  model: {
    text,
    locator,
    blocks,
    isExternal,
  },
});

const inlineSpanBlock = (blocks, language, text) => ({
  type: 'inline',
  id: uuid,
  model: {
    blocks,
    language,
    text,
  },
});

const persianText = 'چیسربرگر';
const persianLink = inlineLinkBlock(
  persianText,
  'https://google.com',
  [fragmentBlock(persianText)],
  true,
);

const inlinePersianBlock = inlineSpanBlock([persianLink], 'fa', persianText);

const blocksWithInline = {
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  fragmentBlock('This is some text.', ['bold']),
                  inlinePersianBlock,
                ],
              },
              type: 'text',
            },
          ],
        },
        type: 'caption',
      },
    ],
  },
};

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
  'should render caption with multiple paragraphs',
  CaptionWithContext(
    captionBlock3Paragraphs,
    newsServiceContextStub,
    'caption',
  ),
);

shouldMatchSnapshot(
  'should render correctly with inline block',
  CaptionWithContext(blocksWithInline, newsServiceContextStub, 'caption'),
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
