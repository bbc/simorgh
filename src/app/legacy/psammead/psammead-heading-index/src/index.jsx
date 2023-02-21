import styled from '@emotion/styled';
import { shape, string } from 'prop-types';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';
import { C_METAL } from '#psammead/psammead-styles/src/colours';
import { getDoublePica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

const HeadingIndex = styled.h1`
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSansRegular(service)};
  color: ${C_METAL};
  margin: 0;
`;

HeadingIndex.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

HeadingIndex.defaultProps = {
  tabIndex: '-1',
};

export default HeadingIndex;
