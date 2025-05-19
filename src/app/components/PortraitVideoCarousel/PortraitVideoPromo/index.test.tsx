import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import PortraitVideoPromo from '.';

describe('PortraitVideoPromo', () => {
  it('Should contain a title', () => {
    const sampleHeadlines = { promoHeadline: 'Sample Heading' };

    const { container } = render(
      <PortraitVideoPromo id="testId" headlines={sampleHeadlines} />,
    );

    const heading = container.querySelector('p')?.querySelectorAll('span')[1];
    expect(heading?.innerHTML).toBe('Sample Heading');
  });

  it('Should contain a visually hidden text with required screen reader details for the component - with duration', () => {
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
    );

    const heading = container.querySelector('p')?.querySelectorAll('span')[0];
    expect(heading?.innerHTML).toBe(
      'Sample Heading, video, Duration  0:13, Play video',
    );
  });

  it('Should contain a visually hidden text with required screen reader details for the component - no duration', () => {
    const sampleHeadlines = { promoHeadline: 'Sample Heading' };

    const { container } = render(
      <PortraitVideoPromo id="testId" headlines={sampleHeadlines} />,
    );

    const heading = container.querySelector('p')?.querySelectorAll('span')[0];
    expect(heading?.innerHTML).toBe('Sample Heading, video, Play video');
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
});
