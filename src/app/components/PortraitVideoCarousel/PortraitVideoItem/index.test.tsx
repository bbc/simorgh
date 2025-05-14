import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import Component from '.';

describe('PortraitVideoItem', () => {
  it('Should contain a h3 level title', () => {
    const sampleProps = {
      id: 'testID',
      headlines: {
        promoHeadline: 'Sample Heading',
      },
    };

    const { container } = render(<Component {...sampleProps} />);

    const heading = container.querySelector('h3');
    expect(heading?.innerHTML).toBe('Sample Heading');
  });

  it('Should contain an image', () => {
    const sampleProps = {
      id: 'testID',
      images: [
        {
          url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg',
          altText: 'alternative text',
        },
      ],
    };

    const { container } = render(<Component {...sampleProps} />);

    const heading = container.querySelector(
      'img[src="https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg"]',
    );
    expect(heading).not.toBeUndefined();
  });
});
