import styled from 'styled-components';

const VisuallyHiddenText = styled.span`
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
`;

export default VisuallyHiddenText;
