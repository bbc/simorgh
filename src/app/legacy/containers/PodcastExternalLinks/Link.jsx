import styled from '@emotion/styled';
import { getLongPrimer } from '#psammead/gel-foundations/src/typography';

const Link = styled.a`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ theme: { fontVariants } }) => fontVariants.sansBold}
  ${({ dir }) =>
    dir === 'rtl' ? 'padding-left: 1rem;' : 'padding-right: 1rem;'}
  color: ${props => props.theme.palette.EBON};
  text-decoration: none;
  display: inline-block;
  margin: 0.1875rem 0;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;

  > span {
    display: inline-block;
  }

  &:visited {
    color: ${props => props.theme.palette.METAL};
  }

  &:focus > span,
  &:hover > span {
    text-decoration: underline;
  }
`;

export default Link;
