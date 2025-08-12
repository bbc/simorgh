import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import * as viewTracking from '../../hooks/useViewTracker';
import ReadTime from '.';

describe('ReadTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render when readTime is supplied', () => {
    const { getByText } = render(<ReadTime readTime={4} />);
    expect(getByText('Estimated Read Time: 4 minutes')).toBeInTheDocument();
  });
  describe('view tracking', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    it('should register view tracker', () => {
      render(<ReadTime readTime={4} readTimeVariant="foo" />);

      const expected = {
        componentName: 'read-time-on-article',
        experimentName: 'newswb_ws_article_read_time',
        experimentVariant: undefined,
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
