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

    expect(getByTestId('continue-reading-button')).toBeInTheDocument();
  });

  it('does not render the button when showAllContent is true', () => {
    const { queryByTestId } = render(
      <ContinueReadingButton
        showAllContent
        setShowAllContent={mockSetShowAllContent}
      />,
    );

    expect(queryByTestId('continue-reading-button')).not.toBeInTheDocument();
  });

  describe('Event Tracking', () => {
    const eventTrackingData = {
      componentName: 'continue-reading-button',
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

        const button = getByTestId('continue-reading-button') as HTMLElement;
        fireEvent.click(button);

        // Verify that the mockSetShowAllContent function is called
        expect(mockSetShowAllContent).toHaveBeenCalledTimes(1);

        // Verify that the click tracker handler is called
        expect(clickTrackerSpy).toHaveBeenCalled();
      });
    });
  });
});
