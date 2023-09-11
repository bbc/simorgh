// import { render } from '../react-testing-library-with-providers';
// import {
//   FigureImage,
//   FigureAmpImage,
//   FigureLazyLoadImage,
//   FigureImageWithCaption,
//   FigureAmpImageWithCaption,
//   FigureImageWithCopyright,
//   FigureImageWithNestedGrid,
//   FigureAmpImageWithCopyright,
//   FigureImageWithCopyrightAndCaption,
//   FigureAmpImageWithCopyrightAndCaption,
//   FigureImageWithCaptionContainingLink,
//   FigureAmpImageWithCaptionContainingLink,
// } from './fixtureData';

// describe('ArticleFigure', () => {
//   it('should load lazyload component when lazyLoad prop is set to true', () => {
//     const { container } = render(FigureLazyLoadImage);

//     const noScriptEl = container.querySelector('noscript');
//     const imageEl = container.querySelector('img');

//     expect(noScriptEl).toBeInTheDocument();
//     expect(imageEl).not.toBeInTheDocument();
//   });

//   it('should render a lazyloaded image when lazyLoad set to true', () => {
//     const { container } = render(FigureLazyLoadImage);

//     expect(container.firstChild).toMatchSnapshot();
//   });

//   it('should render an image with alt text', () => {
//     const { container } = render(FigureImage);

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an AMP image with alt text', () => {
//     const { container } = render(FigureAmpImage);

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an image with copyright text', () => {
//     const { container } = render(FigureImageWithCopyright);

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an AMP image with copyright text', () => {
//     const { container } = render(FigureAmpImageWithCopyright);

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an image with caption text', () => {
//     const { container } = render(FigureImageWithCaption('news'));

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an AMP image with caption text', () => {
//     const { container } = render(FigureAmpImageWithCaption('news'));

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an image with caption text with inline link', () => {
//     const { container } = render(FigureImageWithCaptionContainingLink);

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an AMP image with caption text with inline link', () => {
//     const { container } = render(FigureAmpImageWithCaptionContainingLink);

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an image with caption and copyright', () => {
//     const { container } = render(FigureImageWithCopyrightAndCaption);

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an AMP image with caption and copyright', () => {
//     const { container } = render(FigureAmpImageWithCopyrightAndCaption);

//     expect(container).toMatchSnapshot();
//   });

//   it('should render an image and caption for a square with nested grid', () => {
//     const { container } = render(FigureImageWithNestedGrid(1240, 1240));

//     expect(container).toMatchSnapshot();
//   });
//   it('should render an image and caption for a portrait with nested grid', () => {
//     const { container } = render(FigureImageWithNestedGrid(600, 1240));

//     expect(container).toMatchSnapshot();
//   });
// });

