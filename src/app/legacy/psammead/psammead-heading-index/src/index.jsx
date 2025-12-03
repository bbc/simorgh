import styled from '@emotion/styled';

const HeadingIndex = styled.h1`
  ${({ theme: { fontSizes } }) => fontSizes.doublePica};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  color: ${props => props.theme.palette.METAL};
  margin: 0;
`;

HeadingIndex.defaultProps = {
  tabIndex: '-1',
};

export default HeadingIndex;
