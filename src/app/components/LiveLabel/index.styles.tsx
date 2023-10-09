import { css, Theme } from '@emotion/react';

const styles = {
  liveLabel: ({ palette, fontVariants }: Theme) =>
    css({
      color: palette.POSTBOX,
      display: 'inline-block',
      ...fontVariants.sansBold,
    }),
  textRtl: ({ spacings }: Theme) =>
    css({
      marginLeft: `${spacings.FULL}rem`,
    }),
  textLtr: ({ spacings }: Theme) =>
    css({
      marginRight: `${spacings.FULL}rem`,
    }),
};

export default styles;

// Old CSS below leaving in for reference until work is completed

// const StyledSpan = styled.span`
//   ${({ service }) => getSansBold(service)}
//   color: ${props => props.theme.palette.POSTBOX};
//   display: inline-block;
//   ${({ dir }) =>
//     dir === 'rtl'
//       ? `margin-left: ${GEL_SPACING};`
//       : `margin-right: ${GEL_SPACING};`}
// `;
