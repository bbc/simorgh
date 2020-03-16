import React from 'react';
import { render, wait } from '@testing-library/react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import {
  setFreshPromoTimestamp,
  MostReadWithContext,
} from './utilities/testHelpers';
import { service as arabicConfig } from '#lib/config/services/arabic';
import arabicMostReadData from '#data/arabic/mostRead';

const services = {
  arabic: {
    variant: null,
    data: arabicMostReadData,
    config: arabicConfig.default,
    expectedLastUpdated: 'آخر تحديث 11 يناير/ كانون الثاني 1970',
  },
};

const expectEmptyContainer = container => {
  expect(container.querySelectorAll('li').length).toEqual(0);
  expect(container.innerHTML).toEqual('');
};

describe('MostReadContainerCanonical Assertion', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  Object.keys(services).forEach(service => {
    it(`should render most read correctly for ${service}`, async () => {
      const { variant, data: mostReadData } = services[service];
      fetch.mockResponse(JSON.stringify(setFreshPromoTimestamp(mostReadData)));

      await matchSnapshotAsync(
        <MostReadWithContext
          service={service}
          variant={variant}
          mostReadToggle
        />,
      );
    });

    it(`should render most read as expected on canonical for ${service}`, async () => {
      const { variant, data: mostReadData, config } = services[service];
      const mostReadHeader = config.mostRead.header;
      fetch.mockResponse(JSON.stringify(setFreshPromoTimestamp(mostReadData)));

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
      });
    });

    it(`should return empty string when mostRead feature toggle is disabled - ${service}`, async () => {
      const { variant } = services[service];
      const { container } = render(
        <MostReadWithContext service={service} variant={variant} />,
      );

      await wait(expectEmptyContainer(container));
    });

    it(`should return empty string on AMP pages - ${service}`, async () => {
      const { variant } = services[service];
      const { container } = render(
        <MostReadWithContext
          isAmp
          service={service}
          variant={variant}
          mostReadToggle
        />,
      );

      await wait(expectEmptyContainer(container));
    });
  });

  it(`should return empty string when mostRead service toggle is disabled`, async () => {
    const { container } = render(
      <MostReadWithContext
        service="archive" // hasMostRead = false for this service
      />,
    );

    await wait(expectEmptyContainer(container));
  });
});
