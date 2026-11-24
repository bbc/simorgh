import styled from '@emotion/styled';

const Footer = styled.footer`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  ${({ theme: { fontSizes } }) => fontSizes.brevier};
  color: ${props => props.theme.palette.RHINO};
`;

export default Footer;
