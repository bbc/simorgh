import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { ServiceConfig } from '#app/models/types/serviceConfig';

type Heights = NonNullable<
  NonNullable<ServiceConfig['electionBanner']>['heights']
>;

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
};
