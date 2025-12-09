import { css, Theme } from '@emotion/react';

import BASE64_PLACEHOLDER_IMAGE from './base64Placeholder';

const styles = {
  wrapper: css({
    position: 'relative',
  }),
  wrapperFixedAspectRatio: css({
    height: 0,
  }),
  wrapperResponsiveRatio: css({
    height: '100%',
  }),
  placeholder: (theme: Theme) =>
    css({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '60px 17px',
      [theme.mq.GROUP_2_MIN_WIDTH]: {
        backgroundSize: '77px 22px',
      },
      [theme.mq.GROUP_4_MIN_WIDTH]: {
        backgroundSize: '93px 27px',
      },
    }),
  image: css({
    width: '100%',
    objectFit: 'cover', // objectFit used in combination with inline style aspectRatio will center the image horizontally and vertically if aspectRatio prop is different from image's intrinsic aspect ratio
  }),
  imageFixedAspectRatio: css({
    height: 'auto',
  }),
  imageResponsiveRatio: css({
    height: '100%',
  }),
  portraitOrientation: css({
    position: 'absolute',
  }),
  blurredBackground: css({
    display: 'block',
    position: 'absolute',
    /* When the image is blurred by the filter, it leaves a transparent gradient
     around the edge that's double the length of the blur. We are hiding the
     edge using positioning to compensate. */
    top: '-30px',
    right: '-30px',
    bottom: '-30px',
    left: '-30px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(15px)',
  }),
};

export default styles;
