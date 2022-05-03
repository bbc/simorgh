/* eslint-disable react/prop-types */
import React from 'react';
import fetchMock from 'fetch-mock';
import { render, act } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
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
    await act(async () => {
      const { container, getByText } = await render(
        <MostReadAmpWithContext
          service="mundo"
          mostReadToggle
          isAmp
          variant={null}
          pageType={STORY_PAGE}
        />,
      );
      expect(
        container.querySelector('amp-script amp-list li'),
      ).toBeInTheDocument();

      const fallback = getByText('Contenido no disponible');

      expect(fallback).not.toBeNull();
    });
  });
});
