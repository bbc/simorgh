import React, { useContext } from 'react';
import { cleanup, render, act } from '@testing-library/react';
import externalLinks from '#server/utilities/podcastExternalLinkData';

// Unmock service context which is mocked globally in jest-setup.js
jest.unmock('./index');

const getBrandList = links => {
  const brands = Object.keys(links);
  return brands.join(',');
};

describe('PodcastContextProvider', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  describe('should load hydrated podcast context', () => {
    const testForServiceAndVariant = (service, variant) => {
      it(`should have a brand name for ${service} and variant ${variant}`, async () => {
        // eslint-disable-next-line global-require
        const { PodcastContext, PodcastContextProvider } = require('./index');

        const Component = () => {
          const links = useContext(PodcastContext);

          return <span>{getBrandList(links)}</span>;
        };

        const serviceContextProps = {
          service,
          // Don't pass variant if its 'default', this better mirrors the
          // behaviour in the production app, where variant is unset for
          // services with only a 'default' variant
          variant: variant === 'default' ? null : variant,
        };

        let container;
        await act(async () => {
          container = await render(
            <PodcastContextProvider {...serviceContextProps}>
              <Component />
            </PodcastContextProvider>,
          ).container;
        });

        expect(container.firstChild.innerHTML).toEqual(
          getBrandList(externalLinks[service][variant]),
        );
      });
    };

    Object.keys(externalLinks).forEach(service => {
      Object.keys(externalLinks[service]).forEach(variant =>
        testForServiceAndVariant(service, variant),
      );
    });

    it(`should return null for foobar service`, async () => {
      // eslint-disable-next-line global-require
      const { PodcastContext, PodcastContextProvider } = require('./index');

      const Component = () => {
        const links = useContext(PodcastContext);

        return <span>{getBrandList(links)}</span>;
      };

      const { container } = render(
        <PodcastContextProvider service="foobar">
          <Component />
        </PodcastContextProvider>,
      );

      expect(container.querySelector('span')).toBeNull();
    });
  });
});
