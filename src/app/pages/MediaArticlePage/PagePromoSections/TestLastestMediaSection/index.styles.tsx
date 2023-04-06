import PromoItem from '#app/legacy/components/OptimoPromos/PromoItem/index.styles';
import PromoList from '#app/legacy/components/OptimoPromos/PromoList';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import SectionLabel from '#psammead/psammead-section-label/src';

const styles = {
  LatestMediaSection: ({ mq }: Theme) =>
    css({
      marginLeft: '0.5rem',
      marginRight: '0.5rem',
      [mq.GROUP_3_ONLY]: {
        marginLeft: '1rem',
        marginRight: '1rem',
      },
    }),
  LatestMediaGridWrapper: ({ mq }: Theme) =>
    css({
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      [mq.GROUP_3_ONLY]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        columnGap: '1rem',
        rowGap: '1.5rem',
      },
    }),
  LatestMediaPromoBorder: ({ mq, palette }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem ${palette.GREY_10} solid`,
      [mq.GROUP_3_ONLY]: {
        borderBottom: '0rem',
      },
    }),
  SectionTitleWrapper: ({ mq, spacings }: Theme) =>
    css({
      marginTop: `0rem`,
      marginBottom: `0rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: '0rem',
        marginBottom: `${spacings.HALF}rem`,
      },
      [mq.GROUP_3_ONLY]: {
        marginTop: '0rem',
        marginBottom: `${spacings.DOUBLE}rem`,
      },
    }),
};

export const StyledPromoList = styled(PromoList)`
  ${props => styles.LatestMediaGridWrapper(props.theme)}
`;

export const StyledPromoItem = styled(PromoItem)`
  ${props => styles.LatestMediaPromoBorder(props.theme)}
`;

export const StyledSectionLabel = styled(SectionLabel)`
  ${props => styles.SectionTitleWrapper(props.theme)}
`;

export default styles;
