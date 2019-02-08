import styled from 'styled-components';
import { C_OAT_LHT } from '@bbc/psammead-styles/colours';
import { layoutGridWrapper, layoutGridItemConstrained } from './layoutGrid';

export const Wrapper = styled.div`
  ${layoutGridWrapper};
`;

export const OatWrapper = styled(Wrapper)`
  background: ${C_OAT_LHT};
`;

export const GridItemConstrained = styled.div`
  ${layoutGridItemConstrained};
`;
