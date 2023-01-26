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
    fill: '#0A7B0A',
  },

  activityIcon: {
    width: `${pixelsToRem(12)}rem`,
    height: `${pixelsToRem(12)}rem`,
    fill: '#3f3f42',
  },

  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  warningIcon: {
    width: `${pixelsToRem(12)}rem`,
    height: `${pixelsToRem(12)}rem`,
    fill: '#c64f00',
  },
};

export default styles;
