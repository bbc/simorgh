import { useEffect } from 'react';
import { Global } from '@emotion/react';
import isChromatic from 'chromatic/isChromatic';
import { forceVisible } from 'react-lazyload';
import { Preview } from '@storybook/react-webpack5';
import GlobalStyles from '../src/app/legacy/psammead/psammead-styles/src/global-styles';
import DocsDecorator from './DocsDecorator';
import ThemeProvider from '../src/app/components/ThemeProvider';
import { ServiceContextProvider } from '../src/app/contexts/ServiceContext';
import { ToggleContextProvider } from '../src/app/contexts/ToggleContext';
import { UserContextProvider } from '../src/app/contexts/UserContext';
import { EventTrackingContextProvider } from '../src/app/contexts/EventTrackingContext';
import withServicesDecorator from './withServicesDecorator';
import pageDataFixture from '../data/news/articles/c0g992jmmkko.json';
import { RequestContextProvider } from '../src/app/contexts/RequestContext';
import serviceConfigs from '../src/server/utilities/serviceConfigs';
import {
  NOTO_SANS_ETHIOPIC_BOLD,
  NOTO_SANS_ETHIOPIC_REGULAR,
  NOTO_SANS_GUJARATI_BOLD,
  NOTO_SANS_GUJARATI_REGULAR,
  NOTO_SANS_TAMIL_BOLD,
  NOTO_SANS_TAMIL_REGULAR,
  NOTO_SANS_TELUGU_BOLD,
  NOTO_SANS_TELUGU_REGULAR,
  NOTO_SERIF_BENGALI_BOLD,
  NOTO_SERIF_BENGALI_REGULAR,
  NOTO_SERIF_SINHALA_BOLD,
  NOTO_SERIF_SINHALA_REGULAR,
  PADAUK_BOLD,
  PADAUK_REGULAR,
  REITH_QALAM_BOLD,
  REITH_QALAM_REGULAR,
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_LIGHT,
  REITH_SERIF_MEDIUM,
} from '../src/app/components/ThemeProvider/fontFaces';

const services = Object.entries(serviceConfigs)
  .sort()
  .flatMap(([service, variantConfigs]) => {
    return Object.entries(variantConfigs).flatMap(([variant]) => {
      return {
        value: { service, variant },
        title: variant === 'default' ? service : `${service}-${variant}`,
      };
    });
  });

const preview: Preview = {
  globalTypes: {
    service: {
      name: 'service',
      // Text that will be shown on icon hover
      description: 'Global service',
      defaultValue: { service: 'news', variant: 'default' },
      toolbar: {
        /**
         * You can check all available icons by this link:
         * https://storybook.js.org/docs/riot/workflows/faq#what-icons-are-available-for-my-toolbar-or-my-addon
         */
        icon: 'globe',
        items: services,
        dynamicTitle: true,
      },
    },
    isLite: {
      description: 'Toggle Lite mode',
      defaultValue: false,
      toolbar: {
        icon: 'lightning',
        items: [
          { value: false, title: 'Lite mode OFF' },
          { value: true, title: 'Lite mode ON' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    backgrounds: { value: 'White' },
    service: {
      service: 'news',
      variant: 'default',
    },
  },

  parameters: {
    passArgsFirst: false,
    options: {
      panelPosition: 'right',
      sidebarAnimations: true,
      storySort: {
        method: 'alphabetical',
        order: [
          'Components',
          'Containers',
          'Pages',
          'Coding Standards',
          'docs',
          'hooks',
          'Simorgh structure',
          'cypress',
        ],
      },
    },
    docs: {
      container: DocsDecorator,
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#141414' },
        light: { name: 'Light', value: '#F7F9F2' },
        White: { name: 'White', value: '#FFFFFF' },
        Optimo: { name: 'Optimo', value: '#F6F6F6' },
      },
    },
    chromatic: {
      delay: 5000,
    },
    viewport: {
      viewports: {
        group0: {
          name: 'Group 0 (0 - 239px)',
          styles: { width: '239px', height: '900px' },
          type: 'mobile',
        },
        group1: {
          name: 'Group 1 (240px - 399px)',
          styles: { width: '240px', height: '900px' },
          type: 'mobile',
        },
        group1_320: {
          name: 'Group 1 - 320px (320px - 399px)',
          styles: { width: '320px', height: '900px' },
          type: 'mobile',
        },
        group2: {
          name: 'Group 2 (400px - 599px)',
          styles: { width: '400px', height: '900px' },
          type: 'mobile',
        },
        group3: {
          name: 'Group 3 (600px - 899px)',
          styles: { width: '600px', height: '900px' },
          type: 'mobile',
        },
        group4: {
          name: 'Group 4 (900px - 1007px)',
          styles: { width: '900px', height: '900px' },
          type: 'tablet',
        },
        group5: {
          name: 'Group 5 (1008px - 1279px)',
          styles: { width: '1008px', height: '900px' },
          type: 'desktop',
        },
        group6: {
          name: 'Group 6 (1280px +)',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop',
        },
      },
    },
  },

  decorators: [
    // @ts-expect-error services decorator required for Storybook
    withServicesDecorator(),
    story => {
      useEffect(() => {
        if (isChromatic()) {
          forceVisible();
        }
      }, []);

      return (
        <>
          <Global
            styles={[
              REITH_SERIF_LIGHT,
              REITH_SERIF_MEDIUM,
              REITH_SANS_REGULAR,
              REITH_SANS_BOLD,
              NOTO_SERIF_SINHALA_REGULAR,
              NOTO_SERIF_SINHALA_BOLD,
              NOTO_SANS_TAMIL_REGULAR,
              NOTO_SANS_TAMIL_BOLD,
              NOTO_SANS_TELUGU_REGULAR,
              NOTO_SANS_TELUGU_BOLD,
              NOTO_SANS_GUJARATI_REGULAR,
              NOTO_SANS_GUJARATI_BOLD,
              NOTO_SANS_ETHIOPIC_REGULAR,
              NOTO_SANS_ETHIOPIC_BOLD,
              PADAUK_REGULAR,
              PADAUK_BOLD,
              NOTO_SERIF_BENGALI_REGULAR,
              NOTO_SERIF_BENGALI_BOLD,
              REITH_QALAM_REGULAR,
              REITH_QALAM_BOLD,
            ]}
          />
          <GlobalStyles />
          {story()}
        </>
      );
    },
    (Story, context) => (
      <ToggleContextProvider toggles={{}}>
        <ServiceContextProvider
          service={context.globals.service.service}
          variant={context.globals.service.variant}
        >
          <RequestContextProvider
            isLite={context.globals.isLite}
            // @ts-expect-error error TS2322: Type '"unknown"' is not assignable to type 'PageTypes'.
            pageType={'unknown'}
            pathname={''}
            service={context.globals.service.service}
          >
            <EventTrackingContextProvider
              // @ts-expect-error - mock data for Storybook
              pageData={pageDataFixture}
            >
              <UserContextProvider>
                <ThemeProvider
                  service={context.globals.service.service}
                  variant={context.globals.service.variant}
                >
                  <Story />
                </ThemeProvider>
              </UserContextProvider>
            </EventTrackingContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    ),
  ],

  tags: ['autodocs'],
};
export default preview;
