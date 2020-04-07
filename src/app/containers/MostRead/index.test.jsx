import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { setFreshPromoTimestamp } from './utilities/testHelpers';
import pidginData from '#data/pidgin/mostRead';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

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

const shouldRenderMostRead = (container) =>
  expect(container.querySelector('ol')).toBeInTheDocument();

const shouldNotRenderMostRead = (container) =>
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
      mostReadData: pidginData,
      renderExpectation: shouldRenderMostRead,
    },
    {
      description: 'should not render most read for pidgin with toggles off',
      service: 'pidgin',
      mostReadToggle: false,
      isAmp: false,
      variant: null,
      mostReadData: pidginData,
      renderExpectation: shouldNotRenderMostRead,
    },
    // {
    //   service: 'archive',
    //   mostReadToggle: true,
    //   isAmp: false,
    //   variant: null,
    //   expectedReturn: 0,
    //   mostReadData: pidginData,
    // },
  ].forEach(
    ({
      description,
      service,
      mostReadToggle,
      isAmp,
      variant,
      mostReadData,
      renderExpectation,
    }) => {
      it(`${description}`, async () => {
        fetch.mockResponse(
          JSON.stringify(setFreshPromoTimestamp(mostReadData)),
        );

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

  // Object.keys(services).forEach((service) => {
  //   it(`should render most read correctly for ${service}`, async () => {
  //     const { variant, data: mostReadData } = services[service];
  //     fetch.mockResponse(JSON.stringify(setFreshPromoTimestamp(mostReadData)));

  //     await matchSnapshotAsync(
  //       <MostReadWithContext
  //         service={service}
  //         variant={variant}
  //         mostReadToggle
  //       />,
  //     );
  //   });

  //   // it(`should render most read as expected on canonical for ${service}`, async () => {
  //   //   const { variant, data: mostReadData, config } = services[service];

  //   //   fetch.mockResponse(JSON.stringify(setFreshPromoTimestamp(mostReadData)));

  //   //   const { container } = render(
  //   //     <MostReadWithContext
  //   //       service={service}
  //   //       variant={variant}
  //   //       mostReadToggle
  //   //     />,
  //   //   );

  //   //   await wait(() => {
  //   //     expect(container.querySelectorAll('ul').length).toEqual(1);
  //   //     expect(container.querySelectorAll('li').length).toEqual(
  //   //       config.mostRead.numberOfItems,
  //   //     );
  //   //     expect(container.querySelectorAll('li>a').length).toEqual(
  //   //       config.mostRead.numberOfItems,
  //   //     );
  //   //   });
  //   // });

  //   it(`should return empty string when mostRead feature toggle is disabled - ${service}`, async () => {
  //     const { variant } = services[service];
  //     const { container } = render(
  //       <MostReadWithContext service={service} variant={variant} />,
  //     );

  //     await wait(expectEmptyContainer(container));
  //   });

  //   it(`should return empty string on AMP pages - ${service}`, async () => {
  //     const { variant } = services[service];
  //     const { container } = render(
  //       <MostReadWithContext
  //         isAmp
  //         service={service}
  //         variant={variant}
  //         mostReadToggle
  //       />,
  //     );

  //     await wait(expectEmptyContainer(container));
  //   });
  // });
});
