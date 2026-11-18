import { css, Theme } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';

const styles = {
  section: ({ palette, spacings, mq, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      '--article-end-media-height': '300px',
      position: 'relative',
      minWidth: 0,
      margin: `0 ${spacings.FULL}rem ${spacings.TRIPLE}rem`,
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
      color: palette.WHITE,
      background: palette.GREY_10,
      border: `1px solid ${palette.GREY_7}`,
      borderTop: `4px solid ${palette.POSTBOX}`,
      '& button, & a': {
        ':focus-visible': {
          outline: `3px solid ${palette.WHITE}`,
          outlineOffset: 4,
          boxShadow: `0 0 0 4px ${palette.BLACK}`,
        },
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        marginInline: `${spacings.DOUBLE}rem`,
        padding: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: { marginInline: 0 },
      [mq.GROUP_3_MIN_WIDTH]: { '--article-end-media-height': '360px' },
    }),
  endLabel: ({ fontSizes, fontVariants, palette }: Theme) =>
    css({
      ...fontSizes.longPrimer,
      ...fontVariants.sansRegular,
      color: palette.GREY_3,
      margin: '0 0 0.5rem',
    }),
  heading: ({ palette }: Theme) => css({ color: palette.WHITE }),
  introduction: ({ palette, fontSizes }: Theme) =>
    css({
      ...fontSizes.pica,
      color: palette.GREY_3,
      margin: '0.75rem 0 1.5rem',
    }),
  interactive: () => css({ [`.${NO_JS_CLASSNAME} &`]: { display: 'none' } }),
  rail: ({ mq }: Theme) =>
    css({
      position: 'relative',
      display: 'grid',
      gridAutoFlow: 'column',
      // Keep the preview small when readers enlarge text independently.
      gridAutoColumns: 'calc(100% - 24px)',
      alignItems: 'stretch',
      gap: '12px',
      overflowX: 'auto',
      overscrollBehaviorX: 'contain',
      scrollSnapType: 'x mandatory',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' },
      listStyle: 'none',
      padding: 0,
      margin: 0,
      [mq.GROUP_3_MIN_WIDTH]: { gridAutoColumns: '100%' },
    }),
  slide: () =>
    css({
      minWidth: 0,
      display: 'flex',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
    }),
  card: ({ palette }: Theme) =>
    css({
      background: palette.WHITE,
      color: palette.GREY_10,
      minWidth: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }),
  mediaFrame: ({ palette }: Theme) =>
    css({
      height: 'var(--article-end-media-height)',
      flexShrink: 0,
      background: palette.BLACK,
    }),
  artwork: ({ palette }: Theme) =>
    css({
      position: 'relative',
      height: '100%',
      background: palette.BLACK,
      overflow: 'hidden',
    }),
  topicArtwork: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.trafalgar,
      position: 'absolute',
      inset: 0,
      paddingBlock: '2rem',
      paddingInline: 'min(1.25rem, 20px)',
      minWidth: 0,
      overflowWrap: 'anywhere',
      display: 'flex',
      alignItems: 'center',
      color: palette.WHITE,
      background: `linear-gradient(125deg, ${palette.POSTBOX}, ${palette.GREY_10})`,
    }),
  topicImageOverlay: ({ palette }: Theme) =>
    css({
      background: `linear-gradient(90deg, ${palette.POSTBOX} 0%, ${palette.POSTBOX}CC 55%, ${palette.BLACK}66 100%)`,
    }),
  cardBody: () =>
    css({
      // Enlarged text needs the available width, not proportionally wider gutters.
      padding: 'min(1.25rem, 20px)',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    }),
  format: ({ fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansBold,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      svg: { height: '1rem', width: '1rem', fill: 'currentColor' },
    }),
  title: ({ palette }: Theme) =>
    css({ color: palette.GREY_10, overflowWrap: 'anywhere' }),
  description: ({ fontSizes, palette, spacings }: Theme) =>
    css({
      ...fontSizes.longPrimer,
      color: palette.GREY_6,
      margin: `${spacings.FULL + spacings.HALF}rem 0 0`,
      overflowWrap: 'anywhere',
    }),
  actions: () =>
    css({
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: 'auto',
      paddingTop: '1rem',
    }),
  action: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.pica,
      display: 'inline-flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      minWidth: 0,
      maxWidth: '100%',
      overflowWrap: 'anywhere',
      gap: '0.5rem',
      minHeight: '2.75rem',
      padding: '0.625rem 1rem',
      background: palette.GREY_10,
      color: palette.WHITE,
      border: `2px solid ${palette.GREY_10}`,
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': { textDecoration: 'underline', background: palette.GREY_7 },
    }),
  navigation: () =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.75rem',
      paddingBlock: '1.25rem',
    }),
  count: ({ fontSizes, fontVariants }: Theme) =>
    css({ ...fontSizes.longPrimer, ...fontVariants.sansBold }),
  arrows: () => css({ display: 'flex', gap: '0.5rem' }),
  arrow: ({ palette }: Theme) =>
    css({
      width: '2.75rem',
      height: '2.75rem',
      border: 0,
      background: palette.BLACK,
      color: palette.GREY_2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover:not(:disabled)': { background: palette.GREY_7 },
      '&:disabled': { opacity: 0.2, cursor: 'not-allowed' },
    }),
  chevron: () => css({ width: '1rem', height: '1rem' }),
  choices: ({ mq }: Theme) =>
    css({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '0.5rem',
      padding: 0,
      margin: 0,
      listStyle: 'none',
      [mq.GROUP_1_MAX_WIDTH]: { gridTemplateColumns: 'minmax(0, 1fr)' },
    }),
  choice: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.longPrimer,
      width: '100%',
      height: '100%',
      minHeight: '2.75rem',
      textAlign: 'start',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '0.875rem',
      cursor: 'pointer',
      color: palette.WHITE,
      background: palette.BLACK,
      border: `1px solid ${palette.WHITE}`,
      borderBottom: `4px solid ${palette.POSTBOX}`,
      overflowWrap: 'anywhere',
      '&:hover': { background: palette.GREY_10, textDecoration: 'underline' },
      '&[aria-pressed="true"]': {
        color: palette.GREY_10,
        background: palette.WHITE,
        borderColor: palette.WHITE,
        borderBottomColor: palette.POSTBOX,
      },
    }),
  choiceFormat: ({ fontSizes }: Theme) =>
    css({ ...fontSizes.brevier, display: 'block', marginBottom: '0.5rem' }),
  noJs: () =>
    css({
      display: 'none',
      [`.${NO_JS_CLASSNAME} &`]: { display: 'block' },
      '& a': { color: 'inherit' },
      '& li': { marginBlock: '1rem' },
    }),
};

export default styles;
