import {
  fireEvent,
  render,
  screen,
} from '../react-testing-library-with-providers';
import MessageBanner from '.';
import Heading from '../Heading';
import { kyrgyzMessageBannerOnePromo } from './fixtures';
import * as viewTracking from '../../hooks/useViewTracker';
import * as clickTracking from '../../hooks/useClickTrackerHandler';

describe('MessageBanner', () => {
  const summary = kyrgyzMessageBannerOnePromo.summaries[0];
  const eventTrackingData = {
    componentName: 'message-banner',
    groupTracker: {
      type: 'message-banner',
      position: '1',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('for a curation with 1 summary', () => {
    it('should render the heading correctly', () => {
      render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );
      const heading = screen.getByText(kyrgyzMessageBannerOnePromo.title);
      expect(heading).toBeInTheDocument();
    });

    it('should display the banner heading correctly as an H2', () => {
      render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );
      expect(screen.getByText(kyrgyzMessageBannerOnePromo.title).nodeName).toBe(
        'H2',
      );
    });

    it('should display the banner subtext correctly as a Paragraph', () => {
      render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );
      expect(screen.getByText(summary.description).nodeName).toBe('P');
    });

    it('should display link text correctly as an Anchor', () => {
      render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );
      const ctaLink = screen.getByRole('link');
      expect(ctaLink.getAttribute('href')).toEqual(summary.link);
      expect(ctaLink.textContent).toEqual(summary.title);
    });

    it('should render an image with the correct image src', () => {
      render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );
      const image = screen.getByAltText('');
      expect(image.getAttribute('src')).toEqual(
        'https://ichef.test.bbci.co.uk/ace/ws/224/cpsdevpb/66b8/test/d1be6bc0-8114-11ed-bd83-8f15ba358e41.png',
      );
    });

    it('should have an image with an empty alt text', () => {
      render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );
      const image = screen.getByAltText('');
      expect(image).toBeInTheDocument();
    });
  });

  describe('view tracking', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    it('should not be enabled if event tracking data not provided', () => {
      render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(undefined);
    });

    it('should register view tracker if event tracking data provided', () => {
      const eventTrackingDataModel = {
        ...eventTrackingData,
        groupTracker: {
          ...eventTrackingData,
          link: summary.link,
        },
      };

      render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingDataModel}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingDataModel);
    });
  });

  describe('click tracking', () => {
    const clickTrackerSpy = jest
      .spyOn(clickTracking, 'default')
      .mockImplementation();

    it('should not be enabled if event tracking data not provided', () => {
      const { container } = render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith(undefined);

      const [callToActionLink] = container.getElementsByTagName('a');
      fireEvent.click(callToActionLink);
      expect(callToActionLink.onclick).toBeFalsy();
    });

    it('should register click tracker if event tracking data provided', () => {
      const eventTrackingDataModel = {
        ...eventTrackingData,
        groupTracker: {
          ...eventTrackingData,
          link: summary.link,
        },
      };

      render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingDataModel}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingDataModel);
    });

    it('should handle a click event when call to action link clicked', () => {
      clickTrackerSpy.mockRestore();

      const { container } = render(
        <MessageBanner
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
        >
          <Heading level={2} id="banner-heading">
            {kyrgyzMessageBannerOnePromo.title}
          </Heading>
        </MessageBanner>,
      );

      const [callToActionLink] = container.getElementsByTagName('a');
      fireEvent.click(callToActionLink);

      expect(callToActionLink.onclick).toBeTruthy();
    });
  });
});
