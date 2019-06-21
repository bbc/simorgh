/* eslint-disable no-unused-expressions */
import React, { useContext } from 'react';
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import { ServiceContext } from '../../contexts/ServiceContext';

const createFontStyles = fonts =>
  fonts.reduce((fontStyles, fontStyle) => fontStyles + fontStyle, '');

const GlobalStyleComponent = createGlobalStyle`
    ${styledNormalize}

    /* Box Sizing https://bit.ly/1A91I0J */
    html {
      box-sizing: border-box;
      font-size: 100%;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }

    ${({ fonts }) => fonts && createFontStyles(fonts)}
  `;

const GlobalStyle = () => {
  const { fonts } = useContext(ServiceContext);
  return <GlobalStyleComponent fonts={fonts} />;
};

export default GlobalStyle;
