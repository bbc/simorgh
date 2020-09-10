import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { C_POSTBOX, C_METAL, C_EBON } from '@bbc/psammead-styles/colours';

// eslint-disable-next-line react/prop-types
const CsrLink = ({ href, ...props }) => <Link to={href} {...props} />;

const InlineLink = styled(CsrLink)`
  color: ${C_EBON};
  border-bottom: 1px solid ${C_POSTBOX};
  text-decoration: none;

  &:visited {
    color: ${C_METAL};
    border-bottom: 1px solid ${C_METAL};
  }

  &:focus,
  &:hover {
    border-bottom: 2px solid ${C_POSTBOX};
    color: ${C_POSTBOX};
  }
`;

export default InlineLink;
