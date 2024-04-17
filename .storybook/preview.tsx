import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import isChromatic from 'chromatic';
import { forceVisible } from 'react-lazyload';
import { Preview } from '@storybook/react';
import GlobalStyles from '../src/app/legacy/psammead/psammead-styles/src/global-styles';
import DocsDecorator from './DocsDecorator';
import ThemeProvider from '../src/app/components/ThemeProvider';
import { ServiceContextProvider } from '../src/app/contexts/ServiceContext';
import { ToggleContextProvider } from '../src/app/contexts/ToggleContext';
import { UserContextProvider } from '../src/app/contexts/UserContext';
import { EventTrackingContextProvider } from '../src/app/contexts/EventTrackingContext';
import withServicesDecorator from './withServicesDecorator';
import pageDataFixture from '../data/news/articles/c0g992jmmkko.json';

const REITH_SERIF_REGULAR = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/BBCReithSerif_W_Rg.woff2") format("woff2"), url("fonts/Reith/BBCReithSerif_W_Rg.woff") format("woff")`,
    fontDisplay: 'block',
  },
};

const REITH_SERIF_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/BBCReithSerif_W_Bd.woff2") format("woff2"), url("fonts/Reith/BBCReithSerif_W_Bd.woff") format("woff")`,
    fontWeight: 700,
    fontDisplay: 'block',
  },
};

const REITH_SERIF_LIGHT = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/subsets/BBCReithSerif_WNumbers_Lt.woff2") format("woff2"), url("fonts/Reith/subsets/BBCReithSerif_WNumbers_Lt.woff") format("woff")`,
    fontWeight: 300,
    fontDisplay: 'block',
  },
};

const REITH_SERIF_MEDIUM = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/BBCReithSerif_W_Md.woff2") format("woff2"), url("fonts/Reith/BBCReithSerif_W_Md.woff") format("woff")`,
    fontWeight: 500,
    fontDisplay: 'block',
  },
};

const REITH_SERIF_EXTRA_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSerif',
    src: `url("fonts/Reith/BBCReithSerif_W_ExBd.woff2") format("woff2"), url("fonts/Reith/BBCReithSerif_W_ExBd.woff") format("woff")`,
    fontWeight: 800,
    fontDisplay: 'block',
  },
};

const REITH_SANS_REGULAR = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_Rg.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_Rg.woff") format("woff")`,
    fontDisplay: 'block',
  },
};

const REITH_SANS_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_Bd.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_Bd.woff") format("woff")`,
    fontWeight: 700,
    fontDisplay: 'block',
  },
};

const REITH_SANS_LIGHT = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_Lt.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_Lt.woff") format("woff")`,
    fontWeight: 300,
    fontDisplay: 'block',
  },
};

const REITH_SANS_LIGHT_ITALIC = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_LtIt.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_LtIt.woff") format("woff")`,
    fontWeight: 300,
    fontStyle: 'italic',
    fontDisplay: 'block',
  },
};

const REITH_SANS_MEDIUM = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_Md.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_Md.woff") format("woff")`,
    fontWeight: 500,
    fontDisplay: 'block',
  },
};

const REITH_SANS_EXTRA_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_ExBd.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_ExBd.woff") format("woff")`,
    fontWeight: 800,
    fontDisplay: 'block',
  },
};

const REITH_SANS_EXTRA_BOLD_ITALIC = {
  '@font-face': {
    fontFamily: 'ReithSans',
    src: `url("fonts/Reith/BBCReithSans_W_ExBdIt.woff2") format("woff2"), url("fonts/Reith/BBCReithSans_W_ExBdIt.woff") format("woff")`,
    fontWeight: 800,
    fontStyle: 'italic',
    fontDisplay: 'block',
  },
};

const REITH_SANS_CONDENSED_REGULAR = {
  '@font-face': {
    fontFamily: 'ReithSansCondensed',
    src: `url("fonts/Reith/BBCReithSansCd_W_Rg.woff2") format("woff2"), url("fonts/Reith/BBCReithSansCd_W_Rg.woff") format("woff")`,
    fontDisplay: 'block',
  },
};

