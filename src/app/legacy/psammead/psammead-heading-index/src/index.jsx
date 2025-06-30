import styled from '@emotion/styled';
import { getDoublePica } from '#psammead/gel-foundations/src/typography';

const HeadingIndex = styled.h1`
  ${({ script }) => script && getDoublePica(script)};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  color: ${props => props.theme.palette.METAL};
  margin: 0;
`;

HeadingIndex.defaultProps = {
  tabIndex: '-1',
};

export default HeadingIndex;
