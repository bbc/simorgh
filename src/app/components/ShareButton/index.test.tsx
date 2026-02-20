import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import userEvent from '@testing-library/user-event';
import ShareButton from '.';

const share = jest.fn().mockImplementation(() => Promise.resolve());
Object.assign(navigator, {
  share,
});

describe('ShareButton', () => {
  const mockLivePagePostShareButtonProps = {
    eventTrackingData: {
      componentName: 'share-button-live-page-post',
      itemTracker: {
        resourceId: 'urn:foo',
      },
    },
    contentId: 'urn:foo',
    title: 'Share this post',
  };

  const mockPortraitVideoShareButtonProps = {
    eventTrackingData: {
      componentName: 'share-button-portrait-video-carousel',
      itemTracker: {
        resourceId: 'urn:foo',
      },
    },
    url: 'myUrl',
    title: 'Share this video',
  };

  describe('Live Page Post', () => {
    it('should call the navigator share api when clicked', async () => {
      const user = userEvent.setup();
      await act(async () => {
        render(<ShareButton {...mockLivePagePostShareButtonProps} />);
      });

      const shareButton = screen.getByRole('button');
      await user.click(shareButton);

      expect(navigator.share).toHaveBeenCalled();
      expect(navigator.share).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining(
            `${mockLivePagePostShareButtonProps.contentId}`,
          ),
          title: 'Share this post',
        }),
      );
    });
    it('should call the click tracking hook with the correct params', async () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      const user = userEvent.setup();
      await act(async () => {
        render(<ShareButton {...mockLivePagePostShareButtonProps} />);
      });
      const shareButton = screen.getByRole('button');
      await user.click(shareButton);

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'share-button-live-page-post',
        itemTracker: {
          resourceId: 'urn:foo',
        },
      });
    });
  });

  describe('Portrait Video', () => {
    it('should call the navigator share api when clicked', async () => {
      const user = userEvent.setup();
      await act(async () => {
        render(<ShareButton {...mockPortraitVideoShareButtonProps} />);
      });

      const shareButton = screen.getByRole('button');
      await user.click(shareButton);

      expect(navigator.share).toHaveBeenCalled();
      expect(navigator.share).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining(
            `${mockPortraitVideoShareButtonProps.url}`,
          ),
          title: 'Share this video',
        }),
      );
    });

    it('should call the click tracking hook with the correct params', async () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      const user = userEvent.setup();
      await act(async () => {
        render(<ShareButton {...mockPortraitVideoShareButtonProps} />);
      });
      const shareButton = screen.getByRole('button');
      await user.click(shareButton);

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'share-button-portrait-video-carousel',
        itemTracker: {
          resourceId: 'urn:foo',
        },
      });
    });
  });

  describe('Common behaviors', () => {
    it('should bring focus to the button after it has been clicked', async () => {
      const user = userEvent.setup();
      await act(async () => {
        render(<ShareButton {...mockLivePagePostShareButtonProps} />);
      });

      const shareButton = screen.getByRole('button');
      await user.click(shareButton);

      expect(shareButton).toHaveFocus();
    });

    it('should render a visually hidden title for the share button', async () => {
      const user = userEvent.setup();
      await act(async () => {
        render(<ShareButton {...mockLivePagePostShareButtonProps} />);
      });

      const shareButton = screen.getByRole('button');
      await user.click(shareButton);

      expect(
        screen.getByText('Share this post', { exact: false }),
      ).toBeInTheDocument();
    });
  });
});
