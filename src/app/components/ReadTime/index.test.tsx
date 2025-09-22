import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import * as viewTracking from '../../hooks/useViewTracker';
import { ReadTimeArticleExperiment, ReadTime } from '.';

describe('ReadTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.each([
    {
      variant: 'Minute variant',
      variantKey: 'below_headline_minutes_bold',
      expectedCopy: 'Tiempo de lectura: 4 min',
    },
    {
      variant: 'Quick/Read variant',
      variantKey: 'below_timestamp_quick_long_bold',
      expectedCopy: 'Lectura rápida',
    },
  ])(
    'should render $expectedCopy when readTime is supplied with a $variant variant',
    ({ variantKey, expectedCopy }) => {
      const { getByText } = render(
        <ReadTime
          readTimeValue={4}
          promoId="12345"
          readTimeVariant={variantKey}
        />,
        { service: 'mundo' },
      );
      expect(getByText(expectedCopy)).toBeInTheDocument();
    },
  );
  it('Optimizely - Should render a blank div for a control variant', () => {
    const container = render(
      <ReadTime readTimeValue={4} promoId="12345" readTimeVariant="control" />,
    );
    expect(container.queryByTestId('read-time')).not.toBeInTheDocument();
  });
  describe('view tracking', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    it('should register view tracker', () => {
      render(
        <ReadTime
          readTimeValue={4}
          promoId="12345"
          readTimeVariant="minutes"
        />,
        { service: 'mundo' },
      );

      const expected = {
        componentName: 'read-time',
        experimentName: 'newswb_ws_homepage_read_time',
        experimentVariant: 'minutes',
        sendOptimizelyEvents: true,
        itemTracker: {
          duration: 240000,
          label: 'Read time: 4 minutes',
          resourceId: '12345',
        },
      };

      expect(viewTrackerSpy).toHaveBeenCalledWith(expected);
    });
  });
  describe('On Article Page Experiment', () => {
    it('should render when readTime is supplied', () => {
      const { getByText } = render(
        <ReadTimeArticleExperiment
          readTimeValue={4}
          readTimeVariant="minutes"
        />,
      );
      expect(getByText('Estimated Read Time: 4 minutes')).toBeInTheDocument();
    });
    describe('view tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker', () => {
        render(
          <ReadTimeArticleExperiment
            readTimeValue={4}
            readTimeVariant="minutes"
          />,
        );

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
});
