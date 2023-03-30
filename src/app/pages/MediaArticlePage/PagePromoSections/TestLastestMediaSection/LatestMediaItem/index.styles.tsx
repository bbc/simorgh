import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { getPica } from '#psammead/gel-foundations/src/typography';
import Promo from '#components/OptimoPromos';
import { BORDER_SPACING } from '../../constants';

export default {
  StyledTimelineCss: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.FULL}`,
    }),

  StyledTitleCss: ({ script }: { script: string }) =>
    css`
      display: inline;
      ${script && getPica(script)};
    `,
};

export const StyledTimestamp = styled(Promo.Timestamp)`
  padding-top: ${GEL_SPACING};
`;

export const StyledTopStoriesWrapper = styled.div`
  border: ${BORDER_SPACING} solid transparent;
  height: 100%;
`;
