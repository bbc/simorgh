/* eslint-disable no-unused-expressions */
import React, { useContext } from 'react';
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import { arrayOf, string } from 'prop-types';
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

const GlobalStyle = ({ fonts }) => {
  const styleFonts = useContext(ServiceContext).fonts;
  return <GlobalStyleComponent fonts={fonts || styleFonts} />;
};

GlobalStyle.propTypes = {
  fonts: arrayOf(string),
};

GlobalStyle.defaultProps = {
  fonts: null,
};

export default GlobalStyle;
