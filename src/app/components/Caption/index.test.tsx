import React from 'react';
import { v4 as uuid } from 'uuid';
import { blockContainingText } from '#models/blocks';
import { OptimoBlock } from '#app/models/types/optimo';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import CaptionContainer from '.';
import latin from '../ThemeProvider/fontScripts/latin';
import arabic from '../ThemeProvider/fontScripts/arabic';
import { render } from '../react-testing-library-with-providers';

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

const fragmentBlock = ({
  text,
  attributes = [],
}: {
  text: string;
  attributes?: string[];
}) => ({
  type: 'fragment',
  id: uuid(),
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = ({
  text,
  locator,
  blocks,
  isExternal,
}: {
  text: string;
  locator: string;
  blocks: OptimoBlock[];
  isExternal: boolean;
}) => ({
  type: 'urlLink',
  id: uuid(),
  model: {
    text,
    locator,
    blocks,
    isExternal,
  },
});

const inlineSpanBlock = ({
  blocks,
  language,
  text,
}: {
  text: string;
  language: string;
  blocks: OptimoBlock[];
}) => ({
  type: 'inline',
  id: uuid,
  model: {
    blocks,
    language,
    text,
  },
});

const persianText = 'چیسربرگر';
const persianLink = inlineLinkBlock({
  text: persianText,
  locator: 'https://google.com',
  blocks: [fragmentBlock({ text: persianText })],
  isExternal: true,
});

const inlinePersianBlock = inlineSpanBlock({
  blocks: [persianLink],
  language: 'fa',
  text: persianText,
});

const blocksWithInline = {
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  fragmentBlock({
                    text: 'This is some text.',
                    attributes: ['bold'],
                  }),
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

const CaptionWithContext = ({
  block,
  contextStub,
  type,
}: {
  block: OptimoBlock[];
  contextStub: ServiceConfig;
  type: string;
}) => (
  <ServiceContext.Provider value={contextStub}>
    <CaptionContainer block={block} type={type} />
  </ServiceContext.Provider>
);

it('should render caption text with example News offscreen text', () => {
  const { container } = render(
    CaptionWithContext({
      block: captionBlock,
      contextStub: newsServiceContextStub as ServiceConfig,
      type: 'caption',
    }),
  );
  expect(container).toMatchSnapshot();
});

it('should render caption text with example Farsi offscreen text', () => {
  const { container } = render(
    CaptionWithContext(captionBlock, persianServiceContextStub, 'caption'),
  );
  expect(container).toMatchSnapshot();
});

it('should render caption with multiple paragraphs', () => {
  const { container } = render(
    CaptionWithContext(
      captionBlock3Paragraphs,
      newsServiceContextStub,
      'caption',
    ),
  );
  expect(container).toMatchSnapshot();
});

it('should render correctly with inline block', () => {
  const { container } = render(
    CaptionWithContext(blocksWithInline, newsServiceContextStub, 'caption'),
  );
  expect(container).toMatchSnapshot();
});

describe('with offscreen text', () => {
  it('should render the default offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={captionBlock} type="caption" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual(
      'Caption, Some caption text...',
    );
  });

  it('should render the video offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={captionBlock} type="video" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual(
      'Video caption, Some caption text...',
    );
  });

  it('should render the image offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={newsServiceContextStub}>
        <CaptionContainer block={captionBlock} type="image" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual(
      'Image caption, Some caption text...',
    );
  });

  it('should render the persian image offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={persianServiceContextStub}>
        <CaptionContainer block={captionBlock} type="image" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual(
      ' ، عنوان تصویرSome caption text...',
    );
  });

  it('should render the persian video offscreen text', () => {
    const { container } = render(
      <ServiceContext.Provider value={persianServiceContextStub}>
        <CaptionContainer block={captionBlock} type="image" />
      </ServiceContext.Provider>,
    );
    expect(container.querySelector('span').textContent).toEqual(
      ' ، عنوان تصویرSome caption text...',
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
