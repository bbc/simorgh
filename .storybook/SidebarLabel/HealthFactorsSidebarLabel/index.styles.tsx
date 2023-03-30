import pixelsToRem from '../../../src/app/utilities/pixelsToRem';

const styles = {
  iconWrapper: {
    display: 'inline-block',
    boxSizing: 'border-box',
    marginLeft: `0.5em`,
    userSelect: 'none',
    width: `${pixelsToRem(12)}rem`,
    height: `${pixelsToRem(12)}rem`,
  },

  recommendIcon: {
    width: `${pixelsToRem(12)}rem`,
    height: `${pixelsToRem(12)}rem`,
    color: '#0A7B0A',
    fill: 'currentcolor',
  },

  activityIcon: {
    width: `${pixelsToRem(12)}rem`,
    height: `${pixelsToRem(12)}rem`,
    color: '#3f3f42',
    fill: 'currentcolor',
  },

  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  warningIcon: {
    width: `${pixelsToRem(12)}rem`,
    height: `${pixelsToRem(12)}rem`,
    color: '#c64f00',
    fill: 'currentcolor',
  },
};

export default styles;
