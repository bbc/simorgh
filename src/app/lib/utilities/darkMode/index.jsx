import React from 'react';
import { Global, css } from '@emotion/core';
import { C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';

const darkModeGlobalStyles = css`
  #root {
    background-color: ${C_MIDNIGHT_BLACK};
  }
`;

export default () => <Global styles={darkModeGlobalStyles} />;
