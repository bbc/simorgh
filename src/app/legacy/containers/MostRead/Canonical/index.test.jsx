import React from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import arabicMostReadData from '#data/arabic/mostRead';
import pidginMostReadData from '#data/pidgin/mostRead';
import nepaliMostReadData from '#data/nepali/mostRead';
import kyrgyzMostReadData from '#data/kyrgyz/mostRead';
import ukrainianMostReadData from '#data/ukrainian/mostRead';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import CanonicalMostRead from '.';
import {
  setStalePromoTimestamp,
  setFreshPromoTimestamp,
  setStaleLastRecordTimeStamp,
} from '../utilities/testHelpers';

/* eslint-disable react/prop-types */
const MostReadCanonicalWithContext = ({
  service,
  endpoint,
  initialData,
  wrapper,
  pageLang,
  eventTrackingData,
}) => (
  <ServiceContextProvider service={service} pageLang={pageLang}>
    <ToggleContextProvider
      toggles={{
        eventTracking: { enabled: true },
      }}
    >
      <CanonicalMostRead
        endpoint={endpoint}
        initialData={initialData}
        wrapper={wrapper}
        eventTrackingData={eventTrackingData}
      />
    </ToggleContextProvider>
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
      initialData: pidginMostReadData,
    },
    {
      description: 'should render 5 list items for nepali from server data',
      service: 'nepali',
      numberOfItems: 5,
      initialData: nepaliMostReadData,
    },
    {
      description: 'should render 5 list items for kyrgyz from fetched data',
      service: 'kyrgyz',
      numberOfItems: 5,
      initialData: kyrgyzMostReadData,
    },
  ].forEach(({ description, service, numberOfItems, initialData }) => {
    it(description, async () => {
      const endpoint = `www.test.bbc.com/${service}/mostread.json`;

      let container;
      await act(async () => {
        container = await render(
          <MostReadCanonicalWithContext
            service={service}
            initialData={initialData}
          />,
        ).container;
      });

      expect(container.querySelectorAll('li a').length).toEqual(numberOfItems);
      expect(container.querySelectorAll('li a').textContent).not.toBeNull();

      expect(fetchMock.calls(endpoint).length).toBeFalsy();
    });
  });

  [
    {
      service: 'pidgin',
      expectedTime: 'De one we dem update for: 11th January 1970',
      initialData: pidginMostReadData,
    },
    {
      service: 'arabic',
      expectedTime: 'آخر تحديث 11 يناير/ كانون الثاني 1970',
      initialData: arabicMostReadData,
    },
  ].forEach(({ service, expectedTime, initialData }) => {
    it(`should render last updated ${service} when promo timestamp is stale`, async () => {
      const staleData = setStalePromoTimestamp(initialData);
      fetchMock.mock(`www.test.bbc.com/${service}/mostread.json`, staleData);

      let container;
      await act(async () => {
        container = await render(
          <MostReadCanonicalWithContext
            service={service}
            initialData={staleData}
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
      initialData: pidginMostReadData,
    },
    {
      service: 'arabic',
      initialData: arabicMostReadData,
    },
  ].forEach(({ service, initialData }) => {
    it(`should not render last updated for ${service} when promo timestamp is fresh`, async () => {
      const freshData = setFreshPromoTimestamp(initialData);
      fetchMock.mock(`www.test.bbc.com/${service}/mostread.json`, freshData);

      let container;
      await act(async () => {
        container = await render(
          <MostReadCanonicalWithContext
            service={service}
            initialData={freshData}
          />,
        ).container;
      });

      expect(container.querySelectorAll('time').length).toEqual(0);
    });
  });

  it(`should render ukrainian in russian most read with an overriden datetime locale`, async () => {
    const staleData = setStalePromoTimestamp(ukrainianMostReadData);
    fetchMock.mock(`www.test.bbc.com/ukrainian/mostread.json`, staleData);

    let container;
    await act(async () => {
      container = await render(
        <MostReadCanonicalWithContext
          service="ukrainian"
          pageLang="ru"
          initialData={staleData}
        />,
      ).container;
    });

    expect(container.querySelectorAll('time')[0].textContent).toEqual(
      'Останнє оновлення: 11 січня 1970',
    );
  });

  it(`should render with wrapper`, async () => {
    const freshData = setFreshPromoTimestamp(nepaliMostReadData);
    fetch.mockResponse(JSON.stringify(freshData));

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
          wrapper={MockWrapper}
          initialData={freshData}
        />,
      ).container;
    });

    expect(container.querySelector('h1').textContent).toEqual('Most Read');
  });

  it(`should not render most read when lastRecordTimeStamp is not fresh`, async () => {
    const staleData = setStaleLastRecordTimeStamp(arabicMostReadData);
    fetchMock.mock(`www.test.bbc.com/arabic/mostread.json`, staleData);

    let container;
    await act(async () => {
      container = await render(
        <MostReadCanonicalWithContext
          service="arabic"
          initialData={staleData}
        />,
      ).container;
    });
    expect(container).toBeEmptyDOMElement();
  });

  it(`should not render most read when no article data exists`, async () => {
    const emptyMostRead = {
      generated: '2021-08-03T12:18:51.749Z',
      lastRecordTimeStamp: '2021-05-04T11:53:00Z',
      firstRecordTimeStamp: '2021-05-04T11:38:00Z',
      totalRecords: 0,
      records: [],
    };

    const staleData = setStaleLastRecordTimeStamp(emptyMostRead);
    fetchMock.mock(`www.test.bbc.com/arabic/mostread.json`, staleData);

    let container;
    await act(async () => {
      container = await render(
        <MostReadCanonicalWithContext
          service="arabic"
          initialData={staleData}
        />,
      ).container;
    });
    expect(container).toBeEmptyDOMElement();
  });

  describe('Event Tracking', () => {
    const blockLevelEventTrackingData = {
      componentName: 'most-read',
    };

    it('should call the view tracking hook with the correct params', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        <MostReadCanonicalWithContext
          service="pidgin"
          initialData={pidginMostReadData}
          eventTrackingData={blockLevelEventTrackingData}
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(blockLevelEventTrackingData);
    });

    it('should call the click tracking hook with the correct params', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        <MostReadCanonicalWithContext
          service="pidgin"
          initialData={pidginMostReadData}
          eventTrackingData={blockLevelEventTrackingData}
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith(blockLevelEventTrackingData);
    });
  });
});
