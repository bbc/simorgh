import styled from '@emotion/styled';

export const visuallyHiddenTextStyle = `
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
  margin: 0;
`;

const VisuallyHiddenText = styled.span`
  ${visuallyHiddenTextStyle};
`;

export default VisuallyHiddenText;
