import styled from 'styled-components';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import { layoutGridWrapper, layoutGridItemConstrained } from './layoutGrid';

export const Wrapper = styled.div`
  ${layoutGridWrapper};
  background: ${C_GHOST};
`;

export const GridItemConstrained = styled.div`
  ${layoutGridItemConstrained};
`;
