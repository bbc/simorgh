import React from 'react';
import defaultServiceVariants from '#app/lib/config/services/defaultServiceVariants';
import { services } from '#app/lib/config/services/loadableConfig';
import ThemeProvider from '.';
import { act, render } from '../react-testing-library-with-providers';
import PageLayoutWrapper from '../PageLayoutWrapper';

jest.unmock('.');

describe('Real Theme Provider', () => {
  it.each(services.filter(service => !['newsround'].includes(service)))(
    `renders the correct Brand SVG for %s`,
    async service => {
      const variant = defaultServiceVariants[service] || 'default';

      await act(() => {
        render(
          <ThemeProvider service={service} variant={variant}>
            <PageLayoutWrapper
              pageData={{
                metadata: {
                  // @ts-expect-error test type
                  type: 'testing-theme-provider',
                },
              }}
            >
              {service}
            </PageLayoutWrapper>
          </ThemeProvider>,
          {
            service,
          },
        );
      });

      // //  @ts-expect-error Cannot invoke an object which is possibly 'undefined'.ts(2722)
      //   const divElement = getByText(service);
      //   console.log({ divElement });

      const svg = document.querySelector('svg g path');

      expect(svg).toMatchSnapshot();
    },
  );
});
