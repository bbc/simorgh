import { css, Theme } from '@emotion/react';
import {
  LEADERBOARD_MINIMUM_WIDTH,
  LEADERBOARD_HEIGHTS,
  MPU_MINIMUM_WIDTH,
  MPU_HEIGHTS,
} from '../utilities/adSlot.styles';

const styles = {
  link: ({ palette, spacings, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.minion,
      ...fontVariants.sansRegular,
      color: palette.RHINO,
      textDecoration: 'none',
      textTransform: 'uppercase',
      display: 'block',
      padding: `${spacings.FULL}rem 0`,
      '&:hover': {
        textDecoration: 'underline',
      },
    }),
  ltrLink: () =>
    css({
      textAlign: 'right',
    }),
  rtlLink: () =>
    css({
      textAlign: 'left',
    }),

  /*
  The Ad Unit (dotcom-ad-inner) already has margin-bottom of 0.5rem and
  the 'ADVERTISEMENT' Label (dotcom-ad-text) already has margin-top of 0.5rem,
  hence the padding is set such that this is accounted for.
*/

  leaderboard: ({ spacings, mq }: Theme) =>
    css({
      display: 'none',
      visibility: 'hidden',
      [LEADERBOARD_MINIMUM_WIDTH]: {
        minHeight: LEADERBOARD_HEIGHTS.GROUP_1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        visibility: 'visible',
        padding: `${spacings.DOUBLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        minHeight: LEADERBOARD_HEIGHTS.LARGE,
        padding: `${spacings.TRIPLE}rem 0`,
      },
    }),
  mpu: ({ spacings }: Theme) =>
    css({
      display: 'none',
      visibility: 'hidden',
      padding: 0,
      [MPU_MINIMUM_WIDTH]: {
        minHeight: MPU_HEIGHTS.GROUP_3,
        padding: `${spacings.DOUBLE}rem 0 ${spacings.FULL}rem 0`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        visibility: 'visible',
      },
    }),
  ampGeo: () =>
    css({
      '.amp-geo-pending &, .amp-geo-group-gbOrUnknown &': {
        display: 'none',
        visibility: 'hidden',
      },
    }),
  section: ({ palette }: Theme) => css({ backgroundColor: palette.GREY_3 }),
  wrapper: () =>
    css({
      margin: '0 auto' /* To centre page layout for Group 4+ */,
      textAlign: 'center',
    }),
};

export default styles;
