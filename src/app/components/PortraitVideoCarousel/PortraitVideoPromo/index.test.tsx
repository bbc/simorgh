import React from 'react';
import {
  render,
  act,
} from '#app/components/react-testing-library-with-providers';
import * as useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import PortraitVideoPromo from '.';

describe('PortraitVideoPromo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('Should initialise the useClickTracker hook with the correct data', async () => {
    const sampleHeadlines = { promoHeadline: 'Sample Heading' };
    const groupTracker = {
      itemCount: 15,
      resourceId: 'test-group-resource-id',
    };
    const clickTrackerSpy = jest.spyOn(useClickTrackerHandler, 'default');

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
      componentName: 'portrait-video-promo-2',
      groupTracker: {
        itemCount: 15,
        resourceId: 'test-group-resource-id',
      },
      itemTracker: {
        position: 2,
        resourceId: 'testId',
        text: 'Sample Heading',
        type: 'portrait-video-promo',
      },
    });
  });
});