const REITH_SANS_CONDENSED_BOLD = {
  '@font-face': {
    fontFamily: 'ReithSansCondensed',
    fontWeight: 700,
    src: `url("fonts/Reith/BBCReithSansCd_W_Bd.woff2") format("woff2"), url("fonts/Reith/BBCReithSansCd_W_Bd.woff") format("woff")`,
    fontDisplay: 'block',
  },
};

const NOTO_SERIF_SINHALA_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/NotoSerifBengali/normal.woff2') format('woff2'), url('fonts/NotoSerifBengali/normal.woff') format('woff'), url('fonts/NotoSerifBengali/normal.eot') format('eot'), url('fonts/NotoSerifBengali/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SERIF_SINHALA_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Serif Sinhala',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/NotoSerifBengali/bold.woff2') format('woff2'), url('fonts/NotoSerifBengali/bold.woff') format('woff'), url('fonts/NotoSerifBengali/bold.eot') format('eot'), url('fonts/NotoSerifBengali/bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SANS_TAMIL_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/NotoSansTamil/normal.woff2') format('woff2'), url('fonts/NotoSansTamil/normal.woff') format('woff'), url('fonts/NotoSansTamil/normal.eot') format('eot'), url('fonts/NotoSansTamil/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SANS_TAMIL_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/NotoSansTamil/bold.woff2') format('woff2'), url('fonts/NotoSansTamil/bold.woff') format('woff'), url('fonts/NotoSansTamil/normal.eot') format('eot'), url('fonts/NotoSansTamil/bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const MALLANNA_REGULAR = {
  '@font-face': {
    fontFamily: 'Mallanna',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/Mallanna/normal.woff') format('woff'), url('fonts/Mallanna/normal.eot') format('eot'), url('fonts/Mallanna/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SANS_ETHIOPIC_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/NotoSansEthiopic/normal.woff') format('woff'), url('fonts/NotoSansEthiopic/normal.eot') format('eot'), url('fonts/NotoSansEthiopic/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SANS_ETHIOPIC_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Sans Ethiopic',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/NotoSansEthiopic/bold.woff') format('woff'), url('fonts/NotoSansEthiopic/bold.eot') format('eot'), url('fonts/NotoSansEthiopic/bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const PADAUK_REGULAR = {
  '@font-face': {
    fontFamily: 'Padauk',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/Padauk/normal.woff') format('woff'), url('fonts/Padauk/normal.eot') format('eot'), url('fonts/Padauk/normal.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const PADAUK_BOLD = {
  '@font-face': {
    fontFamily: 'Padauk',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/Padauk/bold.woff') format('woff'), url('fonts/Padauk/bold.eot') format('eot'), url('fonts/Padauk/bold.ttf') format('ttf')`,
    fontDisplay: 'swap',
  },
};

const NOTO_SERIF_BENGALI_REGULAR = {
  '@font-face': {
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/NotoSerifBengali/normal.woff2') format('woff2'), url('fonts/NotoSerifBengali/normal.woff') format('woff'), url('fonts/NotoSerifBengali/normal.eot') format('eot'), url('fonts/NotoSerifBengali/normal.ttf') format('ttf')`,
    fontDisplay: 'block',
  },
};

const NOTO_SERIF_BENGALI_BOLD = {
  '@font-face': {
    fontFamily: 'Noto Serif Bengali',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/NotoSerifBengali/bold.woff2') format('woff2'), url('fonts/NotoSerifBengali/bold.woff') format('woff'), url('fonts/NotoSerifBengali/normal.eot') format('eot'), url('fonts/NotoSerifBengali/bold.ttf') format('ttf')`,
    fontDisplay: 'block',
  },
};

const REITH_QALAM_REGULAR = {
  '@font-face': {
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 400,
    fontStyle: 'normal',
    src: `url('fonts/ReithQalam/normal.woff2') format('woff2'), url('fonts/ReithQalam/normal.woff') format('woff')`,
    fontDisplay: 'block',
  },
};

const REITH_QALAM_BOLD = {
  '@font-face': {
    fontFamily: 'BBC Reith Qalam',
    fontWeight: 700,
    fontStyle: 'normal',
    src: `url('fonts/ReithQalam/bold.woff2') format('woff2'), url('fonts/ReithQalam/bold.woff') format('woff')`,
    fontDisplay: 'block',
  },
};

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
        items: [
          {
            value: { service: 'afaanoromoo', variant: 'default' },
            title: 'afaanoromoo',
          },
          {
            value: { service: 'afrique', variant: 'default' },
            title: 'afrique',
          },
          {
            value: { service: 'amharic', variant: 'default' },
            title: 'amharic',
          },
          {
            value: { service: 'arabic', variant: 'default' },
            title: 'arabic',
          },
          {
            value: { service: 'archive', variant: 'default' },
            title: 'archive',
          },
          {
            value: { service: 'azeri', variant: 'default' },
            title: 'azeri',
          },
          {
            value: { service: 'bengali', variant: 'default' },
            title: 'bengali',
          },
          {
            value: { service: 'burmese', variant: 'default' },
            title: 'burmese',
          },
          {
            value: { service: 'cymrufyw', variant: 'default' },
            title: 'cymrufyw',
          },
          {
            value: { service: 'gahuza', variant: 'default' },
            title: 'gahuza',
          },
          {
            value: { service: 'gujarati', variant: 'default' },
            title: 'gujarati',
          },
          {
            value: { service: 'hausa', variant: 'default' },
            title: 'hausa',
          },
          {
            value: { service: 'hindi', variant: 'default' },
            title: 'hindi',
          },
          {
            value: { service: 'igbo', variant: 'default' },
            title: 'igbo',
          },
          {
            value: { service: 'indonesia', variant: 'default' },
            title: 'indonesia',
          },
          {
            value: { service: 'japanese', variant: 'default' },
            title: 'japanese',
          },
          {
            value: { service: 'korean', variant: 'default' },
            title: 'korean',
          },
          {
            value: { service: 'kyrgyz', variant: 'default' },
            title: 'kyrgyz',
          },
          {
            value: { service: 'marathi', variant: 'default' },
            title: 'marathi',
          },
          {
            value: { service: 'mundo', variant: 'default' },
            title: 'mundo',
          },
          {
            value: { service: 'naidheachdan', variant: 'default' },
            title: 'naidheachdan',
          },
          {
            value: { service: 'nepali', variant: 'default' },
            title: 'nepali',
          },
          {
            value: { service: 'news', variant: 'default' },
            title: 'news',
          },
          {
            value: { service: 'newsround', variant: 'default' },
            title: 'newsround',
          },
          {
            value: { service: 'pashto', variant: 'default' },
            title: 'pashto',
          },
          {
            value: { service: 'persian', variant: 'default' },
            title: 'persian',
          },
          {
            value: { service: 'pidgin', variant: 'default' },
            title: 'pidgin',
          },
          {
            value: { service: 'portuguese', variant: 'default' },
            title: 'portuguese',
          },
          {
            value: { service: 'punjabi', variant: 'default' },
            title: 'punjabi',
          },
          {
            value: { service: 'russian', variant: 'default' },
            title: 'russian',
          },
          {
            value: { service: 'scotland', variant: 'default' },
            title: 'scotland',
          },
          {
            value: { service: 'sport', variant: 'default' },
            title: 'sport',
          },
          {
            value: { service: 'sinhala', variant: 'default' },
            title: 'sinhala',
          },
          {
            value: { service: 'somali', variant: 'default' },
            title: 'somali',
          },
          {
            value: { service: 'swahili', variant: 'default' },
            title: 'swahili',
          },
          {
            value: { service: 'tamil', variant: 'default' },
            title: 'tamil',
          },
          {
            value: { service: 'telugu', variant: 'default' },
            title: 'telugu',
          },
          {
            value: { service: 'thai', variant: 'default' },
            title: 'thai',
          },
          {
            value: { service: 'tigrinya', variant: 'default' },
            title: 'tigrinya',
          },
          {
            value: { service: 'turkce', variant: 'default' },
            title: 'turkce',
          },
          {
            value: { service: 'urdu', variant: 'default' },
            title: 'urdu',
          },
          {
            value: { service: 'uzbek', variant: 'default' },
            title: 'uzbek',
          },
          {
            value: { service: 'vietnamese', variant: 'default' },
            title: 'vietnamese',
          },
          {
            value: { service: 'yoruba', variant: 'default' },
            title: 'yoruba',
          },
          {
            value: { service: 'serbian', variant: 'cyr' },
            title: 'serbian-cyr',
          },
          {
            value: { service: 'serbian', variant: 'lat' },
            title: 'serbian-lat',
          },
          {
            value: { service: 'ukchina', variant: 'simp' },
            title: 'ukchina-simp',
          },
          {
            value: { service: 'ukchina', variant: 'trad' },
            title: 'ukchina-trad',
          },
          {
            value: { service: 'zhongwen', variant: 'simp' },
            title: 'zhongwen-simp',
          },
          {
            value: { service: 'zhongwen', variant: 'trad' },
            title: 'zhongwen-trad',
          },
          {
            value: { service: 'ukrainian', variant: 'default' },
            title: 'ukrainian-default',
          },
          {
            value: { service: 'ukrainian', variant: 'ru-UA' },
            title: 'ukrainian-ru-UA',
          },
        ],
        // Should "Container size" be shown, or just the "circlehollow" icon
        dynamicTitle: true,
      },
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
      default: 'CPS',
      values: [
        {
          name: 'Optimo',
          value: '#F6F6F6',
        },
        {
          name: 'CPS',
          value: '#FFFFFF',
        },
      ],
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
          styles: { width: '399px', height: '900px' },
          type: 'mobile',
        },
        group2: {
          name: 'Group 2 (400px - 599px)',
          styles: { width: '599px', height: '900px' },
          type: 'mobile',
        },
        group3: {
          name: 'Group 3 (600px - 899px)',
          styles: { width: '899px', height: '900px' },
          type: 'mobile',
        },
        group4: {
          name: 'Group 4 (900px - 1007px)',
          styles: { width: '1007px', height: '900px' },
          type: 'tablet',
        },
        group5: {
          name: 'Group 5 (1008px - 1279px)',
          styles: { width: '1279px', height: '900px' },
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
    // @ts-expect-error - global context doesn't have types for custom properties like service
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
              REITH_SERIF_REGULAR,
              REITH_SERIF_BOLD,
              REITH_SERIF_LIGHT,
              REITH_SERIF_MEDIUM,
              REITH_SERIF_EXTRA_BOLD,
              REITH_SANS_REGULAR,
              REITH_SANS_BOLD,
              REITH_SANS_LIGHT,
              REITH_SANS_LIGHT_ITALIC,
              REITH_SANS_MEDIUM,
              REITH_SANS_EXTRA_BOLD,
              REITH_SANS_EXTRA_BOLD_ITALIC,
              REITH_SANS_CONDENSED_REGULAR,
              REITH_SANS_CONDENSED_BOLD,
              NOTO_SERIF_SINHALA_REGULAR,
              NOTO_SERIF_SINHALA_BOLD,
              NOTO_SANS_TAMIL_REGULAR,
              NOTO_SANS_TAMIL_BOLD,
              MALLANNA_REGULAR,
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
      <ThemeProvider
        service={context.globals.service.service}
        variant={context.globals.service.variant}
      >
        <ToggleContextProvider toggles={{}}>
          <ServiceContextProvider
            service={context.globals.service.service}
            variant={context.globals.service.variant}
          >
            <EventTrackingContextProvider
              // @ts-expect-error - mock data for Storybook
              pageData={pageDataFixture}
            >
              <UserContextProvider>
                <Story />
              </UserContextProvider>
            </EventTrackingContextProvider>
          </ServiceContextProvider>
        </ToggleContextProvider>
      </ThemeProvider>
    ),
  ],
};
export default preview;
