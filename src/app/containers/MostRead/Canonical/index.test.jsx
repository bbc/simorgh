import React from 'react';
import { render, wait } from '@testing-library/react';
import arabicMostReadData from '#data/arabic/mostRead';
import { service as arabicConfig } from '#app/lib/config/services/arabic';
import {
  setStalePromoTimestamp,
  setFreshPromoTimestamp,
  setStaleLastRecordTimeStamp,
  MostReadWithContext,
} from '../utilities/testHelpers';

const services = {
  arabic: {
    variant: null,
    data: arabicMostReadData,
    config: arabicConfig.default,
    expectedLastUpdated: 'آخر تحديث 11 يناير/ كانون الثاني 1970',
  },
};

describe('MostReadContainerCanonical', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  Object.keys(services).forEach((service) => {
    it(`should render items without timestamps for ${service}`, async () => {
      const { variant, data: mostReadData, config } = services[service];
      const { header, numberOfItems } = config.mostRead;

      fetch.mockResponse(JSON.stringify(setFreshPromoTimestamp(mostReadData)));

      const { container } = render(
        <MostReadWithContext
          service={service}
          variant={variant}
          mostReadToggle
        />,
      );

      await wait(() => {
        expect(container.querySelector('h2').textContent).toEqual(header);
        expect(container.querySelectorAll('li').length).toEqual(numberOfItems);
        expect(container.querySelectorAll('time').length).toEqual(0);
      });
    });

    it(`should render items with timestamps as they are older than 60 days for ${service}`, async () => {
      const {
        variant,
        data: mostReadData,
        config,
        expectedLastUpdated,
      } = services[service];
      const mostReadHeader = config.mostRead.header;

      fetch.mockResponse(JSON.stringify(setStalePromoTimestamp(mostReadData)));

      const { container } = render(
        <MostReadWithContext
          service={service}
          variant={variant}
          mostReadToggle
        />,
      );

      await wait(() => {
        expect(container.querySelector('h2').textContent).toEqual(
          mostReadHeader,
        );
        expect(container.querySelectorAll('li').length).toEqual(
          config.mostRead.numberOfItems,
        );
        expect(container.querySelectorAll('time')[0].textContent).toEqual(
          expectedLastUpdated,
        );
      });
    });

    it(`should not render most read when lastRecordTimeStamp is not fresh for ${service}`, async () => {
      const { variant, data: mostReadData } = services[service];

      fetch.mockResponse(
        JSON.stringify(setStaleLastRecordTimeStamp(mostReadData)),
      );
      const { container } = render(
        <MostReadWithContext
          service={service}
          variant={variant}
          mostReadToggle
        />,
      );

      await wait(() => {
        expect(container.innerHTML).toEqual('');
      });
    });
  });
});
