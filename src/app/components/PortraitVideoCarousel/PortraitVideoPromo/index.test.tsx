import {
  screen,
  render,
  act,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import * as useViewTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';
import PortraitVideoPromo from '.';

const eventTrackingData = {
  componentName: 'portrait-video-carousel',
};

const stripLeadingSrcSetSpaces = (srcSet: string) =>
  srcSet.replace(/\s+(?=https)/g, '');

describe('PortraitVideoPromo', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('Should contain a visually hidden text with required screen reader details for the component', () => {
    const sampleVideoData = {
      model: {
        video: {
          title: 'Sample Heading',
          version: {
            duration: 'PT13S',
            kind: 'programme',
            territories: ['uk', 'nonuk'],
          },
        },
      },
    } as PortraitClipMediaBlock;

    const { container } = render(
      <PortraitVideoPromo
        block={sampleVideoData}
        eventTrackingData={eventTrackingData}
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
    const sampleVideoData = {
      model: {
        video: {
          version: {
            kind: 'programme',
            territories: ['uk', 'nonuk'],
          },
        },
      },
    } as PortraitClipMediaBlock;

    const { container } = render(
      <PortraitVideoPromo
        block={sampleVideoData}
        eventTrackingData={eventTrackingData}
      />,
      {
        service: 'portuguese',
      },
    );

    const textContents = container
      .querySelector('span[data-testid="text-contents"]')
      ?.querySelectorAll('span');
    const duration = textContents?.[2]?.innerHTML;
    expect(duration).toBeUndefined();
  });

  it('Should contain the correct image from the BFF response', () => {
    const sampleVideoData = {
      model: {
        images: [
          {
            source:
              'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8v.jpg',
            urlTemplate:
              'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01wjx8v.jpg',
          },
        ],
        video: {
          version: {
            duration: 'PT13S',
            kind: 'programme',
            territories: ['uk', 'nonuk'],
          },
        },
      },
    } as PortraitClipMediaBlock;

    const { container } = render(
      <PortraitVideoPromo
        block={sampleVideoData}
        eventTrackingData={eventTrackingData}
      />,
    );

    const image = container.querySelector(
      'img[src="https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8v.jpg"]',
    );

    expect(image).toBeInTheDocument();
  });

  it('Should contain an image element with a .webp primary srcset and .jpg secondary srcset', () => {
    const sampleVideoData = {
      model: {
        images: [
          {
            source:
              'https://ichef.bbci.co.uk/ace/ws/1024/cpsprodpb/beb0/live/98c7a0b0-af66-11f0-aa13-0b0479f6f42a.jpg.webp',
            urlTemplate:
              'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/beb0/live/98c7a0b0-af66-11f0-aa13-0b0479f6f42a.jpg.webp',
          },
        ],
        video: {
          version: {
            duration: 'PT13S',
            kind: 'programme',
            territories: ['uk', 'nonuk'],
          },
        },
      },
    } as PortraitClipMediaBlock;

    const imagePath = sampleVideoData.model.images?.[0]?.urlTemplate
      ?.split('{width}')[1]
      .slice(0, -5);

    const imageURL = `https://ichef.bbci.co.uk/ace/ws/1024${imagePath}.webp`;

    const expectedWebpSrcSetURLs = [
      `https://ichef.bbci.co.uk/ace/ws/64${imagePath}.webp 64w`,
      `https://ichef.bbci.co.uk/ace/ws/128${imagePath}.webp 128w`,
      `https://ichef.bbci.co.uk/ace/ws/256${imagePath}.webp 256w`,
      `https://ichef.bbci.co.uk/ace/ws/512${imagePath}.webp 512w`,
    ].join(',');

    const expectedJPGSrcSetURLs = [
      `https://ichef.bbci.co.uk/ace/ws/64${imagePath} 64w`,
      `https://ichef.bbci.co.uk/ace/ws/128${imagePath} 128w`,
      `https://ichef.bbci.co.uk/ace/ws/256${imagePath} 256w`,
      `https://ichef.bbci.co.uk/ace/ws/512${imagePath} 512w`,
    ].join(',');

    const { container } = render(
      <PortraitVideoPromo
        block={sampleVideoData}
        eventTrackingData={eventTrackingData}
      />,
      { pageType: 'home' },
    );

    const portraitVideoPromoImage =
      container.querySelectorAll('div picture')[0];

    const [webpSource, jpgSource, img] =
      portraitVideoPromoImage.childNodes as unknown as [
        HTMLSourceElement,
        HTMLSourceElement,
        HTMLImageElement,
      ];

    expect(stripLeadingSrcSetSpaces(webpSource.srcset)).toEqual(
      expectedWebpSrcSetURLs,
    );
    expect(stripLeadingSrcSetSpaces(jpgSource.srcset)).toEqual(
      expectedJPGSrcSetURLs,
    );
    expect(img.src).toEqual(imageURL);
  });

  it('Should contain a default image if not image src is provided in the BFF response', () => {
    const sampleVideoData = {
      model: {
        video: {
          version: {
            duration: 'PT13S',
            kind: 'programme',
            territories: ['uk', 'nonuk'],
          },
        },
      },
    } as PortraitClipMediaBlock;

    const { container } = render(
      <PortraitVideoPromo
        block={sampleVideoData}
        eventTrackingData={eventTrackingData}
      />,
    );

    const image = container.querySelector(
      'img[src="https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/poster-1024x576.png"]',
    );

    expect(image).toBeInTheDocument();
  });

  it('Should initialise the useViewTracker hook with the correct data', async () => {
    const sampleVideoData = {
      model: {
        video: {
          id: 'testId',
          title: 'Sample Heading',
          version: {
            kind: 'programme',
            territories: ['uk', 'nonuk'],
          },
        },
      },
    } as PortraitClipMediaBlock;

    const clickTrackerSpy = jest.spyOn(useViewTrackerHandler, 'default');

    await act(async () => {
      render(
        <PortraitVideoPromo
          block={sampleVideoData}
          blockPosition={2}
          eventTrackingData={{
            ...eventTrackingData,
            groupTracker: {
              itemCount: 15,
              resourceId: 'test-group-resource-id',
            },
          }}
        />,
      );
    });

    expect(clickTrackerSpy).toHaveBeenCalledWith({
      componentName: 'portrait-video-carousel',
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
    const sampleVideoData = {
      model: {
        video: {
          version: {
            duration: 'PT13S',
            kind: 'programme',
            territories: ['uk', 'nonuk'],
          },
        },
      },
    } as PortraitClipMediaBlock;

    await act(async () => {
      render(
        <PortraitVideoPromo
          block={sampleVideoData}
          eventTrackingData={eventTrackingData}
        />,
        {
          service: 'portuguese',
        },
      );
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
