import styled from '@emotion/styled';
import { getDoublePica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

const HeadingIndex = styled.h1`
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSansRegular(service)};
  color: ${props => props.theme.palette.METAL};
  margin: 0;
`;

HeadingIndex.defaultProps = {
  tabIndex: '-1',
};

export default HeadingIndex;
