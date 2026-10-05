import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { ServiceConfig } from '#app/models/types/serviceConfig';

type Heights = NonNullable<
  NonNullable<ServiceConfig['electionBanner']>['heights']
>;

const AP_EMBED_MAX_WIDTH = `${pixelsToRem(1008)}rem`;

export const DEFAULT_HEIGHTS_VJ = {
  desktop: 350,
  tablet: 320,
  mobile: 315,
};

export const DEFAULT_HEIGHTS_AP = {
  desktop: 216,
  tablet: 400, // not used
  mobile: 340,
};

export default {
  electionBannerWrapper: ({ spacings }: Theme) =>
    css({
      padding: `${spacings.FULL}rem 0`,
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
  assocPressElectionBannerWrapper: ({ spacings, mq }: Theme) =>
    css({
      width: '100%',
      margin: '0 auto',
      borderBottom: `solid ${pixelsToRem(1)}rem transparent`,
      padding: `${spacings.FULL}rem 0`,

      '& iframe': {
        height: `${pixelsToRem(DEFAULT_HEIGHTS_AP.mobile)}rem`,

        [mq.GROUP_3_MIN_WIDTH]: {
          height: `${pixelsToRem(DEFAULT_HEIGHTS_AP.desktop)}rem`,
        },
      },
    }),
  assocPressElectionBannerIframe: () =>
    css({
      border: 'none',
      display: 'block', // required for margin auto centring to take effect
      maxWidth: AP_EMBED_MAX_WIDTH, // limit width on desktop, in line with VJ design
      margin: '0 auto', // centre on desktop
    }),
  assocPressElectionBannerWrapperAmp: ({ spacings, mq }: Theme) =>
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
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'none',
      }, // hides on larger breakpoints on .amp
    }),
};
