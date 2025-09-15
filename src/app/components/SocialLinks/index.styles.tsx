import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import BASE64_PLACEHOLDER_IMAGE from '#app/components/Image/base64Placeholder';

const IMAGE_SIZE_GROUP_1 = 80;
const IMAGE_SIZE_GROUP_2 = 55;
const IMAGE_SIZE_GROUP_3 = 80;
const IMAGE_SIZE_GROUP_4 = 67;

const styles = {
  IMAGE_SIZE_GROUP_1,
  container: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.QUADRUPLE}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
    }),
  heading: ({ fontSizes, fontVariants, spacings }: Theme) =>
    css({
      ...fontSizes.doublePica,
      ...fontVariants.sansBold,
      marginBottom: `${spacings.TRIPLE}rem`,
    }),
  unorderedList: ({ spacings, mq }: Theme) =>
    css({
      padding: 0,
      margin: 0,
      display: 'grid',
      listStyleType: 'none',
      gap: `${spacings.DOUBLE}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: `${spacings.TRIPLE}rem`,
      },
    }),
  item: ({ spacings, mq }: Theme) =>
    css({
      position: 'relative',
      display: 'flex',
      minWidth: '0',
      alignItems: 'center',
      gap: `${spacings.FULL}rem`,

      [mq.GROUP_3_MIN_WIDTH]: {
        gap: `${spacings.DOUBLE}rem`,
      },
    }),
  image: ({ mq }: Theme) =>
    css({
      width: `${pixelsToRem(IMAGE_SIZE_GROUP_1)}rem`,
      height: `${pixelsToRem(IMAGE_SIZE_GROUP_1)}rem`,
      flexShrink: 0,

      [mq.GROUP_2_MIN_WIDTH]: {
        width: `${pixelsToRem(IMAGE_SIZE_GROUP_2)}rem`,
        height: `${pixelsToRem(IMAGE_SIZE_GROUP_2)}rem`,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(IMAGE_SIZE_GROUP_3)}rem`,
        height: `${pixelsToRem(IMAGE_SIZE_GROUP_3)}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        width: `${pixelsToRem(IMAGE_SIZE_GROUP_4)}rem`,
        height: `${pixelsToRem(IMAGE_SIZE_GROUP_4)}rem`,
      },
    }),
  placeholder: ({ palette }: Theme) =>
    css({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '75%',
      backgroundColor: palette.LUNAR,
      border: `${pixelsToRem(1)}rem ${palette.STONE} solid`,
    }),
  link: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      color: palette.GREY_10,
      textDecoration: 'none',
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      overflow: 'hidden',

      '&:visited': {
        color: palette.GREY_6,
      },
      '&:hover, &:focus': {
        textDecoration: 'underline',
        textDecorationThickness: `${pixelsToRem(2)}rem`,
      },
      '::before': {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        content: '""',
      },
    }),
};

export default styles;
