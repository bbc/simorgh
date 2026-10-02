import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { ServiceConfig } from '#app/models/types/serviceConfig';

type Heights = NonNullable<
  NonNullable<ServiceConfig['electionBanner']>['heights']
>;

type AssociatedPressHeights = {
  max265: number;
  max419: number;
  max526: number;
  max767: number;
  desktop: number;
};

const AP_BREAKPOINTS = {
  max265: `@media (max-width: ${pixelsToRem(265)}rem)`,
  max419: `@media (max-width: ${pixelsToRem(419)}rem)`,
  max526: `@media (max-width: ${pixelsToRem(526)}rem)`,
  max767: `@media (max-width: ${pixelsToRem(767)}rem)`,
};

const AP_EMBED_MAX_WIDTH = `${pixelsToRem(1008)}rem`;
const AP_EMBED_BACKGROUND =
  'linear-gradient(180deg, #2D0059 0%, #230046 50%, #000000 100%)';

export default {
  electionBannerBackground:
    ({ max265, max419, max526, max767, desktop }: AssociatedPressHeights) =>
    () =>
      css({
        background: AP_EMBED_BACKGROUND,
        width: '100%',
        minHeight: `${pixelsToRem(desktop)}rem`,
        [AP_BREAKPOINTS.max767]: {
          minHeight: `${pixelsToRem(max767)}rem`,
        },
        [AP_BREAKPOINTS.max526]: {
          minHeight: `${pixelsToRem(max526)}rem`,
        },
        [AP_BREAKPOINTS.max419]: {
          minHeight: `${pixelsToRem(max419)}rem`,
        },
        [AP_BREAKPOINTS.max265]: {
          minHeight: `${pixelsToRem(max265)}rem`,
        },
      }),
  electionBannerWrapper: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.FULL}rem`,
    }),
  electionBannerIframe:
    ({ mobile, tablet, desktop }: Heights) =>
    ({ mq }: Theme) =>
      css({
        border: 'none',
        width: '100%',
        height: `${pixelsToRem(mobile)}rem`,
        [mq.GROUP_3_MIN_WIDTH]: {
          height: `${pixelsToRem(tablet)}rem`,
        },
        [mq.GROUP_4_MIN_WIDTH]: {
          height: `${pixelsToRem(desktop)}rem`,
        },
      }),
  electionBannerIframeExtra:
    ({ max265, max419, max526, max767, desktop }: AssociatedPressHeights) =>
    () =>
      css({
        border: 'none',
        display: 'block', // required for margin auto centring to take effect
        maxWidth: AP_EMBED_MAX_WIDTH, // limit width on desktop, in line with VJ design
        margin: '0 auto', // centre on desktop
        minHeight: `${pixelsToRem(desktop)}rem`,
        [AP_BREAKPOINTS.max767]: {
          minHeight: `${pixelsToRem(max767)}rem`,
        },
        [AP_BREAKPOINTS.max526]: {
          minHeight: `${pixelsToRem(max526)}rem`,
        },
        [AP_BREAKPOINTS.max419]: {
          minHeight: `${pixelsToRem(max419)}rem`,
        },
        [AP_BREAKPOINTS.max265]: {
          minHeight: `${pixelsToRem(max265)}rem`,
        },
      }),

  // fixed height - problematic if embed will grow or shrink dynamically
  electionBannerWrapperAmpExtra:
    ({ max265, max419, max526, max767, desktop }: AssociatedPressHeights) =>
    ({ spacings }: Theme) =>
      css({
        overflow: 'hidden',
        marginBottom: `${spacings.FULL}rem`,
        '> div': { padding: '0' },
        '& amp-img': {
          maxWidth: 640,
          margin: '0 auto',
        },
        '& amp-iframe': {
          border: 'none',
          width: '100%',
          height: `${pixelsToRem(desktop)}rem`,
          [AP_BREAKPOINTS.max767]: {
            height: `${pixelsToRem(max767)}rem`,
          },
          [AP_BREAKPOINTS.max526]: {
            height: `${pixelsToRem(max526)}rem`,
          },
          [AP_BREAKPOINTS.max419]: {
            height: `${pixelsToRem(max419)}rem`,
          },
          [AP_BREAKPOINTS.max265]: {
            height: `${pixelsToRem(max265)}rem`,
          },
        },
      }),

  electionBannerWrapperAmp:
    ({ mobile, tablet, desktop }: Heights) =>
    ({ mq, spacings }: Theme) =>
      css({
        overflow: 'hidden',
        marginBottom: `${spacings.FULL}rem`,
        '> div': { padding: '0' },
        '& amp-img': {
          maxWidth: 640,
          margin: '0 auto',
        },
        '& amp-iframe': {
          border: 'none',
          width: '100%',
          height: `${pixelsToRem(mobile)}rem`,
          [mq.GROUP_3_MIN_WIDTH]: {
            height: `${pixelsToRem(tablet)}rem`,
          },
          [mq.GROUP_4_MIN_WIDTH]: {
            height: `${pixelsToRem(desktop)}rem`,
          },
        },
      }),
};
