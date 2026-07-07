import styled from '@emotion/styled';

const Heading = styled.h2`
  ${props => props.theme.fontVariants.serifMedium}
  ${props => props.theme.fontSizes.bodyCopy}
  color: ${props => props.theme.palette.EBON};
  margin-top: 0;
  margin-bottom: ${props => `${props.theme.spacings.FULL}rem`};
`;

export default Heading;
