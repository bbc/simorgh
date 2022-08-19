import React from 'react';

import Text from '.';
import { render, screen } from '../custom-react-testing-library';

describe('Text', () => {
  it('should render the text in a span element by default', async () => {
    render(<Text>Hello World!</Text>);

    expect(screen.getByText('Hello World!').nodeName).toBe('SPAN');
  });

  it('should render the text in a paragraph element using the as prop', async () => {
    render(<Text as="p">Hello World!</Text>);

    expect(screen.getByText('Hello World!').nodeName).toBe('P');
  });

  it('should render the correct typography for the mundo service, specifically the ReithSans font', async () => {
    const { container } = render(<Text>Hello World!</Text>, {
      service: 'mundo',
    });

    expect(container).toMatchInlineSnapshot(`
      .emotion-0 {
        color: #141414;
        font-size: 0.9375rem;
        line-height: 1.25rem;
        font-family: ReithSans,Helvetica,Arial,sans-serif;
      }

      @media (min-width: 20rem) {
        .emotion-0 {
          font-size: 1rem;
          line-height: 1.25rem;
        }
      }

      @media (min-width: 37.5rem) {
        .emotion-0 {
          font-size: 1rem;
          line-height: 1.25rem;
        }
      }

      <div>
        <span
          class="emotion-0"
        >
          Hello World!
        </span>
      </div>
    `);
  });

  it('should render the correct typography for the mundo service, specifically the ReithSerif font', async () => {
    const { container } = render(
      <Text fontFamilyVariant="secondary">Hello World!</Text>,
      {
        service: 'mundo',
      },
    );

    expect(container).toMatchInlineSnapshot(`
      .emotion-0 {
        color: #141414;
        font-size: 0.9375rem;
        line-height: 1.25rem;
        font-family: ReithSerif,Helvetica,Arial,sans-serif;
      }

      @media (min-width: 20rem) {
        .emotion-0 {
          font-size: 1rem;
          line-height: 1.25rem;
        }
      }

      @media (min-width: 37.5rem) {
        .emotion-0 {
          font-size: 1rem;
          line-height: 1.25rem;
        }
      }

      <div>
        <span
          class="emotion-0"
        >
          Hello World!
        </span>
      </div>
    `);
  });

  it('should render the correct typography for the arabic service, specifically the BBC Reith Qalam font', async () => {
    const { container } = render(<Text>Hello World!</Text>, {
      service: 'arabic',
    });

    expect(container).toMatchInlineSnapshot(`
      .emotion-0 {
        color: #141414;
        font-size: 0.9375rem;
        line-height: 1.5rem;
        font-family: "BBC Reith Qalam",Arial,Verdana,Geneva,Helvetica,sans-serif;
      }

      @media (min-width: 20rem) {
        .emotion-0 {
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }

      @media (min-width: 37.5rem) {
        .emotion-0 {
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }

      <div>
        <span
          class="emotion-0"
        >
          Hello World!
        </span>
      </div>
    `);
  });

  it('should render the correct typography for the atlas GEL size', async () => {
    const { container } = render(<Text size="atlas">Hello World!</Text>);

    expect(container).toMatchInlineSnapshot(`
      .emotion-0 {
        color: #141414;
        font-size: 4.875rem;
        line-height: 5.25rem;
        font-family: ReithSans,Helvetica,Arial,sans-serif;
      }

      @media (min-width: 20rem) {
        .emotion-0 {
          font-size: 6rem;
          line-height: 6.5rem;
        }
      }

      @media (min-width: 37.5rem) {
        .emotion-0 {
          font-size: 8.75rem;
          line-height: 9.25rem;
        }
      }

      <div>
        <span
          class="emotion-0"
        >
          Hello World!
        </span>
      </div>
    `);
  });
});
