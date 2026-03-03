import styled from '@emotion/styled';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';

const EpisodesText = styled.p`
  display: inline;
  ${({ theme: { fontSizes } }) => fontSizes.pica};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  color: ${props => props.theme.palette.METAL};
  > svg {
    fill: currentColor;
    color: unset;
    width: ${GEL_SPACING_DBL};
    height: ${GEL_SPACING_DBL};
    position: relative;
    bottom: 0.125rem;
    ${({ dir }) => (dir === 'ltr' ? `right: 0.1875rem;` : `left: 0.1875rem;`)}
    @media screen and (forced-colors: active) {
      fill: canvasText;
    }
  }
`;

const CardEpisodesText = ({ children, ...props }) => (
  <EpisodesText {...props}>
    {mediaIcons.seriesstack}
    {children}
  </EpisodesText>
);

export default CardEpisodesText;
