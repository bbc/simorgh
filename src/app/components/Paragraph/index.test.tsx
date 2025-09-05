import React from 'react';

import Paragraph from '.';
import { render, screen } from '../react-testing-library-with-providers';

describe('Paragraph', () => {
  it('should render the paragraph text in a p element', async () => {
    render(<Paragraph>Hello World!</Paragraph>);

    expect(screen.getByText('Hello World!').nodeName).toBe('P');
  });

  it('should render the correct typography for the mundo service', async () => {
    render(<Paragraph>Hello World!</Paragraph>, {
      service: 'mundo',
    });

    expect(screen.getByText('Hello World!')).toMatchInlineSnapshot(`
     .emotion-0 {
       color: #141414;
       font-size: 0.9375rem;
       line-height: 1.25rem;
       font-family: ReithSans,Helvetica,Arial,sans-serif;
       font-style: normal;
       font-weight: 400;
       margin: 0;
     }

     @media (min-width: 20rem) and (max-width: 37.4375rem) {
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

     <p
       class="emotion-0"
     >
       Hello World!
     </p>
    `);
  });

  it('should render the correct typography for the arabic service', async () => {
    render(<Paragraph>Hello World!</Paragraph>, {
      service: 'arabic',
    });

    expect(screen.getByText('Hello World!')).toMatchInlineSnapshot(`
     .emotion-0 {
       color: #141414;
       font-size: 0.9375rem;
       line-height: 1.5rem;
       font-family: "BBC Reith Qalam","Times New Roman",Arial,Verdana,Geneva,Helvetica,sans-serif;
       font-style: normal;
       font-weight: 400;
       margin: 0;
     }

     @media (min-width: 20rem) and (max-width: 37.4375rem) {
       .emotion-0 {
         font-size: 1rem;
         line-height: 1.625rem;
       }
     }

     @media (min-width: 37.5rem) {
       .emotion-0 {
         font-size: 1rem;
         line-height: 1.625rem;
       }
     }

     <p
       class="emotion-0"
     >
       Hello World!
     </p>
    `);
  });
});
