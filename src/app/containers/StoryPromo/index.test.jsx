import React from 'react';
import { render } from 'react-testing-library';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import StoryPromo from '.';

let item = {
  headlines: {
    headline: 'A headline',
  },
  summary: 'Summary text',
  timestamp: 1556795033,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
  },
};

describe('StoryPromo Container', () => {
  shouldMatchSnapshot('should render correctly', <StoryPromo item={item} />);

  describe('assertion tests', () => {
    beforeEach(() => {
      item = {
        headlines: {
          headline: 'A headline',
        },
        summary: 'Summary text',
        timestamp: 1556795033,
        indexImage: {
          path: '/cpsprodpb/0A06/production/image.jpg',
          height: 1152,
          width: 2048,
          altText: 'Image Alt text',
        },
      };
    });

    it('should correctly include expected elements', () => {
      const { container } = render(<StoryPromo item={item} />);

      expect(container.getElementsByTagName('h3')[0].innerHTML).toEqual(
        item.headlines.headline,
      );
      expect(container.getElementsByTagName('p')[0].innerHTML).toEqual(
        item.summary,
      );
      expect(container.getElementsByTagName('time')[0].innerHTML).toEqual(
        '2 May 2019',
      );
      expect(container.getElementsByTagName('img')[0].src).toEqual(
        `https://ichef.bbci.co.uk/news/660${item.indexImage.path}`,
      );
      expect(
        container.getElementsByTagName('img')[0].getAttribute('alt'),
      ).toEqual(item.indexImage.altText);
    });

    describe('With no headline provided', () => {
      beforeEach(() => {
        delete item.headlines;
      });

      it('should not include a headline element', () => {
        const { container } = render(<StoryPromo item={item} />);

        expect(container.getElementsByTagName('h3').length).toEqual(0);
      });
    });

    describe('With no summary provided', () => {
      beforeEach(() => {
        delete item.summary;
      });

      it('should not include a paragraph element', () => {
        const { container } = render(<StoryPromo item={item} />);

        expect(container.getElementsByTagName('p').length).toEqual(0);
      });
    });

    describe('With no timestamp provided', () => {
      beforeEach(() => {
        delete item.timestamp;
      });

      it('should not include a time element', () => {
        const { container } = render(<StoryPromo item={item} />);

        expect(container.getElementsByTagName('time').length).toEqual(0);
      });
    });

    describe('With no indexImage provided', () => {
      beforeEach(() => {
        delete item.indexImage;
      });

      it('should not include a time element', () => {
        const { container } = render(<StoryPromo item={item} />);

        expect(container.getElementsByTagName('img').length).toEqual(0);
      });
    });
  });
});
