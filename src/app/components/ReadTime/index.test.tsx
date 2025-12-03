import { render } from '#app/components/react-testing-library-with-providers';
import * as viewTracking from '../../hooks/useViewTracker';
import { ReadTimeArticleExperiment, ReadTime } from '.';

describe('ReadTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it.each([
    {
      variant: 'Long Read Numerical',
      variantKey: 'long_read_numerical',
      expectedCopy: 'Read time: 4 min',
      readTimeValue: 4,
    },
    {
      variant: 'Long Read Numerical',
      variantKey: 'long_read_numerical',
      expectedCopy: 'Read time: 6 min',
      readTimeValue: 6,
    },
    {
      variant: 'Long Read Written',
      variantKey: 'long_read_written',
      expectedCopy: 'Long read',
      readTimeValue: 7,
    },
  ])(
    'should render $expectedCopy when readTime is supplied with a $variant variant',
    ({ variantKey, expectedCopy, readTimeValue }) => {
      const { getByText } = render(
        <ReadTime
          readTimeValue={readTimeValue}
          promoId="12345"
          readTimeVariant={variantKey}
        />,
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
          readTimeVariant="long_read_numerical"
        />,
      );

      const expected = {
        componentName: 'read-time',
        experimentName: 'newswb_ws_homepage_read_time',
        experimentVariant: 'long_read_numerical',
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
          readTimeVariant="long_read_numerical"
        />,
      );
      expect(getByText('Read time: 4 min')).toBeInTheDocument();
    });
    describe('view tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker', () => {
        render(
          <ReadTimeArticleExperiment
            readTimeValue={4}
            readTimeVariant="long_read_numerical"
          />,
        );

        const expected = {
          componentName: 'read-time-on-article',
          experimentName: 'newswb_ws_article_read_time_2',
          experimentVariant: 'long_read_numerical',
          itemTracker: {
            duration: 240000,
            label: 'Read time: 4 min',
            type: 'read-time',
          },
          sendOptimizelyEvents: true,
        };

        expect(viewTrackerSpy).toHaveBeenCalledWith(expected);
      });
    });
  });
});
