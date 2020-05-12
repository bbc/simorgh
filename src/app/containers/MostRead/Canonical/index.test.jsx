import React from 'react';
import { render, act } from '@testing-library/react';
import arabicMostReadData from '#data/arabic/mostRead';
import pidginMostReadData from '#data/pidgin/mostRead';
import nepaliMostReadData from '#data/nepali/mostRead';
import kyrgyzMostReadData from '#data/kyrgyz/mostRead';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  setStalePromoTimestamp,
  setFreshPromoTimestamp,
  setStaleLastRecordTimeStamp,
} from '../utilities/testHelpers';
import CanonicalMostRead from '.';

/* eslint-disable react/prop-types */
const MostReadCanonicalWithContext = ({
  service,
  endpoint,
  initialData,
  wrapper,
}) => (
  <ServiceContextProvider service={service}>
    <CanonicalMostRead
      endpoint={endpoint}
      initialData={initialData}
      wrapper={wrapper}
    />
  </ServiceContextProvider>
);

describe('MostReadContainerCanonical', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  [
    {
      description: 'should render 10 list items for pidgin from fetched data',
      service: 'pidgin',
      numberOfItems: 10,
      mostReadData: pidginMostReadData,
      endpoint: 'www.test.bbc.com/pidgin/mostread.json',
    },
    {
      description: 'should render 5 list items for nepali from server data',
      service: 'nepali',
      numberOfItems: 5,
      mostReadData: nepaliMostReadData,
      endpoint: 'www.test.bbc.com/nepali/mostread.json',
      initialData: nepaliMostReadData,
    },
    {
      description: 'should render 5 list items for kyrgyz from fetched data',
      service: 'kyrgyz',
      numberOfItems: 5,
      mostReadData: kyrgyzMostReadData,
      endpoint: 'www.test.bbc.com/kyrgyz/mostread.json',
    },
  ].forEach(
    ({
      description,
      service,
      numberOfItems,
      mostReadData,
      endpoint,
      initialData,
    }) => {
      it(description, async () => {
        fetch.mockResponse(
          JSON.stringify(setFreshPromoTimestamp(mostReadData)),
        );

        let container;
        await act(async () => {
          container = await render(
            <MostReadCanonicalWithContext
              service={service}
              endpoint={endpoint}
              initialData={initialData}
            />,
          ).container;
        });

        expect(container.querySelectorAll('li a').length).toEqual(
          numberOfItems,
        );
        expect(container.querySelectorAll('li a').textContent).not.toBeNull();

        if (initialData) {
          expect(fetch).not.toBeCalled();
        } else {
          expect(fetch).toBeCalled();
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
          <MostReadCanonicalWithContext
            service={service}
            endpoint={`www.test.bbc.com/${service}/mostread.json`}
          />,
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
          <MostReadCanonicalWithContext
            service={service}
            endpoint={`www.test.bbc.com/${service}/mostread.json`}
          />,
        ).container;
      });

      expect(container.querySelectorAll('time').length).toEqual(0);
    });

    it(`should render with wrapper`, async () => {
      fetch.mockResponse(
        JSON.stringify(setFreshPromoTimestamp(nepaliMostReadData)),
      );

      /* eslint-disable-next-line react/prop-types */
      const MockWrapper = ({ children }) => (
        <div>
          <h1>Most Read</h1>
          {children}
        </div>
      );

      let container;
      await act(async () => {
        container = await render(
          <MostReadCanonicalWithContext
            service="nepali"
            endpoint="www.test.bbc.com/nepali/mostread.json"
            wrapper={MockWrapper}
          />,
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
          <MostReadCanonicalWithContext
            service="arabic"
            endpoint="www.test.bbc.com/arabic/mostread.json"
          />,
        ).container;
      });
      expect(container).toBeEmpty();
    });
  });
});
