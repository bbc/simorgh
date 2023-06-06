import styled from '@emotion/styled';

const InlineLink = styled.a`
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.GREY_8};
  border-bottom: 1px solid ${props => props.theme.palette.NEWS_CORE};
  text-decoration: none;

  &:visited {
    color: ${props => props.theme.palette.METAL};
    border-bottom: 1px solid ${props => props.theme.palette.METAL};
  }

  &:focus,
  &:hover {
    border-bottom: 2px solid ${props => props.theme.palette.NEWS_CORE};
    color: ${props => props.theme.palette.NEWS_CORE};
  }
`;

export default InlineLink;
