import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import * as viewTracking from '../../hooks/useViewTracker';
import { ReadTimeArticle, ReadTimeHomepage } from '.';

describe('ReadTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('On Article Page', () => {
    it('should render when readTime is supplied', () => {
      const { getByText } = render(
        <ReadTimeArticle readTimeValue={4} readTimeVariant="minutes" />,
      );
      expect(getByText('Estimated Read Time: 4 minutes')).toBeInTheDocument();
    });
    describe('view tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker', () => {
        render(<ReadTimeArticle readTimeValue={4} readTimeVariant="minutes" />);

        const expected = {
          componentName: 'read-time-on-article',
          experimentName: 'newswb_ws_article_read_time',
          experimentVariant: 'minutes',
          itemTracker: {
            duration: 240000,
            label: 'Read time: 4 minutes',
            type: 'read-time',
          },
          sendOptimizelyEvents: true,
        };

        expect(viewTrackerSpy).toHaveBeenCalledWith(expected);
      });
    });
  });
  describe('On Home Page', () => {
    it('should render when readTime is supplied', () => {
      const { getByText } = render(
        <ReadTimeHomepage readTimeValue={4} promoId="12345" />,
      );
      expect(getByText('Estimated Read Time: 4 minutes')).toBeInTheDocument();
    });
    describe('view tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker', () => {
        render(<ReadTimeHomepage readTimeValue={4} promoId="12345" />);

        const expected = {
          componentName: 'read-time',
          itemTracker: {
            duration: 240000,
            label: 'Read time: 4 minutes',
            resourceId: '12345',
          },
        };

        expect(viewTrackerSpy).toHaveBeenCalledWith(expected);
      });
    });
  });
});
