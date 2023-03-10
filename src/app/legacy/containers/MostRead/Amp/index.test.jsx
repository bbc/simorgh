/* eslint-disable react/prop-types */
import React from 'react';
import fetchMock from 'fetch-mock';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import {
  render,
  act,
} from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
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

  // Testing is done in cypress as jest dom does not support/run web workers which run the amp-scripts.
  it('should render fallback when fetch fails to load', async () => {
    fetchMock.mock('localhost:7080/mundo/mostread.json', {
      throws: 'failed fetch',
    });

    const { container, getByText } = render(
      <MostReadAmpWithContext
        service="mundo"
        mostReadToggle
        isAmp
        variant={null}
        pageType={STORY_PAGE}
      />,
    );

    await act(async () => {
      expect(
        container.querySelector('amp-script amp-list li'),
      ).toBeInTheDocument();

      const fallback = getByText('Contenido no disponible');

      expect(fallback).not.toBeNull();
    });
  });

  it('should render fallback when fetch records are empty', async () => {
    fetchMock.mock('localhost:7080/mundo/mostread.json', {
      generated: '2022-05-03T14:44:35.496Z',
      lastRecordTimeStamp: '2022-05-03T14:42:00Z',
      firstRecordTimeStamp: '2022-05-03T14:27:00Z',
      totalRecords: 20,
      records: [],
    });

    const { container, getByText } = render(
      <MostReadAmpWithContext
        service="mundo"
        mostReadToggle
        isAmp
        variant={null}
        pageType={STORY_PAGE}
      />,
    );

    await act(async () => {
      expect(
        container.querySelector('amp-script amp-list li'),
      ).toBeInTheDocument();

      const fallback = getByText('Contenido no disponible');

      expect(fallback).not.toBeNull();
    });
  });

  it('should render fallback when fetch records is undefined', async () => {
    fetchMock.mock('localhost:7080/mundo/mostread.json', {
      generated: '2022-05-03T14:44:35.496Z',
      lastRecordTimeStamp: '2022-05-03T14:42:00Z',
      firstRecordTimeStamp: '2022-05-03T14:27:00Z',
      totalRecords: 20,
    });

    const { container, getByText } = render(
      <MostReadAmpWithContext
        service="mundo"
        mostReadToggle
        isAmp
        variant={null}
        pageType={STORY_PAGE}
      />,
    );

    await act(async () => {
      expect(
        container.querySelector('amp-script amp-list li'),
      ).toBeInTheDocument();

      const fallback = getByText('Contenido no disponible');

      expect(fallback).not.toBeNull();
    });
  });
});
