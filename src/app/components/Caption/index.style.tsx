import {
  MARGIN_BELOW_400PX,
} from '../ThemeProvider/spacings';

export default {
  captionStyles: () => ({
    // This needs to be converted to CSS modules
    color: 'var(--caption-color, #555)',
    marginTop: '1rem',
    marginInline: `${MARGIN_BELOW_400PX} 0`,
    paddingInline: `${MARGIN_BELOW_400PX}`,
    width: 'calc(100% - 1rem)',
    borderInlineStart: '0.0625rem solid var(--caption-border-color, #999)',
    // Media queries would be handled in CSS modules
  }),
};
