import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { setFreshPromoTimestamp } from './utilities/testHelpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import pidginMostReadData from '#data/pidgin/mostRead';
import serbianLatMostReadData from '#data/serbian/mostRead/lat';
import MostReadContainer from '.';

/* eslint-disable react/prop-types */
const MostReadWithContext = ({
  isAmp = false,
  service,
  variant = null,
  mostReadToggle,
}) => (
  <ToggleContext.Provider
    value={{
      toggleState: {
        mostRead: { enabled: mostReadToggle },
      },
    }}
  >
    <RequestContextProvider
      bbcOrigin={`http://localhost:7080/${service}`}
      isAmp={isAmp}
      pageType="frontPage"
      service={service}
      statusCode={200}
      pathname={`/${service}`}
      variant={variant}
    >
      <ServiceContextProvider service={service} variant={variant}>
        <MostReadContainer />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContext.Provider>
);

const shouldRenderMostRead = container =>
  expect(container.querySelector('ol')).toBeInTheDocument();

const shouldNotRenderMostRead = container =>
  expect(container.querySelector('ol')).not.toBeInTheDocument();

describe('MostReadContainerCanonical Assertion', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  [
    {
      description: 'should render most read for pidgin with toggles on',
      service: 'pidgin',
      mostReadToggle: true,
      isAmp: false,
      variant: null,
      renderExpectation: shouldRenderMostRead,
      dataResponse: setFreshPromoTimestamp(pidginMostReadData),
    },
    {
      description: 'should render most read for serbian lat with toggles on',
      service: 'serbian',
      mostReadToggle: true,
      isAmp: false,
      variant: 'lat',
      renderExpectation: shouldRenderMostRead,
      dataResponse: setFreshPromoTimestamp(serbianLatMostReadData),
    },
    {
      description: 'should not render most read for pidgin with toggles off',
      service: 'pidgin',
      mostReadToggle: false,
      isAmp: false,
      variant: null,
      renderExpectation: shouldNotRenderMostRead,
      dataResponse: setFreshPromoTimestamp(pidginMostReadData),
    },
    {
      description: 'should not render most read for archive',
      service: 'archive',
      mostReadToggle: true,
      isAmp: false,
      variant: null,
      renderExpectation: shouldNotRenderMostRead,
      dataResponse: null,
    },
    {
      description: 'should not render most read for amp pages',
      service: 'pidgin',
      mostReadToggle: true,
      isAmp: true,
      variant: null,
      renderExpectation: shouldNotRenderMostRead,
      dataResponse: setFreshPromoTimestamp(pidginMostReadData),
    },
  ].forEach(
    ({
      description,
      service,
      mostReadToggle,
      isAmp,
      variant,
      renderExpectation,
      dataResponse,
    }) => {
      it(description, async () => {
        fetch.mockResponse(JSON.stringify(dataResponse));

        let container;
        await act(async () => {
          container = await render(
            <MostReadWithContext
              service={service}
              mostReadToggle={mostReadToggle}
              isAmp={isAmp}
              variant={variant}
            />,
          ).container;
        });

        renderExpectation(container);
      });
    },
  );
});
