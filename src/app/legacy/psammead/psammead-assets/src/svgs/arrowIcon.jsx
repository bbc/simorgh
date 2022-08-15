import styled from '@emotion/styled';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';
import { C_EBON } from '#psammead/psammead-styles/src/colours';

const StyledArrowIcon = styled.svg`
  vertical-align: middle;
  margin: 0 ${GEL_SPACING_HLF};
  color: ${C_EBON};
  fill: currentColor;
`;

const Arrow = () => (
  <StyledArrowIcon
    width="12px"
    height="12px"
    viewBox="0 0 32 32"
    focusable="false"
    aria-hidden="true"
  >
    <g>
      <path d="M21.6,14.3L5.5,31h6.4l14.6-15L11.9,1H5.5l16.1,16.7V14.3z" />
    </g>
  </StyledArrowIcon>
);

export default Arrow;
