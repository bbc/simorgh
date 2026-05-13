import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../utilities/pixelsToRem';

export default {
  wrapper:
    ({ isConciseView }: { isConciseView?: boolean }) =>
    ({ palette }: Theme) =>
      css({
        background: isConciseView ? palette.GREY_15 : palette.GREY_16,
        borderLeft: `medium none ${palette.LIVE_CORE}`,
      }),
  container:
    ({ isConciseView }: { isConciseView?: boolean }) =>
    ({ mq, palette }: Theme) =>
      css({
        fontFamily: 'ReithSans, Helvetica, Arial, freesans, sans-serif',
        fontWeight: 400,
        fontFeatureSettings: "'ss01' off",
        color: palette.LUNAR_LIGHT,
        padding: isConciseView ? '8px' : '0',
        ...(!isConciseView && { paddingBottom: `${pixelsToRem(24)}rem` }),
        [mq.GROUP_2_MAX_WIDTH]: {
          paddingTop: isConciseView ? '8px' : '0',
          ...(!isConciseView && { paddingBottom: `${pixelsToRem(8)}rem` }),
        },
      }),
};
