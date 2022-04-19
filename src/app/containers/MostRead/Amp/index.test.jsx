/* eslint-disable react/prop-types */
import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import mundoMostReadData from '#data/mundo/mostRead';
import nepaliMostReadData from '#data/nepali/mostRead';
import bengaliMostRead from '#data/bengali/mostRead';

import AmpMostRead from '.';

const MostReadAmpWithContext = ({
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
      <AmpMostRead
        endpoint={endpoint}
        initialData={initialData}
        wrapper={wrapper}
        eventTrackingData={eventTrackingData}
      />
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('AmpMostRead', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  [
    {
      description: 'should render 10 list items for mundo from fetched data',
      service: 'mundo',
      numberOfItems: 10,
      mostReadData: mundoMostReadData,
      endpoint: 'https://www.test.bbc.com/mundo/mostread.json',
    },
    {
      description: 'should render 5 list items for nepali from fetched data',
      service: 'nepali',
      numberOfItems: 5,
      mostReadData: nepaliMostReadData,
      endpoint: 'https://www.test.bbc.com/nepali/mostread.json',
    },
  ].forEach(
    ({ description, service, numberOfItems, endpoint, mostReadData }) => {
      it(description, () => {
        fetchMock.mock(endpoint, mostReadData);

        waitFor(() => {
          const { container } = render(
            <MostReadAmpWithContext service={service} endpoint={endpoint} />,
          );
          expect(container.querySelectorAll('li a').length).toEqual(
            numberOfItems,
          );

          expect(fetchMock.calls(endpoint).length).toBeTruthy();
        });
      });
    },
  );
});
