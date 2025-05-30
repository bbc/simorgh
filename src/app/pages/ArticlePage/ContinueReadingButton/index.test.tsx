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
        variation="read_more_a"
      />,
    );

    expect(getByTestId('read_more_button')).toBeInTheDocument();
  });

  it('does not render the button when showAllContent is true', () => {
    const { queryByTestId } = render(
      <ContinueReadingButton
        showAllContent
        setShowAllContent={mockSetShowAllContent}
        variation="read_more_a"
      />,
    );

    expect(queryByTestId('read_more_button')).not.toBeInTheDocument();
  });

  it('applies the correct styles for variation read_more_a', () => {
    const { getByTestId } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
        variation="read_more_a"
      />,
    );

    const button = getByTestId('read_more_button');
    expect(button).toHaveStyle('background-color: #141414');
  });

  it('applies the correct styles for variation read_more_a_and_top_stories', () => {
    const { getByTestId } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
        variation="read_more_a_and_top_stories"
      />,
    );

    const button = getByTestId('read_more_button');
    expect(button).toHaveStyle('background-color: #141414');
  });

  it('applies the correct styles for variation read_more_b', () => {
    const { getByTestId } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
        variation="read_more_b"
      />,
    );

    const button = getByTestId('read_more_button');
    expect(button).toHaveStyle('background-color: #F6F6F6');
  });

  it('renders the SVG icon when variation is read_more_b', () => {
    const { container } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
        variation="read_more_b"
      />,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('does not render the SVG icon when variation is read_more_a', () => {
    const { container } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
        variation="read_more_a"
      />,
    );

    const svg = container.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  it('applies border-bottom for variation read_more_b', () => {
    const { getByTestId } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
        variation="read_more_b"
      />,
    );

    const button = getByTestId('read_more_button');
    expect(button).toHaveStyle('border-bottom: 0.0625rem solid #B0B2B4');
  });

  it('does not apply border-bottom for variation read_more_a', () => {
    const { getByTestId } = render(
      <ContinueReadingButton
        showAllContent={false}
        setShowAllContent={mockSetShowAllContent}
        variation="read_more_a"
      />,
    );

    const button = getByTestId('read_more_button');
    expect(button.style.borderBottom).toBe('');
  });

  describe('Event Tracking', () => {
    const eventTrackingData = {
      componentName: 'read_more_button',
      sendOptimizelyEvents: true,
    };

    describe('View tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker if event tracking data provided', () => {
        render(
          <ContinueReadingButton
            showAllContent={false}
            setShowAllContent={mockSetShowAllContent}
            variation="read_more_a"
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
            variation="read_more_a"
          />,
        );

        expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
      });

      it('should handle a click event when button is clicked', () => {
        const { getByTestId } = render(
          <ContinueReadingButton
            showAllContent={false}
            setShowAllContent={mockSetShowAllContent}
            variation="read_more_a"
          />,
        );

        const button = getByTestId('read_more_button') as HTMLElement;
        fireEvent.mouseDown(button);

        // Verify that the mockSetShowAllContent function is called
        expect(mockSetShowAllContent).toHaveBeenCalledTimes(1);

        // Verify that the click tracker handler is called
        expect(clickTrackerSpy).toHaveBeenCalled();
      });
    });
  });
});
