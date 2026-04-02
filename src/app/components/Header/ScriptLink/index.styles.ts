import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { MAX_NAV_ITEM_HEIGHT } from '#app/components/Navigation/index.styles';
// logic associated with this can be removed after rollout to support just the new navigation dual script
type ScriptLinkLayout = 'legacy' | 'new-navigation';

const legacyLink = ({
  fontSizes,
  fontVariants,
  palette,
  spacings,
  mq,
}: Theme) =>
  css({
    ...fontSizes.pica,
    ...fontVariants.sansRegular,
    display: 'inline-block',
    color: palette.WHITE,
    textDecoration: 'none',
    height: '2.75rem',
    border: `0.0625rem solid ${palette.WHITE}`,
    margin: `${spacings.FULL}rem 0 ${spacings.FULL}rem ${spacings.FULL}rem`,
    minWidth: '2.75rem',
    textAlign: 'center',
    '&:focus, &:hover': {
      span: {
        margin: '0',
        border: `0.1875rem solid ${palette.WHITE}`,
      },
    },
    [mq.GROUP_2_MIN_WIDTH]: {
      lineHeight: `calc(2.25rem - ${spacings.FULL}rem)`,
    },
    [mq.GROUP_1_MAX_WIDTH]: {
      margin: `${spacings.FULL}rem 0 ${spacings.FULL}rem 0`,
    },
  });

const legacyContainer = ({ spacings }: Theme) =>
  css({
    marginTop: '0.1875rem',
    width: '100%',
    display: 'inline-block',
    height: 'calc(100%)',
    lineHeight: `calc(2.75rem - ${spacings.FULL}rem)`,
  });

const newNavigationLink = ({ palette, mq }: Theme) =>
  css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    color: palette.WHITE,
    textDecoration: 'none',
    width: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
    minWidth: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
    height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
    padding: 0,
    margin: 0,
    flexShrink: 0,

    '&:visited': {
      color: palette.WHITE,
    },

    '&:hover': {
      textDecoration: 'none',
    },

    '&:hover span, &:focus-visible span, &:focus span': {
      borderWidth: `${pixelsToRem(4)}rem`,
    },

    '&:focus-visible': {
      outline: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
      outlineOffset: `${pixelsToRem(-2)}rem`,
    },

    '&:focus': {
      outline: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
      outlineOffset: `${pixelsToRem(-2)}rem`,
    },

    [mq.GROUP_0_MAX_WIDTH]: {
      position: 'absolute',
      insetInlineStart: `-${pixelsToRem(5)}rem`,
      insetBlockEnd: 0,
      zIndex: 1,
    },
  });

const newNavigationContainer = ({ fontVariants, palette }: Theme) =>
  css({
    ...fontVariants.sansRegular,
    fontSize: `${pixelsToRem(15)}rem`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minWidth: `${pixelsToRem(34)}rem`,
    height: `${pixelsToRem(36)}rem`,
    padding: `0 ${pixelsToRem(4)}rem`,
    border: `${pixelsToRem(1)}rem solid ${palette.WHITE}`,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textAlign: 'center',
  });

const styles = {
  link:
    (layout: ScriptLinkLayout = 'legacy') =>
    (theme: Theme) =>
      layout === 'new-navigation'
        ? newNavigationLink(theme)
        : legacyLink(theme),
  container:
    (layout: ScriptLinkLayout = 'legacy') =>
    (theme: Theme) =>
      layout === 'new-navigation'
        ? newNavigationContainer(theme)
        : legacyContainer(theme),
};
export default styles;
