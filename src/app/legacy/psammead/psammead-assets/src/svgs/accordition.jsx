import styled from '@emotion/styled';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';
import { C_EBON } from '#psammead/psammead-styles/src/colours';

const StyledAccordition = styled.svg`
  vertical-align: middle;
  margin: 0 ${GEL_SPACING_HLF};
  color: ${C_EBON};
  fill: currentColor;
  transform: rotate(-90deg);
`;

const AccorditionIcon = () => (
  <StyledAccordition
    width="12px"
    height="12px"
    viewBox="0 0 32 32"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path>
  </StyledAccordition>
);

export default AccorditionIcon;
