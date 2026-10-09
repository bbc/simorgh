import styled from '@emotion/styled';

const StyledTitle = styled.span`
  color: ${props => props.theme.palette.GREY_10};
  margin: 0;
  ${({ theme: { fontVariants } }) => fontVariants.serifMedium};
`;

export default StyledTitle;
