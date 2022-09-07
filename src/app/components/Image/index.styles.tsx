import { css, Theme } from '@emotion/react';

import BASE64_PLACEHOLDER_IMAGE from './base64Placeholder';

const styles = {
  wrapper: css({
    position: 'relative',
    height: 0,
    overflow: 'hidden',
  }),
  placeholder: (theme: Theme) =>
    css({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
      backgroundColor: theme.palette.LUNAR,
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
  placeholderWrapper: css({
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  }),
  image: css({
    width: '100%',
    height: '100%',
  }),
};

export default styles;
