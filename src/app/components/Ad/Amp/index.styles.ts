import { css, Theme } from '@emotion/react';

const styles = {
  link: ({ fontSizes, fontVariants, palette, spacings }: Theme) =>
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
  section: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_3,
    }),
  wrapper: css({
    margin: '0 auto' /* To centre page layout for Group 4+ */,
    textAlign: 'center',
  }),

  // amp-geo adds geo group classes to the body of the document depending on
  // the user's location. It removes the `amp-geo-pending` class when geolocation
  // data is available.
  // setting display: none ensures ad requests within this component are not made.
  display: css({
    '.amp-geo-pending &, .amp-geo-group-gbOrUnknown &': {
      display: 'none',
      visibility: 'hidden',
    },
  }),
};

export default styles;
