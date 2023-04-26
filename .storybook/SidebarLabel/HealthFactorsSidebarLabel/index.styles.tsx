import { css } from '@emotion/react';
import pixelsToRem from '../../../src/app/utilities/pixelsToRem';

const styles = {
  iconWrapper: () =>
    css({
      display: 'inline-block',
      boxSizing: 'border-box',
      marginLeft: `0.5em`,
      userSelect: 'none',
      width: `${pixelsToRem(12)}rem`,
      height: `${pixelsToRem(12)}rem`,
    }),

  recommendIcon: () =>
    css({
      width: `${pixelsToRem(12)}rem`,
      height: `${pixelsToRem(12)}rem`,
      color: '#0A7B0A',
      fill: 'currentcolor',
    }),

  activityIcon: () =>
    css({
      width: `${pixelsToRem(12)}rem`,
      height: `${pixelsToRem(12)}rem`,
      color: '#3f3f42',
      fill: 'currentcolor',
    }),

  labelWrapper: () =>
    css({
      display: 'flex',
      alignItems: 'center',
    }),

  warningIcon: () =>
    css({
      width: `${pixelsToRem(12)}rem`,
      height: `${pixelsToRem(12)}rem`,
      color: '#c64f00',
      fill: 'currentcolor',
    }),
};

export default styles;
