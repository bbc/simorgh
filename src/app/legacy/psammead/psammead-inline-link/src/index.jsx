import styled from '@emotion/styled';

const InlineLink = styled.a`
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.EBON};
  border-bottom: 1px solid ${props => props.theme.palette.POSTBOX};
  text-decoration: none;

  &:visited {
    color: ${props => props.theme.palette.METAL};
    border-bottom: 1px solid ${props => props.theme.palette.METAL};
  }

  &:focus,
  &:hover {
    border-bottom: 2px solid ${props => props.theme.palette.POSTBOX};
    color: ${props => props.theme.palette.POSTBOX};
  }
`;

export default InlineLink;
