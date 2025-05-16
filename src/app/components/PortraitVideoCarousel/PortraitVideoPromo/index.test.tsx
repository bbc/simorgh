import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import PortraitVideoPromo from '.';

describe('PortraitVideoPromo', () => {
  it('Should contain a title', () => {
    const sampleHeadlines = { promoHeadline: 'Sample Heading' };

    const { container } = render(
      <PortraitVideoPromo id="testId" headlines={sampleHeadlines} />,
    );

    const heading = container.querySelector('p')?.querySelector('span');
    expect(heading?.innerHTML).toBe('Sample Heading');
  });

  it('Should contain a visually hidden text with required screen reader details for the component', () => {
    const sampleHeadlines = { promoHeadline: 'Sample Heading' };

    const { container } = render(
      <PortraitVideoPromo id="testId" headlines={sampleHeadlines} />,
    );

    const heading = container.querySelector('p')?.querySelector('span');
    expect(heading?.innerHTML).toBe('Sample Heading');
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
