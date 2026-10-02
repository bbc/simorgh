import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { ServiceConfig } from '#app/models/types/serviceConfig';

type Heights = NonNullable<
  NonNullable<ServiceConfig['electionBanner']>['heights']
>;

// to do - type
type AssociatedPressHeights = {
  mobile: number;
  tablet: number; // not used
  desktop: number;
};

const AP_BREAKPOINTS = {
  desktop: `@media (min-width: ${pixelsToRem(768)}rem)`, // desktop
};

const AP_EMBED_MAX_WIDTH = `${pixelsToRem(1008)}rem`;
const AP_EMBED_BACKGROUND_BLACK = '#000000';

export default {
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
  assocPressElectionBannerBackground:
    ({ mobile, desktop }: AssociatedPressHeights) =>
    () =>
      css({
        background: AP_EMBED_BACKGROUND_BLACK,
        width: '100%',
        margin: '0 auto',
        borderBottom: `solid ${pixelsToRem(1)}rem transparent`,
        minHeight: `${pixelsToRem(mobile)}rem`,
        [AP_BREAKPOINTS.desktop]: {
          minHeight: `${pixelsToRem(desktop)}rem`,
        },
      }),
  assocPressElectionBannerIframe:
    ({ mobile, desktop }: AssociatedPressHeights) =>
    () =>
      css({
        border: 'none',
        display: 'block', // required for margin auto centring to take effect
        maxWidth: AP_EMBED_MAX_WIDTH, // limit width on desktop, in line with VJ design
        margin: '0 auto', // centre on desktop
        minHeight: `${pixelsToRem(mobile)}rem`, // fallback for non-AMP iframe
        [AP_BREAKPOINTS.desktop]: {
          minHeight: `${pixelsToRem(desktop)}rem`,
        },
      }),
  limitsAmpToMobileViewport: ({ mq }: Theme) =>
    css({
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'none',
      }, // hides on larger breakpoints on .amp
    }),
  assocPressElectionBannerWrapperAmp:
    ({ mobile, desktop }: AssociatedPressHeights) =>
    // ({ default, }: AssociatedPressHeights) =>
    ({ spacings, mq }: Theme) =>
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
          minHeight: `${pixelsToRem(mobile)}rem`, // fallback for AMP iframe
          [AP_BREAKPOINTS.desktop]: {
            minHeight: `${pixelsToRem(desktop)}rem`,
          },
        },
      }),
};
