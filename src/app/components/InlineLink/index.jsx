import styled from 'styled-components';
import {
  C_BLUEJAY,
  C_BLUEJAY_LHT,
  C_OAT_LHT,
  C_PEBBLE,
} from '@bbc/psammead-styles/colours';

const InlineLink = styled.a`
  color: ${C_BLUEJAY};
  padding: 2px;
  border-bottom: 1px solid ${C_BLUEJAY};
  text-decoration: none;
  &:visited {
    color: ${C_PEBBLE};
    border-bottom: 1px solid ${C_PEBBLE};
  }
  &:focus {
    background-color: ${C_BLUEJAY};
    border-bottom: 1px solid ${C_OAT_LHT};
    color: ${C_OAT_LHT};
  }
  &:hover {
    color: ${C_BLUEJAY};
    background-color: ${C_BLUEJAY_LHT};
    border-bottom: 1px solid ${C_BLUEJAY};
  }
`;

export default InlineLink;
