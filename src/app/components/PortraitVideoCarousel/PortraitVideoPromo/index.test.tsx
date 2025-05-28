import React from 'react';
import {
  screen,
  render,
  act,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import PortraitVideoPromo from '.';

describe('PortraitVideoPromo', () => {
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

  it('Should contain an image', () => {
    const sampleImages = [
      {
        url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg',
        altText: 'alternative text',
      },
    ];

    const { container } = render(
      <PortraitVideoPromo id="testId" images={sampleImages} />,
    );

    const heading = container.querySelector(
      'img[src="https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg"]',
    );
    expect(heading).toBeInTheDocument();
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
