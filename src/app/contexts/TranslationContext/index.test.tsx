import React, { useContext } from 'react';
import { cleanup, render, act } from '@testing-library/react';
import { TranslationContext, TranslationContextProvider } from '.';
import translations from './utils/translationServices';
import { Services, Variants } from '../../models/types/global';
import { Translations } from '../../models/types/translations';

// Unmock service context which is mocked globally in jest-setup.js
jest.unmock('./index');

describe('TranslationContextProvider', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  describe('should load hydrated translation context', () => {
    const testForServiceAndVariant = (service: Services, variant: Variants) => {
      it(`should have a topStoriesTitle for ${service} and variant ${variant}`, async () => {
        const Component = () => {
          const { topStoriesTitle } = useContext(TranslationContext);

          return <span>{topStoriesTitle}</span>;
        };

        const translationContextProps = {
          service,
          // Dont pass variant if its 'default', this better mirrors the
          // behaviour in the production app, where variant is unset for
          // services with only a 'default' variant
          variant: variant === 'default' ? null : variant,
        };

        let container!: HTMLElement;

        await act(async () => {
          container = render(
            <TranslationContextProvider {...translationContextProps}>
              <Component />
            </TranslationContextProvider>,
          ).container;
        });

        expect(container.firstChild?.textContent).toEqual(
          translations[service][variant].topStoriesTitle,
        );
      });
    };

    Object.keys(translations).forEach(service => {
      Object.keys(translations[service as Services]).forEach(variant =>
        testForServiceAndVariant(service as Services, variant as Variants),
      );
    });

    it(`should return null for foobar service`, async () => {
      const Component = () => {
        const { topStoriesTitle } = useContext(TranslationContext);

        return <span>{topStoriesTitle}</span>;
      };

      const { container } = render(
        // @ts-expect-error test passing invalid service
        <TranslationContextProvider service="foobar">
          <Component />
        </TranslationContextProvider>,
      );

      expect(container.querySelector('span')).toBeNull();
    });
  });

  describe('should load ukrainian config with lang override', () => {
    [
      {
        description:
          'should load russian translations for main body translations',
        service: 'ukrainian' as Services,
        variant: undefined,
        pageLang: 'ru',
        expectedTranslation: 'Читайте также',
        assertionValue: 'relatedContent',
      },
      {
        description:
          'should load ukrainian translations for secondary column translations',
        service: 'ukrainian' as Services,
        variant: undefined,
        pageLang: 'ru',
        expectedTranslation: 'Головне',
        assertionValue: 'topStoriesTitle',
      },
      {
        description:
          'should load ukrainian translations for header/footer translations',
        service: 'ukrainian' as Services,
        variant: undefined,
        pageLang: 'ru',
        expectedTranslation: 'Розділи',
        assertionValue: 'navMenuText',
      },
      {
        description: 'should load default ukrainian translations',
        service: 'ukrainian' as Services,
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
          const Component = () => {
            const translationsObject = useContext(TranslationContext);

            const { [assertionValue as keyof Translations]: item } =
              translationsObject;

            return <span>{item}</span>;
          };

          let container!: HTMLElement;

          await act(async () => {
            container = render(
              <TranslationContextProvider service={service} pageLang={pageLang}>
                <Component />
              </TranslationContextProvider>,
            ).container;
          });

          expect(container.firstChild?.textContent).toEqual(
            expectedTranslation,
          );
        });
      },
    );
  });
});
