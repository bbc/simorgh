import React from 'react';

import Paragraph from '.';
import { render, screen } from '../custom-react-testing-library';

describe('Paragraph', () => {
  it('should render the paragraph text in a p element', async () => {
    render(<Paragraph>Hello World!</Paragraph>);

    expect(screen.getByText('Hello World!').nodeName).toBe('P');
  });

  it('should render the correct typography for the mundo service', async () => {
    const { container } = render(<Paragraph>Hello World!</Paragraph>, {
      service: 'mundo',
    });

    expect(container).toMatchInlineSnapshot(`
      .emotion-0 {
        color: #141414;
        font-size: 0.9375rem;
        line-height: 1.25rem;
        font-family: ReithSans,Helvetica,Arial,sans-serif;
        font-style: normal;
        font-weight: 400;
        margin: 0;
      }

      @media (min-width: 20rem) {
        .emotion-0 {
          font-size: 1rem;
          line-height: 1.375rem;
        }
      }

      @media (min-width: 37.5rem) {
        .emotion-0 {
          font-size: 1rem;
          line-height: 1.375rem;
        }
      }

      <div>
        <p
          class="emotion-0"
        >
          Hello World!
        </p>
      </div>
    `);
  });
});
