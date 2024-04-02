import { css, Theme } from '@emotion/react';
import {
  MARGIN_ABOVE_400PX,
  MARGIN_BELOW_400PX,
} from '../ThemeProvider/spacings';
import { GROUP_4_MIN_WIDTH_BP } from '../ThemeProvider/mediaQueries';

const styles = {
  paragraph: ({ palette, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      margin: 0,
      padding: `${spacings.DOUBLE}rem 0`,
      a: { padding: 0 },
    }),
  paragraphWithBorderBottom: ({ palette, spacings }: Theme) =>
    css({
      borderBottom: `0.0625rem solid ${palette.SHADOW}`,
      color: palette.WHITE,
      margin: 0,
      padding: `${spacings.DOUBLE}rem 0`,
    }),
  siteWideLinksWrapper: ({ palette, mq, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      backgroundColor: palette.EBON,
      [mq.GROUP_2_MAX_WIDTH]: {
        padding: `0 ${MARGIN_BELOW_400PX}`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `0 ${MARGIN_ABOVE_400PX}`,
      },
    }),
  ampCookieSettingButton: ({ palette, spacings, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      background: 'none',
      border: 'none',
      color: palette.WHITE,
      cursor: 'pointer',
      display: 'block',
      padding: `${spacings.FULL}rem 0 ${spacings.FULL}rem`,
      textDecoration: 'none',
      textAlign: 'left',
      width: '100%',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),
  constrainedWrapperWithTrustProjectLink: ({ spacings }: Theme) =>
    css({
      maxWidth: `${GROUP_4_MIN_WIDTH_BP}rem`,
      margin: '0 auto',
      paddingTop: `${spacings.FULL}rem`,
    }),

  constrainedWrapperWithoutTrustProjectLink: () =>
    css({
      maxWidth: `${GROUP_4_MIN_WIDTH_BP}rem`,
      margin: '0 auto',
    }),
};

export default styles;
