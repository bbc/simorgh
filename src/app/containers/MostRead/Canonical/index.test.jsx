import React from 'react';
import { render, act } from '@testing-library/react';
import arabicMostReadData from '#data/arabic/mostRead';
import pidginMostReadData from '#data/pidgin/mostRead';
import nepaliMostReadData from '#data/nepali/mostRead';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  setStalePromoTimestamp,
  setFreshPromoTimestamp,
  setStaleLastRecordTimeStamp,
} from '../utilities/testHelpers';
import CanonicalMostRead from '.';

describe('MostReadContainerCanonical', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  [
    {
      service: 'pidgin',
      numberOfItems: 10,
      mostReadData: pidginMostReadData,
      endpoint: 'www.test.bbc.com/pidgin/mostread.json',
    },
    {
      service: 'nepali',
      numberOfItems: 5,
      mostReadData: nepaliMostReadData,
      endpoint: 'www.test.bbc.com/nepali/mostread.json',
      initialData: nepaliMostReadData,
    },
  ].forEach(
    ({ service, numberOfItems, mostReadData, endpoint, initialData }) => {
      it(`should return ${numberOfItems} list items for ${service} `, async () => {
        fetch.mockResponse(
          JSON.stringify(setFreshPromoTimestamp(mostReadData)),
        );

        let container;
        await act(async () => {
          container = await render(
            <ServiceContextProvider service={service}>
              <CanonicalMostRead
                endpoint={endpoint}
                initialData={initialData}
              />
            </ServiceContextProvider>,
          ).container;
        });

        expect(container.querySelectorAll('li').length).toEqual(numberOfItems);
        expect(container.querySelectorAll('li a').length).toEqual(
          numberOfItems,
        );

        if (initialData) {
          expect(fetch).not.toBeCalled();
        }
      });
    },
  );

  [
    {
      service: 'pidgin',
      expectedTime: 'De one we dem update for: 11th January 1970',
      mostReadData: pidginMostReadData,
    },
    {
      service: 'arabic',
      expectedTime: 'آخر تحديث 11 يناير/ كانون الثاني 1970',
      mostReadData: arabicMostReadData,
    },
  ].forEach(({ service, expectedTime, mostReadData }) => {
    it(`should render last updated ${service} when promo timestamp is stale`, async () => {
      fetch.mockResponse(JSON.stringify(setStalePromoTimestamp(mostReadData)));

      let container;
      await act(async () => {
        container = await render(
          <ServiceContextProvider service={service}>
            <CanonicalMostRead
              endpoint={`www.test.bbc.com/${service}/mostread.json`}
            />
          </ServiceContextProvider>,
        ).container;
      });

      expect(container.querySelectorAll('time')[0].textContent).toEqual(
        expectedTime,
      );
    });
  });

  [
    {
      service: 'pidgin',
      mostReadData: pidginMostReadData,
    },
    {
      service: 'arabic',
      mostReadData: arabicMostReadData,
    },
  ].forEach(({ service, mostReadData }) => {
    it(`should not render last updated for ${service} when promo timestamp is fresh`, async () => {
      fetch.mockResponse(JSON.stringify(setFreshPromoTimestamp(mostReadData)));

      let container;
      await act(async () => {
        container = await render(
          <ServiceContextProvider service={service}>
            <CanonicalMostRead
              endpoint={`www.test.bbc.com/${service}/mostread.json`}
            />
          </ServiceContextProvider>,
        ).container;
      });

      expect(container.querySelectorAll('time').length).toEqual(0);
    });

    it(`should render with wrapper`, async () => {
      fetch.mockResponse(
        JSON.stringify(setFreshPromoTimestamp(nepaliMostReadData)),
      );

      const MockWrapper = ({ children }) => (
        <div>
          <h1>Most Read</h1>
          {children}
        </div>
      );

      let container;
      await act(async () => {
        container = await render(
          <ServiceContextProvider service="nepali">
            <CanonicalMostRead
              endpoint="www.test.bbc.com/nepali/mostread.json"
              wrapper={MockWrapper}
            />
          </ServiceContextProvider>,
        ).container;
      });

      expect(container.querySelector('h1').textContent).toEqual('Most Read');
    });

    it(`should not render most read when lastRecordTimeStamp is not fresh`, async () => {
      fetch.mockResponse(
        JSON.stringify(setStaleLastRecordTimeStamp(arabicMostReadData)),
      );

      let container;
      await act(async () => {
        container = await render(
          <ServiceContextProvider service="arabic">
            <CanonicalMostRead endpoint="www.test.bbc.com/arabic/mostread.json" />
          </ServiceContextProvider>,
        ).container;
      });
      expect(container).toBeEmpty();
    });
  });
});
