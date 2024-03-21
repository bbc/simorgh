import { css, Theme } from '@emotion/react';
import {
  MARGIN_ABOVE_400PX,
  MARGIN_BELOW_400PX,
} from '../ThemeProvider/spacings';
import { GROUP_4_MIN_WIDTH_BP } from '../ThemeProvider/mediaQueries';

const styles = {
  paragraph: ({ palette, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      margin: 0,
      padding: `${spacings.DOUBLE}rem 0`,
      a: { padding: 0 },
    }),
  siteWideLinksWrapper: ({ palette, mq, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      backgroundColor: palette.EBON,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `0 ${MARGIN_ABOVE_400PX}`,
      },
      [mq.GROUP_2_MAX_WIDTH]: {
        padding: `0 ${MARGIN_BELOW_400PX}`,
      },
    }),
  ampCookieSettingButton: ({ palette, spacings, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      background: 'none',
      border: 'none',
      color: palette.WHITE,
      cursor: 'pointer',
      display: 'block',
      padding: `${spacings.FULL}rem 0 ${spacings.FULL}rem`,
      textDecoration: 'none',
      textAlign: 'left',
      width: '100%',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),
    constrainedWrapperWithTrustProjectLink: ({ spacings }: Theme) =>
    css({
      maxWidth: `${GROUP_4_MIN_WIDTH_BP}rem`,
      margin: '0 auto',
      paddingTop: `${spacings.FULL}rem`
    }),

    constrainedWrapperWithoutTrustProjectLink: () =>
    css({
      maxWidth: `${GROUP_4_MIN_WIDTH_BP}rem`,
      margin: '0 auto'
    }),
};
// const ConstrainedWrapper = styled.div`
//   max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
//   margin: 0 auto;
//   ${({ trustProjectLink }) =>
//     trustProjectLink && `padding-top: ${GEL_SPACING};`}
// `;

// '&:focus, &:hover': {
//     borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
//     color: palette.POSTBOX,
//   },
// const StyledAmpCookieSettingsButton = styled(AmpCookieSettingsButton)`
//   ${({ service }) => service && getSansBold(service)}
//   background: none;
//   border: none;
//   color: ${props => props.theme.palette.WHITE};
//   cursor: pointer;
//   display: block;
//   padding: ${GEL_SPACING} 0 ${GEL_SPACING};
//   text-decoration: none;
//   text-align: left;
//   width: 100%;

//   &:hover,
//   &:focus {
//     text-decoration: underline;
//   }
// `;

// const SitewideLinksWrapper = styled.div`
//   ${({ script }) => script && getBrevier(script)}
//   ${({ service }) => service && getSansRegular(service)}
//   background-color: ${props => props.theme.palette.EBON};

//   @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
//     padding: 0 ${GEL_MARGIN_BELOW_400PX};
//   }
//   @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
//     padding: 0 ${GEL_MARGIN_ABOVE_400PX};
//   }
// `;
// const StyledParagraph = styled.p`
//   color: ${props => props.theme.palette.WHITE};
//   margin: 0;
//   padding: ${GEL_SPACING_DBL} 0;

//   /* removes padding which creates touch target from the final inline link so the Focus Indicator doesn't obscure other text. */
//   a {
//     padding: 0;
//   }
// `;

export default styles;