import React from 'react';
import {
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { blockContainingText, blockArrayModel } from '#models/blocks';
import {
  render,
  screen,
  waitFor,
} from '../react-testing-library-with-providers';

import ImageContainer from './index';

describe('Image', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'array']);
    // @ts-expect-error - image block is missing
    isNull('should return null', <ImageContainer sizes="100vw" />);
  });
  describe('with data', () => {
    const rawImageBlock = {
      type: 'rawImage',
      model: {
        width: 640,
        height: 420,
        locator: '439A/production/_100960371_syrians_and_asylum_v2-nc.png',
        originCode: 'cpsprodpb',
        copyrightHolder: 'BBC',
      },
    };
    const rawImageBlockWithNonBbcCopyright = {
      type: 'rawImage',
      model: {
        width: 640,
        height: 420,
        locator: '439A/production/_100960371_syrians_and_asylum_v2-nc.png',
        originCode: 'cpsprodpb',
        copyrightHolder: 'Getty images',
      },
    };
    const rawImageBlockWithOtherOriginCode = {
      type: 'rawImage',
      model: {
        width: 640,
        height: 420,
        locator: '439A/production/_100960371_syrians_and_asylum_v2-nc.png',
        originCode: 'other',
        copyrightHolder: 'Getty images',
      },
    };
    const data = blockArrayModel([
      rawImageBlock,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        'mock-id-1',
      ),
    ]);
    const dataWithoutRawImageBlock = blockArrayModel([
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        'mock-id-2',
      ),
    ]);
    const dataWithoutAltText = blockArrayModel([rawImageBlock, null]);
    describe('with no rawImageBlock', () => {
      suppressPropWarnings(['Missing', 'rawImage']);
      isNull(
        'should return null',
        <ImageContainer sizes="100vw" {...dataWithoutRawImageBlock} />,
      );
    });
    describe('with no altTextBlock', () => {
      suppressPropWarnings(['type', 'null']);
      it('should not render the image', () => {
        render(<ImageContainer sizes="100vw" {...dataWithoutAltText} />);
        const imgEl = screen.queryByAltText(
          'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        );
        expect(imgEl).not.toBeInTheDocument();
      });
    });
    it('should render an image with alt text', () => {
      render(<ImageContainer sizes="100vw" {...data} />);
      const imgEl = screen.getByAltText(
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
      );
      expect(imgEl).toBeInTheDocument();
    });
    it('should render an image with a sizes attribute', () => {
      render(<ImageContainer sizes="100vw" {...data} />);
      const sourceEl = document.querySelector('img');
      const sizesAttribute = sourceEl?.getAttribute('sizes');
      expect(sizesAttribute).toBe('100vw');
    });
    it('should render a lazyload container and not preload the image if the image is after the 4th block', () => {
      const { container } = render(
        <ImageContainer sizes="100vw" position={[5]} {...data} shouldPreload />,
      );
      const noScriptEl = document.querySelector('noscript');
      const imageEl = document.querySelector('img');
      const linkPreload = document.querySelector('head link');
      expect(linkPreload).not.toBeInTheDocument();
      expect(noScriptEl).toBeInTheDocument();
      expect(imageEl).not.toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
    it('should preload an image if the image is before the 5th block', async () => {
      render(
        <ImageContainer sizes="100vw" position={[4]} {...data} shouldPreload />,
      );
      await waitFor(() => {
        const linkPreload = document.querySelector('head link');
        expect(linkPreload).toBeInTheDocument();
      });
    });
    it('should not preload an image if the image is before the 5th block but shouldPreload is false', async () => {
      render(
        <ImageContainer
          sizes="100vw"
          position={[4]}
          {...data}
          shouldPreload={false}
        />,
      );
      await waitFor(() => {
        const linkPreload = document.querySelector('head link');
        expect(linkPreload).not.toBeInTheDocument();
      });
    });
    const dataWithNonBbcCopyright = blockArrayModel([
      rawImageBlockWithNonBbcCopyright,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        'mock-id-3',
      ),
    ]);
    it('should render an image with alt text and offscreen copyright', () => {
      const { container } = render(
        <ImageContainer sizes="100vw" {...dataWithNonBbcCopyright} />,
        { service: 'news' },
      );
      expect(container).toMatchSnapshot();
    });
    const dataWithCaption = blockArrayModel([
      rawImageBlock,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        'mock-id-4',
      ),
      blockContainingText(
        'caption',
        'Study by the Home Office about the Syrian Vulnerable Persons Resettlement Scheme',
        'mock-id-5',
      ),
    ]);
    it('should render an image with alt text and caption', () => {
      const { container } = render(
        <ImageContainer sizes="100vw" {...dataWithCaption} />,
        { service: 'news' },
      );
      expect(container).toMatchSnapshot();
    });
    const dataWithOtherOriginCode = blockArrayModel([
      rawImageBlockWithOtherOriginCode,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        'mock-id-6',
      ),
    ]);
    it('should render an image with other originCode - this would be a broken image', () => {
      const { container } = render(
        <ImageContainer sizes="100vw" {...dataWithOtherOriginCode} />,
        { service: 'news' },
      );
      expect(container).toMatchSnapshot();
    });
  });
});
