import { css, Theme } from '@emotion/react';

const styles = {};
export default styles;

const StyledSpan = styled.span`
  ${({ service }) => getSansBold(service)}
  color: ${props => props.theme.palette.POSTBOX};
  display: inline-block;
  ${({ dir }) =>
    dir === 'rtl'
      ? `margin-left: ${GEL_SPACING};`
      : `margin-right: ${GEL_SPACING};`}
`;
