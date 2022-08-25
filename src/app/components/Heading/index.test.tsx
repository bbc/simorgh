import React from 'react';

import Heading from '.';
import { render, screen } from '../custom-react-testing-library';

describe('Heading', () => {
  it('should render the heading text in an h1 element', async () => {
    render(<Heading level={1}>Hello World!</Heading>);

    expect(screen.getByText('Hello World!').nodeName).toBe('H1');
  });

  it('should render the heading text in an h2 element', async () => {
    render(<Heading level={2}>Hello World!</Heading>);

    expect(screen.getByText('Hello World!').nodeName).toBe('H2');
  });

  it('should render the correct typography for the mundo service, specifically the ReithSans font and largest font-size to be 2.75rem;', async () => {
    const { container } = render(<Heading level={1}>Hello World!</Heading>, {
      service: 'mundo',
    });

    expect(container).toMatchInlineSnapshot(`
      .emotion-0 {
        color: #141414;
        font-size: 1.75rem;
        line-height: 2.25rem;
        font-family: ReithSans,Helvetica,Arial,sans-serif;
        font-style: normal;
        font-weight: 400;
      }

      @media (min-width: 20rem) {
        .emotion-0 {
          font-size: 2rem;
          line-height: 2.625rem;
        }
      }

      @media (min-width: 37.5rem) {
        .emotion-0 {
          font-size: 2.75rem;
          line-height: 3.625rem;
        }
      }

      <div>
        <h1
          class="emotion-0"
        >
          Hello World!
        </h1>
      </div>
    `);
  });
});
