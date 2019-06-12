import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '../../../testHelpers/testHelpers';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import deepClone from '../../lib/json/deepClone';
import StoryPromo from '.';

let item;
const completeItem = {
  headlines: {
    headline: 'A headline',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
};

// eslint-disable-next-line react/prop-types
const WrappedStoryPromo = ({ platform, ...props }) => (
  <ServiceContextProvider service="igbo">
    <RequestContextProvider
      platform={platform || 'canonical'}
      isUK
      origin="https://www.bbc.co.uk"
      id="c0000000000o"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <StoryPromo {...props} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('StoryPromo Container', () => {
  shouldMatchSnapshot(
    'should render correctly for canonical',
    <WrappedStoryPromo platform="canonical" item={completeItem} />,
  );

  shouldMatchSnapshot(
    'should render correctly for amp',
    <WrappedStoryPromo platform="amp" item={completeItem} />,
  );

  describe('assertion tests', () => {
    beforeEach(() => {
      item = deepClone(completeItem);
    });

    it('should render h3, a, p, time', () => {
      const { container } = render(<WrappedStoryPromo item={item} />);

      expect(container.querySelectorAll('h3 a')[0].innerHTML).toEqual(
        item.headlines.headline,
      );
      expect(container.getElementsByTagName('p')[0].innerHTML).toEqual(
        item.summary,
      );
      expect(container.getElementsByTagName('time')[0].innerHTML).toEqual(
        '2 May 2019',
      );
    });

    it('should render img with src & alt when platform is canonical', () => {
      const { container } = render(
        <WrappedStoryPromo platform="canonical" item={item} />,
      );

      expect(container.getElementsByTagName('img').length).toEqual(1);
      expect(container.getElementsByTagName('amp-img').length).toEqual(0);
      expect(
        container.getElementsByTagName('img')[0].getAttribute('src'),
      ).toEqual(`https://ichef.bbci.co.uk/news/660${item.indexImage.path}`);
      expect(
        container.getElementsByTagName('img')[0].getAttribute('alt'),
      ).toEqual(item.indexImage.altText);
    });

    it('should render amp-img with src & alt when platform is amp', () => {
      const { container } = render(
        <WrappedStoryPromo platform="amp" item={item} />,
      );

      expect(container.getElementsByTagName('amp-img').length).toEqual(1);
      expect(container.getElementsByTagName('img').length).toEqual(0);
      expect(
        container.getElementsByTagName('amp-img')[0].getAttribute('src'),
      ).toEqual(`https://ichef.bbci.co.uk/news/660${item.indexImage.path}`);
      expect(
        container.getElementsByTagName('amp-img')[0].getAttribute('alt'),
      ).toEqual(item.indexImage.altText);
    });

    describe('With no headline provided', () => {
      beforeEach(() => {
        delete item.headlines;
      });

      it('should not include a headline element', () => {
        const { container } = render(<WrappedStoryPromo item={item} />);

        expect(container.getElementsByTagName('h3').length).toEqual(0);
      });
    });

    describe('With no summary provided', () => {
      beforeEach(() => {
        delete item.summary;
      });

      it('should not include a paragraph element', () => {
        const { container } = render(<WrappedStoryPromo item={item} />);

        expect(container.getElementsByTagName('p').length).toEqual(0);
      });
    });

    describe('With no timestamp provided', () => {
      beforeEach(() => {
        delete item.timestamp;
      });

      it('should not include a time element', () => {
        const { container } = render(<WrappedStoryPromo item={item} />);

        expect(container.getElementsByTagName('time').length).toEqual(0);
      });
    });

    describe('With no indexImage provided', () => {
      beforeEach(() => {
        delete item.indexImage;
      });

      it('should not include an img element', () => {
        const { container } = render(<WrappedStoryPromo item={item} />);

        expect(container.getElementsByTagName('img').length).toEqual(0);
      });
    });
  });
});
