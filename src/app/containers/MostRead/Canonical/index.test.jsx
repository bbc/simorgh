import React from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import nodeLogger from '#testHelpers/loggerMock';
import arabicMostReadData from '#data/arabic/mostRead';
import pidginMostReadData from '#data/pidgin/mostRead';
import nepaliMostReadData from '#data/nepali/mostRead';
import kyrgyzMostReadData from '#data/kyrgyz/mostRead';
import ukrainianMostReadData from '#data/ukrainian/mostRead';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  setStalePromoTimestamp,
  setFreshPromoTimestamp,
  setStaleLastRecordTimeStamp,
} from '../utilities/testHelpers';
import CanonicalMostRead from '.';
import {
  MOST_READ_CLIENT_REQUEST,
  MOST_READ_FETCH_ERROR,
} from '#lib/logger.const';

/* eslint-disable react/prop-types */
const MostReadCanonicalWithContext = ({
  service,
  endpoint,
  initialData,
  wrapper,
  pageLang,
}) => (
  <ServiceContextProvider service={service} pageLang={pageLang}>
    <CanonicalMostRead
      endpoint={endpoint}
      initialData={initialData}
      wrapper={wrapper}
    />
  </ServiceContextProvider>
);

describe('MostReadContainerCanonical', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  [
    {
      description: 'should render 10 list items for pidgin from fetched data',
      service: 'pidgin',
      numberOfItems: 10,
      mostReadData: pidginMostReadData,
    },
    {
      description: 'should render 5 list items for nepali from server data',
      service: 'nepali',
      numberOfItems: 5,
      mostReadData: nepaliMostReadData,
      initialData: nepaliMostReadData,
    },
    {
      description: 'should render 5 list items for kyrgyz from fetched data',
      service: 'kyrgyz',
      numberOfItems: 5,
      mostReadData: kyrgyzMostReadData,
    },
  ].forEach(
    ({ description, service, numberOfItems, mostReadData, initialData }) => {
      it(description, async () => {
        const endpoint = `www.test.bbc.com/${service}/mostread.json`;

        fetchMock.mock(endpoint, setFreshPromoTimestamp(mostReadData));

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
          expect(fetchMock.calls(endpoint).length).toBeFalsy();
        } else {
          expect(fetchMock.calls(endpoint).length).toBeTruthy();
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
      fetchMock.mock(
        `www.test.bbc.com/${service}/mostread.json`,
        setStalePromoTimestamp(mostReadData),
      );

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
      fetchMock.mock(
        `www.test.bbc.com/${service}/mostread.json`,
        setFreshPromoTimestamp(mostReadData),
      );

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
  });

  it(`should render ukrainian in russian most read with an overriden datetime locale`, async () => {
    fetchMock.mock(
      `www.test.bbc.com/ukrainian/mostread.json`,
      setStalePromoTimestamp(ukrainianMostReadData),
    );

    let container;
    await act(async () => {
      container = await render(
        <MostReadCanonicalWithContext
          service="ukrainian"
          endpoint="www.test.bbc.com/ukrainian/mostread.json"
          pageLang="ru"
        />,
      ).container;
    });

    expect(container.querySelectorAll('time')[0].textContent).toEqual(
      'Останнє оновлення: 11 січня 1970',
    );
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
    fetchMock.mock(
      `www.test.bbc.com/arabic/mostread.json`,
      setStaleLastRecordTimeStamp(arabicMostReadData),
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

  describe('Logging', () => {
    it('should log MOST_READ_CLIENT_REQUEST when most read data request is received', async () => {
      await act(async () => {
        await render(
          <MostReadCanonicalWithContext
            service="pidgin"
            endpoint="www.test.bbc.com/pidgin/mostread.json"
          />,
        );
      });

      expect(nodeLogger.info).toHaveBeenCalledWith(MOST_READ_CLIENT_REQUEST, {
        url: `www.test.bbc.com/pidgin/mostread.json`,
      });
    });

    it('should log MOST_READ_FETCH_ERROR when most read data request is not received', async () => {
      fetchMock.mock('www.test.bbc.com/pidgin/mostread.json', 500);

      await act(async () => {
        await render(
          <MostReadCanonicalWithContext
            service="pidgin"
            endpoint="www.test.bbc.com/pidgin/mostread.json"
          />,
        );
      });

      expect(nodeLogger.error).toHaveBeenCalledWith(MOST_READ_FETCH_ERROR, {
        url: `www.test.bbc.com/pidgin/mostread.json`,
        error:
          'Error: Unexpected response (HTTP status code 500) when requesting www.test.bbc.com/pidgin/mostread.json',
      });
    });
  });
});
