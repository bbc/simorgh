import BASE64_PLACEHOLDER_IMAGE from '#app/components/Image/base64Placeholder';
import { css, Theme } from '@emotion/react';

export default {
  ampIframeWrapper: ({ palette }: Theme) =>
    css({
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: palette.LUNAR,
      height: '100%',
    }),
  ampIframePlaceholder: ({ mq }: Theme) =>
    css({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
      backgroundPosition: 'center center',
      backgroundRepeat: ' no-repeat',
      backgroundSize: '60px 17px',

      [mq.GROUP_2_MIN_WIDTH]: {
        backgroundSize: ' 77px 22px',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        backgroundSize: ' 93px 27px',
      },
    }),
};
