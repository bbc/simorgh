import styled from '@emotion/styled';

const P = styled.p`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  ${({ theme: { fontSizes } }) => fontSizes.bodyCopy};
  color: ${props => props.theme.palette.EBON};
`;

export default P;
