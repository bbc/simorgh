import React from 'react';
import { OptimoBlock } from '#app/models/types/optimo';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import CaptionContainer from '.';
import latin from '../ThemeProvider/fontScripts/latin';
import arabic from '../ThemeProvider/fontScripts/arabic';
import { render } from '#components/react-testing-library-with-providers';
import captionBlock, {
  captionBlock3Paragraphs,
  blocksWithInline,
} from './fixture';

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

const CaptionWithContext = ({
  block,
  contextStub,
  type,
}: {
  block: OptimoBlock;
  contextStub: ServiceConfig;
  type: string;
}) => (
  <ServiceContext.Provider value={contextStub}>
    <CaptionContainer block={block} type={type} />
  </ServiceContext.Provider>
);

describe('Captions', () => {
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
      CaptionWithContext({
        block: captionBlock,
        contextStub: persianServiceContextStub as ServiceConfig,
        type: 'caption',
      }),
    );
    expect(container).toMatchSnapshot();
  });

  it('should render caption with multiple paragraphs', () => {
    const { container } = render(
      CaptionWithContext({
        block: captionBlock3Paragraphs,
        contextStub: newsServiceContextStub as ServiceConfig,
        type: 'caption',
      }),
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with inline block', () => {
    const { container } = render(
      CaptionWithContext({
        block: blocksWithInline,
        contextStub: newsServiceContextStub as ServiceConfig,
        type: 'caption',
      }),
    );
    expect(container).toMatchSnapshot();
  });

  describe('with offscreen text', () => {
    it('should render the default offscreen text', () => {
      const { container } = render(
        <ServiceContext.Provider
          value={newsServiceContextStub as ServiceConfig}
        >
          <CaptionContainer block={captionBlock} type="caption" />
        </ServiceContext.Provider>,
      );
      expect(container.querySelector('span')?.textContent).toEqual(
        'Caption, Some caption text...',
      );
    });

    it('should render the video offscreen text', () => {
      const { container } = render(
        <ServiceContext.Provider
          value={newsServiceContextStub as ServiceConfig}
        >
          <CaptionContainer block={captionBlock} type="video" />
        </ServiceContext.Provider>,
      );
      expect(container.querySelector('span')?.textContent).toEqual(
        'Video caption, Some caption text...',
      );
    });

    it('should render the image offscreen text', () => {
      const { container } = render(
        <ServiceContext.Provider
          value={newsServiceContextStub as ServiceConfig}
        >
          <CaptionContainer block={captionBlock} type="image" />
        </ServiceContext.Provider>,
      );
      expect(container.querySelector('span')?.textContent).toEqual(
        'Image caption, Some caption text...',
      );
    });

    it('should render the persian image offscreen text', () => {
      const { container } = render(
        <ServiceContext.Provider
          value={persianServiceContextStub as ServiceConfig}
        >
          <CaptionContainer block={captionBlock} type="image" />
        </ServiceContext.Provider>,
      );
      expect(container.querySelector('span')?.textContent).toEqual(
        ' ، عنوان تصویرSome caption text...',
      );
    });

    it('should render the persian video offscreen text', () => {
      const { container } = render(
        <ServiceContext.Provider
          value={persianServiceContextStub as ServiceConfig}
        >
          <CaptionContainer block={captionBlock} type="image" />
        </ServiceContext.Provider>,
      );
      expect(container.querySelector('span')?.textContent).toEqual(
        ' ، عنوان تصویرSome caption text...',
      );
    });

    it('should render figcaption with multiple paragraphs', () => {
      const { getAllByTestId } = render(
        CaptionWithContext({
          block: captionBlock3Paragraphs,
          contextStub: newsServiceContextStub as ServiceConfig,
          type: 'caption',
        }),
      );
      const elementsWithTestId = getAllByTestId('caption-paragraph');

      expect(elementsWithTestId.length).toEqual(3);
      expect(elementsWithTestId[0].textContent).toEqual('This is paragraph 1');
    });
  });
});
