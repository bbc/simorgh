import {
  screen,
  render,
  act,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import * as useViewTrackerHandler from '#app/hooks/useClickTrackerHandler';
import PortraitVideoPromo from '.';

describe('PortraitVideoPromo', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('Should contain a visually hidden text with required screen reader details for the component', () => {
    const sampleHeadlines = {
      promoHeadline: 'Sample Heading',
    };
    const sampleVideoData = {
      id: 'p01wjx7v',
      version: {
        duration: 'PT13S',
        kind: 'programme',
        territories: ['uk', 'nonuk'],
      },
    };

    const { container } = render(
      <PortraitVideoPromo
        id="testId"
        headlines={sampleHeadlines}
        video={sampleVideoData}
      />,
      { service: 'portuguese' },
    );

    const textContents = container
      .querySelector('span[data-testid="text-contents"]')
      ?.querySelectorAll('span');

    const watchVideo = textContents?.[0]?.innerHTML;
    const heading = textContents?.[1]?.innerHTML;
    const duration = textContents?.[2]?.innerHTML;

    const screenreaderText = `${watchVideo}${heading}${duration}`;
    expect(screenreaderText).toBe('Play Vídeo, Sample Heading, Duration 0,13');
  });

  it('Should not show a visually hidden duration if no duration is given', () => {
    const sampleHeadlines = { promoHeadline: 'Sample Heading' };

    const { container } = render(
      <PortraitVideoPromo id="testId" headlines={sampleHeadlines} />,
      { service: 'portuguese' },
    );

    const textContents = container
      .querySelector('span[data-testid="text-contents"]')
      ?.querySelectorAll('span');
    const duration = textContents?.[2]?.innerHTML;
    expect(duration).toBeUndefined();
  });

  it('Should contain the correct image from the BFF response', () => {
    const sampleImages = [
      {
        url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8v.jpg',
        urlTemplate:
          'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01wjx8v.jpg',
        altText: 'Corrida armamentista na Europa',
      },
    ];

    const { container } = render(
      <PortraitVideoPromo id="testId" images={sampleImages} />,
    );

    const image = container.querySelector(
      'img[src="https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8v.jpg"]',
    );

    expect(image).toBeInTheDocument();
  });

  it('Should contain a default image if not image src is provided in the BFF response', () => {
    const { container } = render(<PortraitVideoPromo id="testId" />);

    const image = container.querySelector(
      'img[src="https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/poster-1024x576.png"]',
    );

    expect(image).toBeInTheDocument();
  });

  it('Should initialise the useViewTracker hook with the correct data', async () => {
    const sampleHeadlines = { promoHeadline: 'Sample Heading' };
    const groupTracker = {
      itemCount: 15,
      resourceId: 'test-group-resource-id',
    };
    const clickTrackerSpy = jest.spyOn(useViewTrackerHandler, 'default');

    await act(async () => {
      render(
        <PortraitVideoPromo
          id="testId"
          groupTracker={groupTracker}
          itemPosition={2}
          headlines={sampleHeadlines}
        />,
      );
    });

    expect(clickTrackerSpy).toHaveBeenCalledWith({
      componentName: 'portrait-video-promo-3',
      groupTracker: {
        itemCount: 15,
        resourceId: 'test-group-resource-id',
      },
      itemTracker: {
        position: 3,
        resourceId: 'testId',
        text: 'Sample Heading',
        type: 'portrait-video-promo',
      },
      viewThreshold: 1,
    });
  });

  it('Should scroll to the center when tabbed', async () => {
    const sampleHeadlines = {
      promoHeadline: 'Sample Heading',
    };

    await act(async () => {
      render(<PortraitVideoPromo id="testId" headlines={sampleHeadlines} />, {
        service: 'portuguese',
      });
    });

    const promoButton = screen.getByTestId('promo-button');
    promoButton.scrollIntoView = jest.fn();

    await act(async () => {
      fireEvent.focusIn(promoButton);
      jest.runAllTimers();
    });

    expect(promoButton.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  });
});
