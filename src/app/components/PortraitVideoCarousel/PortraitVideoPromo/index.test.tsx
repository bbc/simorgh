import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import PortraitVideoIPromo from '.';

describe('PortraitVideoIPromo', () => {
  it('Should contain a h3 level title', () => {
    const sampleHeadlines = { promoHeadline: 'Sample Heading' };

    const { container } = render(
      <PortraitVideoIPromo id="testId" headlines={sampleHeadlines} />,
    );

    const heading = container.querySelector('h3');
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
      <PortraitVideoIPromo id="testId" images={sampleImages} />,
    );

    const heading = container.querySelector(
      'img[src="https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg"]',
    );
    expect(heading).toBeInTheDocument();
  });
});
