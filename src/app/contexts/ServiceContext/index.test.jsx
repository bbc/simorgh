import React, { useContext } from 'react';
import { cleanup, render, waitFor, act } from '@testing-library/react';
import services from '#server/utilities/serviceConfigs';

// Unmock service context which is mocked globally in jest-setup.js
jest.unmock('./index');

describe('ServiceContextProvider', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  describe('should load hydrated service context', () => {
    const testForServiceAndVariant = (service, variant) => {
      it(`should have a brand name for ${service} and variant ${variant}`, async () => {
        // eslint-disable-next-line global-require
        const { ServiceContext, ServiceContextProvider } = require('./index');

        const Component = () => {
          const { brandName } = useContext(ServiceContext);

          return <span>{brandName}</span>;
        };

        const serviceContextProps = {
          service,
          // Dont pass variant if its 'default', this better mirrors the
          // behaviour in the production app, where variant is unset for
          // services with only a 'default' variant
          variant: variant === 'default' ? null : variant,
        };

        const { container } = render(
          <ServiceContextProvider {...serviceContextProps}>
            <Component />
          </ServiceContextProvider>,
        );

        await waitFor(() => container.querySelector('span'));

        expect(container.firstChild.innerHTML).toEqual(
          services[service][variant].brandName,
        );
      });
    };

    Object.keys(services).forEach(service => {
      Object.keys(services[service]).forEach(variant =>
        testForServiceAndVariant(service, variant),
      );
    });

    it(`should return null for foobar service`, async () => {
      // eslint-disable-next-line global-require
      const { ServiceContext, ServiceContextProvider } = require('./index');

      const Component = () => {
        const { brandName } = useContext(ServiceContext);

        return <span>{brandName}</span>;
      };

      const { container } = render(
        <ServiceContextProvider service="foobar">
          <Component />
        </ServiceContextProvider>,
      );

      expect(container.querySelector('span')).toBeNull();
    });
  });

  describe('should load ukrainian config with lang override', () => {
    [
      {
        description:
          'should load russian translations for main body translations',
        service: 'ukrainian',
        variant: undefined,
        pageLang: 'ru',
        expectedTranslation: 'Главное',
        assertionValue: 'topStoriesTitle',
      },
      {
        description:
          'should load ukrainian translations for header/footer translations',
        service: 'ukrainian',
        variant: undefined,
        pageLang: 'ru',
        expectedTranslation: 'Розділи',
        assertionValue: 'navMenuText',
      },
      {
        description: 'should load default ukrainian translations',
        service: 'ukrainian',
        variant: undefined,
        pageLang: 'uk',
        expectedTranslation: 'Головне',
        assertionValue: 'topStoriesTitle',
      },
    ].forEach(
      ({
        description,
        service,
        pageLang,
        expectedTranslation,
        assertionValue,
      }) => {
        it(description, async () => {
          // eslint-disable-next-line global-require
          const { ServiceContext, ServiceContextProvider } = require('./index');

          const Component = () => {
            const { translations } = useContext(ServiceContext);

            return <span>{translations[assertionValue]}</span>;
          };

          let container;
          await act(async () => {
            container = await render(
              <ServiceContextProvider service={service} pageLang={pageLang}>
                <Component />
              </ServiceContextProvider>,
            ).container;
          });

          expect(container.firstChild.innerHTML).toEqual(expectedTranslation);
        });
      },
    );
  });
});
