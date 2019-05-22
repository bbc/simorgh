import React from 'react';
import { render } from 'react-testing-library';
import { RequestContextProvider } from '../../contexts/RequestContext';
import {
  shouldShallowMatchSnapshot,
  isNull,
} from '../../helpers/tests/testHelpers';
import StoryPromoFigure from './Figure';

const imageProps = {
  path: '/foobar.png',
  altText: 'Alt text for an image',
  height: 120,
  width: 340,
  copyrightHolder: 'Image provider',
};

describe('StoryPromo Figure Container', () => {
  shouldShallowMatchSnapshot(
    'should render correctly',
    <StoryPromoFigure {...imageProps} />,
  );

  isNull('should render null when no props provided', <StoryPromoFigure />);

  isNull(
    'should null when some props are missing',
    <StoryPromoFigure path="/foobar.png" height={120} width={340} />,
  );

  describe('Story Promo Figure', () => {
    it('should render img when no platform provided', () => {
      const { container } = render(<StoryPromoFigure {...imageProps} />);

      expect(container.getElementsByTagName('img').length).toEqual(1);
      expect(container.getElementsByTagName('amp-img').length).toEqual(0);
    });

    it('should render img tag with src, alt & width attribute when platform is canonical', () => {
      const { container } = render(
        <RequestContextProvider
          platform="canonical"
          isUK
          origin="https://www.bbc.co.uk"
          id="c0000000000o"
          statsDestination="NEWS_PS_TEST"
          statsPageIdentifier="news.articles.c0000000000o"
        >
          <StoryPromoFigure {...imageProps} />
        </RequestContextProvider>,
      );

      expect(container.getElementsByTagName('img').length).toEqual(1);
      expect(container.getElementsByTagName('amp-img').length).toEqual(0);

      const image = container.getElementsByTagName('img')[0];

      expect(image.getAttribute('src')).toEqual(
        `https://ichef.bbci.co.uk/news/660${imageProps.path}`,
      );
      expect(image.getAttribute('alt')).toEqual(imageProps.altText);
      expect(image.getAttribute('width')).toEqual(imageProps.width.toString());
    });

    it('should render amp-img tag with src, alt & width attribute when platform is amp', () => {
      const { container } = render(
        <RequestContextProvider platform="amp">
          <StoryPromoFigure {...imageProps} />
        </RequestContextProvider>,
      );

      expect(container.getElementsByTagName('img').length).toEqual(0);
      expect(container.getElementsByTagName('amp-img').length).toEqual(1);

      const ampImage = container.getElementsByTagName('amp-img')[0];

      expect(ampImage.getAttribute('src')).toEqual(
        `https://ichef.bbci.co.uk/news/660${imageProps.path}`,
      );
      expect(ampImage.getAttribute('alt')).toEqual(imageProps.altText);
      expect(ampImage.getAttribute('height')).toEqual(
        imageProps.height.toString(),
      );
      expect(ampImage.getAttribute('width')).toEqual(
        imageProps.width.toString(),
      );
      expect(ampImage.getAttribute('attribution')).toEqual(
        imageProps.copyrightHolder,
      );
      expect(ampImage.getAttribute('layout')).toEqual('responsive');
    });
  });
});
