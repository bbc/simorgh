import React from 'react';
import {
  fireEvent,
  render,
} from '../../../components/react-testing-library-with-providers';
import ContinueReadingButton from './index';
import * as viewTracking from '../../../hooks/useViewTracker';
import * as clickTracking from '../../../hooks/useClickTrackerHandler';

describe('ContinueReadingButton', () => {
  const mockSetShowAllContent = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button when showAllContent is false', () => {
    const { getByTestId } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
      />,
    );

    expect(getByTestId('read-more-button')).toBeInTheDocument();
  });

  it('does not render the button when showAllContent is true', () => {
    const { queryByTestId } = render(
      <ContinueReadingButton
        showAllContent
        setShowAllContent={mockSetShowAllContent}
      />,
    );

    expect(queryByTestId('read-more-button')).not.toBeInTheDocument();
  });

  it('applies the correct styles for variation read-more-b', () => {
    const { getByTestId } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
      />,
    );

    const button = getByTestId('read-more-button');
    expect(button).toHaveStyle('background-color: #F6F6F6');
  });

  it('renders the SVG icon when variation is read-more-b', () => {
    const { container } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
      />,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies border-bottom for variation read-more-b', () => {
    const { getByTestId } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
      />,
    );

    const button = getByTestId('read-more-button');
    expect(button).toHaveStyle('border-bottom: 0.0625rem solid #B0B2B4');
  });

  describe('Event Tracking', () => {
    const eventTrackingData = {
      componentName: 'read-more-button',
      experimentName: 'newswb_ws_read_more_b',
      experimentVariant: 'read-more-b',
      sendOptimizelyEvents: true,
    };

    describe('View tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker if event tracking data provided', () => {
        render(
          <ContinueReadingButton
            showAllContent={false}
            setShowAllContent={mockSetShowAllContent}
          />,
        );

        expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
      });
    });

    describe('Click tracking', () => {
      let clickTrackerSpy: jest.SpyInstance;

      beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks
        clickTrackerSpy = jest
          .spyOn(clickTracking, 'default')
          // @ts-expect-error - Mocking the implementation of useClickTrackerHandler
          .mockImplementation(() => jest.fn());
      });

      it('should register click tracker if event tracking data provided', () => {
        render(
          <ContinueReadingButton
            showAllContent={false}
            setShowAllContent={mockSetShowAllContent}
          />,
        );

        expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
      });

      it('should handle a click event when button is clicked', () => {
        const { getByTestId } = render(
          <ContinueReadingButton
            showAllContent={false}
            setShowAllContent={mockSetShowAllContent}
          />,
        );

        const button = getByTestId('read-more-button') as HTMLElement;
        fireEvent.click(button);

        // Verify that the mockSetShowAllContent function is called
        expect(mockSetShowAllContent).toHaveBeenCalledTimes(1);

        // Verify that the click tracker handler is called
        expect(clickTrackerSpy).toHaveBeenCalled();
      });
    });
  });
});
