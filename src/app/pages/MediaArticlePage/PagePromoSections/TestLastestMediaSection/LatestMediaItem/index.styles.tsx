import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { getPica } from '#psammead/gel-foundations/src/typography';
import Promo from '#components/OptimoPromos';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
// import { BORDER_SPACING } from '../../constants';

export const styles = {
  myStyle: ({ mq }: Theme) =>
    css({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      [mq.GROUP_3_ONLY]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    }),

  inline: ({ mq }: Theme) =>
    css({
      // should be border spacing. Removed template literal for ease.
      border: '0.5rem solid transparent',
      height: '100%',
      backgroundColor: 'blue',
      [mq.GROUP_3_ONLY]: {
        display: 'inline-block',
        maxWidth: '50%',
        backgroundColor: 'yellow',
      },
    }),
};

export const StyledTimestamp = styled(Promo.Timestamp)`
  padding-top: ${GEL_SPACING};
`;

export const StyledPromoTitle = styled(Promo.Title)`
  ${({ script }: { script: object }) => script && getPica(script)}
`;

// Commented out alongside element.
export const StyledPromoMediaIndicator = styled(Promo.MediaIndicator)`
  // width: 100%;
`;
